import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Federal Block — labelled contact block (KSA style), detail-dense,
 * no decoration. The free "federal / government application" template.
 */
export function FederalBlock({ data }: { data: ResumeData }) {
  const { profile } = data;

  const h2 = {
    margin: "14px 0 7px",
    fontSize: 11.5,
    fontWeight: 800,
    textTransform: "uppercase" as const,
    letterSpacing: 1.2,
    color: "#ffffff",
    background: "#1f2937",
    padding: "4px 8px",
  };

  const label = {
    fontWeight: 700 as const,
    fontSize: 9.5,
    textTransform: "uppercase" as const,
    letterSpacing: 0.6,
    color: "#374151",
  };

  return (
    <div className="resume-paper" id="resume-paper-print" style={{ padding: "16mm 15mm" }}>
      <header>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, textAlign: "center" as const }}>
          {profile.fullName || "Your Name"}
        </h1>
        {hasText(profile.jobTitle) && (
          <p style={{ margin: "3px 0 0", fontSize: 11.5, textAlign: "center" as const }}>{profile.jobTitle}</p>
        )}

        {/* Labelled contact block */}
        <div
          style={{
            marginTop: 10,
            border: "1px solid #9ca3af",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4px 18px",
            padding: "8px 10px",
            fontSize: 10,
          }}
        >
          {hasText(profile.email) && (
            <div><span style={label}>Email: </span>{profile.email}</div>
          )}
          {hasText(profile.phone) && (
            <div><span style={label}>Phone: </span>{profile.phone}</div>
          )}
          {hasText(profile.location) && (
            <div><span style={label}>Location: </span>{profile.location}</div>
          )}
          {hasText(profile.website) && (
            <div><span style={label}>Website: </span>{profile.website}</div>
          )}
          {profile.links.filter((l) => hasText(l.url)).map((l, i) => (
            <div key={i}>
              <span style={label}>{hasText(l.label) ? l.label : "Link"}: </span>
              {l.url}
            </div>
          ))}
        </div>
      </header>

      {hasText(profile.summary) && (
        <section className="rs-section" style={{ marginTop: 6 }}>
          <h2 style={h2}>Professional Summary</h2>
          <p className="rs-desc">{profile.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Professional Experience</h2>
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
          <h2 style={h2}>Certifications &amp; Clearances</h2>
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
          <h2 style={h2}>Skills</h2>
          <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.75 }}>
            {data.skills.filter((s) => hasText(s.name)).map((s) => s.name).join(", ")}
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
              {hasText(p.link) && <div className="rs-entry-sub">{p.link}</div>}
              {hasText(p.description) && <p className="rs-desc">{p.description}</p>}
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
