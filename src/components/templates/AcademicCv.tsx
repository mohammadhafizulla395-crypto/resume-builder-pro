import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Academic CV — education-first, serif typography, formal tone.
 * The classic free "University / Faculty" template style.
 */
export function AcademicCv({ data }: { data: ResumeData }) {
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
    fontSize: 12.5,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: 1.2,
    color: "#111827",
    borderBottom: "2px solid #4b5563",
    paddingBottom: 3,
  };

  return (
    <div
      className="resume-paper"
      id="resume-paper-print"
      style={{ padding: "18mm 16mm", fontFamily: "Georgia, 'Times New Roman', serif", color: "#1f2937" }}
    >
      <header style={{ textAlign: "center", borderBottom: "1px solid #9ca3af", paddingBottom: 10 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{profile.fullName || "Your Name"}</h1>
        {hasText(profile.jobTitle) && (
          <p style={{ margin: "4px 0 0", fontSize: 12, fontStyle: "italic", color: "#374151" }}>
            {profile.jobTitle}
          </p>
        )}
        <div className="rs-contact" style={{ justifyContent: "center", marginTop: 6 }}>
          {contact.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </header>

      {hasText(profile.summary) && (
        <section className="rs-section" style={{ marginTop: 4 }}>
          <h2 style={h2}>Research Profile</h2>
          <p className="rs-desc">{profile.summary}</p>
        </section>
      )}

      {/* Education first — academic convention */}
      {data.education.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Education</h2>
          {data.education.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title">{[e.degree, e.field].filter(hasText).join(" in ") || "Degree"}</div>
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

      {data.experience.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Appointments &amp; Experience</h2>
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

      {data.projects.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Selected Projects</h2>
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

      {data.skills.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Skills &amp; Methods</h2>
          <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.8 }}>
            {data.skills.filter((s) => hasText(s.name)).map((s) => s.name).join("  ·  ")}
          </p>
        </section>
      )}

      {data.languages.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Languages</h2>
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
            <h2 style={h2}>{c.title || "Section"}</h2>
            <p className="rs-desc">{c.content}</p>
          </section>
        ) : null,
      )}
    </div>
  );
}
