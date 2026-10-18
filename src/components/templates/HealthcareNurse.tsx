import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Healthcare Nurse — certifications/licensure forward, teal header band.
 * Free-tier clinical/healthcare template structure.
 */
export function HealthcareNurse({ data }: { data: ResumeData }) {
  const { profile } = data;
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    ...profile.links.map((l) => l.url),
  ].filter(hasText);

  const h2 = {
    margin: "14px 0 7px",
    fontSize: 11.5,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: 1.2,
    color: "#155e75",
    borderBottom: "2px solid #67e8f9",
    paddingBottom: 4,
  };

  return (
    <div className="resume-paper" id="resume-paper-print" style={{ padding: 0 }}>
      <header style={{ background: "#0e7490", color: "#ffffff", padding: "18px 17mm 14px" }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{profile.fullName || "Your Name"}</h1>
        {hasText(profile.jobTitle) && (
          <p style={{ margin: "3px 0 0", fontSize: 12, opacity: 0.95 }}>{profile.jobTitle}</p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", marginTop: 7, fontSize: 9.5 }}>
          {contact.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </header>

      <div style={{ padding: "14px 17mm 20px" }}>
        {hasText(profile.summary) && (
          <section className="rs-section" style={{ marginTop: 0 }}>
            <h2 style={h2}>Clinical Summary</h2>
            <p className="rs-desc">{profile.summary}</p>
          </section>
        )}

        {/* Licensure & certifications forward — healthcare convention */}
        {data.certifications.length > 0 && (
          <section className="rs-section">
            <h2 style={h2}>Licensure &amp; Certifications</h2>
            <div style={{ display: "grid", gap: 4 }}>
              {data.certifications.map((c) => (
                <div key={c.id} style={{ fontSize: 10.5 }}>
                  <span style={{ fontWeight: 700, color: "#164e63" }}>{c.name || "Certification"}</span>
                  {hasText(c.issuer) && <span> — {c.issuer}</span>}
                  {hasText(c.date) && <span style={{ color: "#6b7280" }}> · {c.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="rs-section">
            <h2 style={h2}>Clinical Experience</h2>
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

        {data.skills.length > 0 && (
          <section className="rs-section">
            <h2 style={h2}>Clinical Skills</h2>
            <div className="rs-chips">
              {data.skills.filter((s) => hasText(s.name)).map((s) => (
                <span className="rs-chip" key={s.id} style={{ background: "#ecfeff", color: "#155e75" }}>
                  {s.name}
                </span>
              ))}
            </div>
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
                {hasText(p.link) && <div className="rs-entry-sub" style={{ color: "#0e7490" }}>{p.link}</div>}
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
    </div>
  );
}
