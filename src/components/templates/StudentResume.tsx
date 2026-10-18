import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Student Resume — education, projects and skills first; lime accents.
 * The free-tier "student / internship" template structure.
 */
export function StudentResume({ data }: { data: ResumeData }) {
  const { profile } = data;
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    ...profile.links.map((l) => l.url),
  ].filter(hasText);

  const h2 = {
    margin: "13px 0 6px",
    fontSize: 11.5,
    fontWeight: 800,
    textTransform: "uppercase" as const,
    letterSpacing: 1.2,
    color: "#3f6212",
  };

  return (
    <div className="resume-paper" id="resume-paper-print" style={{ padding: "16mm 15mm" }}>
      <header>
        <h1 className="rs-name" style={{ margin: 0, color: "#1a2e05" }}>{profile.fullName || "Your Name"}</h1>
        {hasText(profile.jobTitle) && <p className="rs-title" style={{ color: "#65a30d" }}>{profile.jobTitle}</p>}
        <div className="rs-contact">
          {contact.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </header>

      {hasText(profile.summary) && (
        <section className="rs-section" style={{ marginTop: 8 }}>
          <h2 style={h2}>About Me</h2>
          <p className="rs-desc">{profile.summary}</p>
        </section>
      )}

      {/* Education first — student convention */}
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
              {hasText(p.link) && <div className="rs-entry-sub" style={{ color: "#65a30d" }}>{p.link}</div>}
              {hasText(p.description) && <p className="rs-desc">{p.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Skills</h2>
          <div className="rs-chips">
            {data.skills.filter((s) => hasText(s.name)).map((s) => (
              <span className="rs-chip" key={s.id} style={{ background: "#ecfccb", color: "#3f6212" }}>
                {s.name}
              </span>
            ))}
          </div>
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
