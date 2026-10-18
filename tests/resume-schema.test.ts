import { describe, it, expect } from "vitest";
import { createElement } from "react";
import {
  createResumeSchema,
  updateResumeSchema,
  resumeDataSchema,
  emptyResumeData,
  templateIdSchema,
  TEMPLATE_IDS,
} from "@/types/resume";
import { rateLimit } from "@/lib/rate-limit";
import { dateRange, hasText, getTemplate, TEMPLATES } from "@/components/templates/registry";

describe("resume validation schemas", () => {
  it("accepts an empty-but-valid resume payload", () => {
    const parsed = createResumeSchema.safeParse({
      title: "My resume",
      template: "ats-minimal",
      data: emptyResumeData("Jane Doe"),
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects an empty title", () => {
    const parsed = createResumeSchema.safeParse({ title: "", data: emptyResumeData() });
    expect(parsed.success).toBe(false);
  });

  it("rejects an unknown template id", () => {
    const parsed = createResumeSchema.safeParse({
      title: "x",
      template: "hacker-font",
      data: emptyResumeData(),
    });
    expect(parsed.success).toBe(false);
  });

  it("rejects an invalid email inside profile", () => {
    const data = emptyResumeData();
    data.profile.email = "not-an-email";
    const parsed = resumeDataSchema.safeParse(data);
    expect(parsed.success).toBe(false);
  });

  it("enforces max array sizes (experience cap 30)", () => {
    const data = emptyResumeData();
    data.experience = Array.from({ length: 31 }, (_, i) => ({
      id: `e${i}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }));
    const parsed = resumeDataSchema.safeParse(data);
    expect(parsed.success).toBe(false);
  });

  it("update schema accepts partial payloads", () => {
    const parsed = updateResumeSchema.safeParse({ title: "Renamed" });
    expect(parsed.success).toBe(true);
  });

  it("strips unknown top-level keys (no mass assignment)", () => {
    const parsed = createResumeSchema.safeParse({
      title: "x",
      data: emptyResumeData(),
      userId: "someone-else",
      isAdmin: true,
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect("userId" in parsed.data).toBe(false);
      expect("isAdmin" in parsed.data).toBe(false);
    }
  });
});

describe("rate limiter", () => {
  it("allows up to the limit, then blocks", () => {
    const key = `test:${Date.now()}:${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      expect(rateLimit(key, 5, 60_000).ok).toBe(true);
    }
    expect(rateLimit(key, 5, 60_000).ok).toBe(false);
  });

  it("window expiry frees the bucket", async () => {
    const key = `test-exp:${Date.now()}:${Math.random()}`;
    expect(rateLimit(key, 1, 50).ok).toBe(true);
    expect(rateLimit(key, 1, 50).ok).toBe(false);
    await new Promise((r) => setTimeout(r, 70));
    expect(rateLimit(key, 1, 50).ok).toBe(true);
  });
});

describe("template registry", () => {
  it("registers every template id exactly once (registry === schema enum, >= 26)", () => {
    // Single source of truth invariant: registry entries must match TEMPLATE_IDS
    // one-for-one, so Zod validation, the Mongoose model, the picker, and the
    // landing gallery can never drift apart.
    expect(TEMPLATES).toHaveLength(TEMPLATE_IDS.length);
    expect(TEMPLATE_IDS.length).toBeGreaterThanOrEqual(26);
    const ids = new Set(TEMPLATES.map((t) => t.id));
    expect(ids.size).toBe(TEMPLATES.length);
    expect([...TEMPLATE_IDS].every((id) => ids.has(id))).toBe(true);
    expect(TEMPLATES.every((t) => templateIdSchema.safeParse(t.id).success)).toBe(true);
    expect(TEMPLATES.every((t) => t.name.trim().length > 0 && t.accent.startsWith("#"))).toBe(true);
  });

  it("getTemplate falls back to the first template for unknown ids", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meta = getTemplate("nope" as any);
    expect(meta.id).toBe(TEMPLATES[0].id);
  });

  it("every template renders from empty data without throwing", async () => {
    const { renderToStaticMarkup } = await import("react-dom/server");
    const data = emptyResumeData();
    for (const t of TEMPLATES) {
      expect(() => renderToStaticMarkup(createElement(t.component, { data }))).not.toThrow();
    }
  });

  it("every template renders full sample data without throwing", async () => {
    const { renderToStaticMarkup } = await import("react-dom/server");
    const data = emptyResumeData("Jane Doe");
    data.profile.jobTitle = "Senior Engineer";
    data.profile.email = "jane@example.com";
    data.experience.push({
      id: "e1", company: "Acme", position: "Engineer", location: "Remote",
      startDate: "2020", endDate: "", current: true, description: "Built things",
    });
    data.education.push({
      id: "d1", institution: "OSU", degree: "B.Tech", field: "CSE", location: "Hyd",
      startDate: "2016", endDate: "2020", gpa: "8.5", description: "",
    });
    data.skills.push({ id: "s1", name: "React" });
    for (const t of TEMPLATES) {
      const html = renderToStaticMarkup(createElement(t.component, { data }));
      expect(html).toContain("Jane Doe");
      expect(html.length).toBeGreaterThan(200);
    }
  });
});

describe("helpers", () => {
  it("dateRange builds correct strings", () => {
    expect(dateRange("Jan 2022", "Mar 2024")).toBe("Jan 2022 – Mar 2024");
    expect(dateRange("Jan 2022", "", true)).toBe("Jan 2022 – Present");
    expect(dateRange("", "")).toBe("");
    expect(dateRange("", "Mar 2024")).toBe("Mar 2024");
  });

  it("hasText trims and rejects whitespace", () => {
    expect(hasText("  a  ")).toBe(true);
    expect(hasText("   ")).toBe(false);
    expect(hasText(null)).toBe(false);
    expect(hasText(undefined)).toBe(false);
  });
});
