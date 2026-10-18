import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Simple Stack — the plainest possible layout: centered header, stacked
 * sections, zero decoration. Mirrors the classic "Plain Text" free template.
 */
export function SimpleStack({ data }: { data: ResumeData }) {
  const { profile } = data;
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    ...profile.links.map((l) => l.url),
  ].filter(hasText);

  return (
    <div className="resume-paper" id="resume-paper-print" style={{ padding: "18mm 16mm", color: "#111827" }}>
      <header style={{ textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{profile.fullName || "Your Name"}</h1>
        {hasText(profile.jobTitle) && (
          <p style={{ margin: "2px 0 0", fontSize: 11.5, color: "#374151" }}>{profile.jobTitle}</p>
        )}
        <p style={{ margin: "6px 0 0", fontSize: 9.5, color: "#4b5563" }}>
          {contact.join("  |  ")}
        </p>
      </header>

      {hasText(profile.summary) && (
        <section className="rs-section">
          <h2 style={{ margin: "0 0 6px", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase" as const, borderBottom: "1px solid #111827", paddingBottom: 3 }}>
            Professional Summary
          </h2>
          <p className="rs-desc">{profile.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="rs-section">
          <h2 style={{ margin: "0 0 6px", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase" as const, borderBottom: "1px solid #111827", paddingBottom: 3 }}>
            Work Experience
          </h2>
          {data.experience.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title">{e.position || "Position"}</div>
                  <div className="rs-entry-sub">{[e.company, e.location].filter(hasText).join(", ")}</div>
                </div>
                <div className="rs-entry-dates">{dateRange(e.startDate, e.endDate, e.current)}</div>
              </div>
              {hasText(e.description) && <p className="rs-desc">{e.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="rs-section">
          <h2 style={{ margin: "0 0 6px", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase" as const, borderBottom: "1px solid #111827", paddingBottom: 3 }}>
            Education
          </h2>
          {data.education.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title">{[e.degree, e.field].filter(hasText).join(", ") || "Degree"}</div>
                  <div className="rs-entry-sub">{[e.institution, e.location].filter(hasText).join(", ")}</div>
                </div>
                <div className="rs-entry-dates">{dateRange(e.startDate, e.endDate)}</div>
              </div>
              {hasText(e.gpa) && <p className="rs-desc">GPA: {e.gpa}</p>}
              {hasText(e.description) && <p className="rs-desc">{e.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="rs-section">
          <h2 style={{ margin: "0 0 6px", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase" as const, borderBottom: "1px solid #111827", paddingBottom: 3 }}>
            Skills
          </h2>
          <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.7 }}>
            {data.skills.filter((s) => hasText(s.name)).map((s) => s.name).join(", ")}
          </p>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="rs-section">
          <h2 style={{ margin: "0 0 6px", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase" as const, borderBottom: "1px solid #111827", paddingBottom: 3 }}>
            Projects
          </h2>
          {data.projects.map((p) => (
            <div className="rs-entry" key={p.id}>
              <div className="rs-entry-head">
                <div className="rs-entry-title">{p.name || "Project"}</div>
                <div className="rs-entry-dates">{dateRange(p.startDate, p.endDate)}</div>
              </div>
              {hasText(p.role) && <div className="rs-entry-sub">{p.role}</div>}
              {hasText(p.link) && <div className="rs-entry-sub">{p.link}</div>}
              {hasText(p.description) && <p className="rs-desc">{p.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.certifications.length > 0 && (
        <section className="rs-section">
          <h2 style={{ margin: "0 0 6px", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase" as const, borderBottom: "1px solid #111827", paddingBottom: 3 }}>
            Certifications
          </h2>
          {data.certifications.map((c) => (
            <p key={c.id} style={{ margin: "0 0 4px", fontSize: 10.5 }}>
              <strong>{c.name || "Certification"}</strong>
              {hasText(c.issuer) && ` — ${c.issuer}`}
              {hasText(c.date) && ` (${c.date})`}
            </p>
          ))}
        </section>
      )}

      {data.languages.length > 0 && (
        <section className="rs-section">
          <h2 style={{ margin: "0 0 6px", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase" as const, borderBottom: "1px solid #111827", paddingBottom: 3 }}>
            Languages
          </h2>
          <p style={{ margin: 0, fontSize: 10.5 }}>
            {data.languages
              .filter((l) => hasText(l.name))
              .map((l) => [l.name, l.level].filter(hasText).join(" — "))
              .join(", ")}
          </p>
        </section>
      )}

      {data.customSections.map((c) =>
        hasText(c.title) || hasText(c.content) ? (
          <section className="rs-section" key={c.id}>
            <h2 style={{ margin: "0 0 6px", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase" as const, borderBottom: "1px solid #111827", paddingBottom: 3 }}>
              {c.title || "Section"}
            </h2>
            <p className="rs-desc">{c.content}</p>
          </section>
        ) : null,
      )}
    </div>
  );
}
