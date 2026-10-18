import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Designer Portfolio — oversized display name, links-forward header,
 * rose accent. The free-tier "creative" template style.
 */
export function DesignerPortfolio({ data }: { data: ResumeData }) {
  const { profile } = data;
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    ...profile.links.map((l) => l.url),
  ].filter(hasText);

  const h2 = {
    margin: "16px 0 8px",
    fontSize: 10.5,
    fontWeight: 800,
    textTransform: "uppercase" as const,
    letterSpacing: 2.4,
    color: "#e11d48",
  };

  return (
    <div className="resume-paper" id="resume-paper-print" style={{ padding: "20mm 17mm" }}>
      <header>
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 900, lineHeight: 1.05, color: "#18181b", letterSpacing: -0.8 }}>
          {profile.fullName || "Your Name"}
        </h1>
        {hasText(profile.jobTitle) && (
          <p style={{ margin: "5px 0 0", fontSize: 13, fontWeight: 600, color: "#e11d48", textTransform: "uppercase", letterSpacing: 1.6 }}>
            {profile.jobTitle}
          </p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", marginTop: 9, fontSize: 9.5, color: "#3f3f46" }}>
          {contact.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
        <hr style={{ border: 0, borderTop: "4px solid #18181b", margin: "14px 0 0" }} />
      </header>

      {hasText(profile.summary) && (
        <section className="rs-section" style={{ marginTop: 14 }}>
          <h2 style={h2}>Profile</h2>
          <p className="rs-desc" style={{ fontSize: 11 }}>{profile.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Experience</h2>
          {data.experience.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title" style={{ fontSize: 12 }}>{e.position || "Position"}</div>
                  <div className="rs-entry-sub" style={{ color: "#e11d48" }}>
                    {[e.company, e.location].filter(hasText).join(" · ")}
                  </div>
                </div>
                <div className="rs-entry-dates">{dateRange(e.startDate, e.endDate, e.current)}</div>
              </div>
              {hasText(e.description) && <p className="rs-desc">{e.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Selected Work</h2>
          {data.projects.map((p) => (
            <div className="rs-entry" key={p.id}>
              <div className="rs-entry-head">
                <div className="rs-entry-title">{p.name || "Project"}</div>
                <div className="rs-entry-dates">{dateRange(p.startDate, p.endDate)}</div>
              </div>
              {hasText(p.role) && <div className="rs-entry-sub">{p.role}</div>}
              {hasText(p.link) && (
                <div className="rs-entry-sub" style={{ color: "#e11d48", fontWeight: 600 }}>{p.link}</div>
              )}
              {hasText(p.description) && <p className="rs-desc">{p.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Capabilities</h2>
          <div className="rs-chips">
            {data.skills.filter((s) => hasText(s.name)).map((s) => (
              <span className="rs-chip" key={s.id} style={{ background: "#18181b", color: "#fafafa", borderRadius: 999 }}>
                {s.name}
              </span>
            ))}
          </div>
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

      {data.certifications.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Certifications</h2>
          {data.certifications.map((c) => (
            <div className="rs-entry" key={c.id} style={{ marginBottom: 5 }}>
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
