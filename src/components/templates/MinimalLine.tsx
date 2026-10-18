import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Minimal Line — hairline dividers and letter-spaced headings.
 * Airy, editorial minimalism that prints cleanly.
 */
export function MinimalLine({ data }: { data: ResumeData }) {
  const { profile } = data;
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    ...profile.links.map((l) => l.url),
  ].filter(hasText);

  const h2 = {
    margin: "0 0 8px",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: 2,
    color: "#374151",
  };

  return (
    <div className="resume-paper" id="resume-paper-print" style={{ padding: "20mm 18mm" }}>
      <header style={{ textAlign: "left" }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: "#111827", letterSpacing: 0.5 }}>
          {profile.fullName || "Your Name"}
        </h1>
        {hasText(profile.jobTitle) && (
          <p style={{ margin: "4px 0 0", fontSize: 11.5, color: "#6b7280", letterSpacing: 1.4, textTransform: "uppercase" }}>
            {profile.jobTitle}
          </p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 16px", marginTop: 8, fontSize: 9.5, color: "#4b5563" }}>
          {contact.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
        <hr style={{ border: 0, borderTop: "1px solid #e5e7eb", marginTop: 14 }} />
      </header>

      {hasText(profile.summary) && (
        <section className="rs-section" style={{ marginTop: 14 }}>
          <h2 style={h2}>Profile</h2>
          <p className="rs-desc" style={{ color: "#374151" }}>{profile.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Experience</h2>
          {data.experience.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title">{e.position || "Position"}</div>
                  <div className="rs-entry-sub">{[e.company, e.location].filter(hasText).join(" · ")}</div>
                </div>
                <div className="rs-entry-dates">{dateRange(e.startDate, e.endDate, e.current)}</div>
              </div>
              {hasText(e.description) && <p className="rs-desc">{e.description}</p>}
            </div>
          ))}
          <hr style={{ border: 0, borderTop: "1px solid #f1f5f9", marginTop: 6 }} />
        </section>
      )}

      {data.education.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Education</h2>
          {data.education.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title">{[e.degree, e.field].filter(hasText).join(", ") || "Degree"}</div>
                  <div className="rs-entry-sub">{[e.institution, e.location].filter(hasText).join(" · ")}</div>
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
          <h2 style={h2}>Skills</h2>
          <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.8, color: "#374151" }}>
            {data.skills.filter((s) => hasText(s.name)).map((s) => s.name).join("  ·  ")}
          </p>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Projects</h2>
          {data.projects.map((p) => (
            <div className="rs-entry" key={p.id}>
              <div className="rs-entry-head">
                <div className="rs-entry-title">{p.name || "Project"}</div>
                <div className="rs-entry-dates">{dateRange(p.startDate, p.endDate)}</div>
              </div>
              {hasText(p.role) && <div className="rs-entry-sub">{p.role}</div>}
              {hasText(p.link) && <div className="rs-entry-sub" style={{ color: "#374151" }}>{p.link}</div>}
              {hasText(p.description) && <p className="rs-desc">{p.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.certifications.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Certifications</h2>
          {data.certifications.map((c) => (
            <div className="rs-entry" key={c.id} style={{ marginBottom: 6 }}>
              <div className="rs-entry-head">
                <div>
                  <span className="rs-entry-title">{c.name || "Certification"}</span>
                  {hasText(c.issuer) && <span className="rs-entry-sub"> — {c.issuer}</span>}
                </div>
                <div className="rs-entry-dates">{c.date}</div>
              </div>
            </div>
          ))}
        </section>
      )}

      {data.languages.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Languages</h2>
          <p style={{ margin: 0, fontSize: 10.5 }}>
            {data.languages
              .filter((l) => hasText(l.name))
              .map((l) => [l.name, l.level].filter(hasText).join(" — "))
              .join("  ·  ")}
          </p>
        </section>
      )}

      {data.customSections.map((c) =>
        hasText(c.title) || hasText(c.content) ? (
          <section className="rs-section" key={c.id}>
            <h2 style={h2}>{c.title || "Section"}</h2>
            <p className="rs-desc">{c.content}</p>
          </section>
        ) : null,
      )}
    </div>
  );
}
