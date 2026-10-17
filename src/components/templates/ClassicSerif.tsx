import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Classic Serif — traditional Georgia typography, formal-industry feel.
 * Centered nameplate, ruled headings, restrained color.
 */
export function ClassicSerif({ data }: { data: ResumeData }) {
  const { profile } = data;
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    ...profile.links.map((l) => l.url),
  ].filter(hasText);

  const serif: React.CSSProperties = {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
  };

  return (
    <div
      className="resume-paper"
      id="resume-paper-print"
      style={{ ...serif, padding: "18mm 18mm" }}
    >
      <header style={{ textAlign: "center", borderBottom: "2px solid #1e293b", paddingBottom: 10 }}>
        <h1
          className="rs-name"
          style={{ ...serif, fontSize: 28, fontWeight: 700, letterSpacing: "0.02em" }}
        >
          {profile.fullName || "Your Name"}
        </h1>
        {hasText(profile.jobTitle) && (
          <p className="rs-title" style={{ ...serif, fontStyle: "italic", fontSize: 15 }}>
            {profile.jobTitle}
          </p>
        )}
        <div
          className="rs-contact"
          style={{ ...serif, justifyContent: "center", marginTop: 8 }}
        >
          {contact.map((c, i) => (
            <span key={i} style={i > 0 ? { borderLeft: "1px solid #94a3b8", paddingLeft: 14 } : undefined}>
              {c}
            </span>
          ))}
        </div>
      </header>

      {hasText(profile.summary) && (
        <section className="rs-section">
          <h2 className="rs-section-title" style={{ ...serif, textAlign: "center", border: "none", letterSpacing: "0.14em" }}>
            Professional Summary
          </h2>
          <p className="rs-desc" style={{ textAlign: "center", fontStyle: "italic" }}>
            {profile.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="rs-section">
          <h2 className="rs-section-title" style={{ ...serif, border: "none", borderBottom: "1px solid #64748b", letterSpacing: "0.14em" }}>
            Professional Experience
          </h2>
          {data.experience.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title" style={serif}>
                    {e.position || "Position"}
                  </div>
                  <div className="rs-entry-sub" style={{ fontStyle: "italic" }}>
                    {[e.company, e.location].filter(hasText).join(", ")}
                  </div>
                </div>
                <div className="rs-entry-dates" style={serif}>
                  {dateRange(e.startDate, e.endDate, e.current)}
                </div>
              </div>
              {hasText(e.description) && <p className="rs-desc">{e.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="rs-section">
          <h2 className="rs-section-title" style={{ ...serif, border: "none", borderBottom: "1px solid #64748b", letterSpacing: "0.14em" }}>
            Education
          </h2>
          {data.education.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title" style={serif}>
                    {[e.degree, e.field].filter(hasText).join(", ") || "Degree"}
                  </div>
                  <div className="rs-entry-sub" style={{ fontStyle: "italic" }}>
                    {[e.institution, e.location].filter(hasText).join(", ")}
                  </div>
                </div>
                <div className="rs-entry-dates" style={serif}>
                  {dateRange(e.startDate, e.endDate)}
                </div>
              </div>
              {hasText(e.gpa) && <p className="rs-desc">GPA: {e.gpa}</p>}
              {hasText(e.description) && <p className="rs-desc">{e.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="rs-section">
          <h2 className="rs-section-title" style={{ ...serif, border: "none", borderBottom: "1px solid #64748b", letterSpacing: "0.14em" }}>
            Areas of Expertise
          </h2>
          <p style={{ margin: 0, lineHeight: 1.8 }}>
            {data.skills
              .filter((s) => hasText(s.name))
              .map((s) => s.name)
              .join("  ·  ")}
          </p>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="rs-section">
          <h2 className="rs-section-title" style={{ ...serif, border: "none", borderBottom: "1px solid #64748b", letterSpacing: "0.14em" }}>
            Projects
          </h2>
          {data.projects.map((p) => (
            <div className="rs-entry" key={p.id}>
              <div className="rs-entry-head">
                <div className="rs-entry-title" style={serif}>
                  {p.name || "Project"}
                  {hasText(p.role) && <span style={{ fontStyle: "italic", fontWeight: 400 }}> — {p.role}</span>}
                </div>
                <div className="rs-entry-dates" style={serif}>
                  {dateRange(p.startDate, p.endDate)}
                </div>
              </div>
              {hasText(p.link) && (
                <div className="rs-entry-sub" style={{ color: "#2563eb" }}>
                  {p.link}
                </div>
              )}
              {hasText(p.description) && <p className="rs-desc">{p.description}</p>}
            </div>
          ))}
        </section>
      )}

      {(data.certifications.length > 0 || data.languages.length > 0) && (
        <section className="rs-section">
          <h2 className="rs-section-title" style={{ ...serif, border: "none", borderBottom: "1px solid #64748b", letterSpacing: "0.14em" }}>
            Additional Information
          </h2>
          {data.certifications.length > 0 && (
            <p className="rs-desc">
              <strong>Certifications:</strong>{" "}
              {data.certifications
                .filter((c) => hasText(c.name))
                .map((c) => [c.name, c.issuer, c.date].filter(hasText).join(", "))
                .join("; ")}
            </p>
          )}
          {data.languages.length > 0 && (
            <p className="rs-desc">
              <strong>Languages:</strong>{" "}
              {data.languages
                .filter((l) => hasText(l.name))
                .map((l) => [l.name, l.level].filter(hasText).join(" — "))
                .join("; ")}
            </p>
          )}
        </section>
      )}

      {data.customSections.map((c) =>
        hasText(c.title) || hasText(c.content) ? (
          <section className="rs-section" key={c.id}>
            <h2
              className="rs-section-title"
              style={{ ...serif, border: "none", borderBottom: "1px solid #64748b", letterSpacing: "0.14em" }}
            >
              {c.title || "Section"}
            </h2>
            <p className="rs-desc">{c.content}</p>
          </section>
        ) : null,
      )}
    </div>
  );
}
