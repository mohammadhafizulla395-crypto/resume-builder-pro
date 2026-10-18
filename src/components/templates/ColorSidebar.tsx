import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Color Sidebar — indigo left sidebar (contact, skills, languages, certs)
 * beside a light main column. The classic two-column free template.
 */
export function ColorSidebar({ data }: { data: ResumeData }) {
  const { profile } = data;
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    ...profile.links.map((l) => l.url),
  ].filter(hasText);

  const sideH = {
    margin: "0 0 7px",
    fontSize: 10,
    fontWeight: 800,
    textTransform: "uppercase" as const,
    letterSpacing: 1.4,
    color: "#e0e7ff",
    borderBottom: "1px solid rgba(255,255,255,0.35)",
    paddingBottom: 3,
  };

  const mainH = {
    margin: "14px 0 7px",
    fontSize: 11.5,
    fontWeight: 800,
    textTransform: "uppercase" as const,
    letterSpacing: 1.2,
    color: "#3730a3",
  };

  const sideEntry = { marginBottom: 8, fontSize: 9.5, lineHeight: 1.5, color: "#eef2ff" };

  return (
    <div className="resume-paper" id="resume-paper-print" style={{ padding: 0, display: "flex", minHeight: "100%" }}>
      {/* Sidebar */}
      <aside style={{ width: "34%", background: "#4f46e5", color: "#ffffff", padding: "18px 14px", flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, lineHeight: 1.15 }}>
          {profile.fullName || "Your Name"}
        </h1>
        {hasText(profile.jobTitle) && (
          <p style={{ margin: "4px 0 0", fontSize: 11, color: "#c7d2fe" }}>{profile.jobTitle}</p>
        )}

        <section style={{ marginTop: 16 }}>
          <h2 style={sideH}>Contact</h2>
          {contact.map((c, i) => (
            <div key={i} style={{ ...sideEntry, marginBottom: 4, wordBreak: "break-word" }}>{c}</div>
          ))}
        </section>

        {data.skills.length > 0 && (
          <section style={{ marginTop: 16 }}>
            <h2 style={sideH}>Skills</h2>
            {data.skills.filter((s) => hasText(s.name)).map((s) => (
              <div key={s.id} style={{ ...sideEntry, marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{s.name}</span>
                {hasText(s.level) && <span style={{ color: "#c7d2fe" }}> — {s.level}</span>}
              </div>
            ))}
          </section>
        )}

        {data.languages.length > 0 && (
          <section style={{ marginTop: 16 }}>
            <h2 style={sideH}>Languages</h2>
            {data.languages.filter((l) => hasText(l.name)).map((l) => (
              <div key={l.id} style={{ ...sideEntry, marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{l.name}</span>
                {hasText(l.level) && <span style={{ color: "#c7d2fe" }}> — {l.level}</span>}
              </div>
            ))}
          </section>
        )}

        {data.certifications.length > 0 && (
          <section style={{ marginTop: 16 }}>
            <h2 style={sideH}>Certifications</h2>
            {data.certifications.map((c) => (
              <div key={c.id} style={{ ...sideEntry, marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{c.name || "Certification"}</span>
                {hasText(c.issuer) && <div style={{ color: "#c7d2fe" }}>{c.issuer}</div>}
                {hasText(c.date) && <div style={{ color: "#c7d2fe" }}>{c.date}</div>}
              </div>
            ))}
          </section>
        )}
      </aside>

      {/* Main column */}
      <div style={{ flex: 1, padding: "18px 16px 22px 18px", minWidth: 0 }}>
        {hasText(profile.summary) && (
          <section className="rs-section" style={{ marginTop: 0 }}>
            <h2 style={{ ...mainH, marginTop: 0 }}>Profile</h2>
            <p className="rs-desc">{profile.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="rs-section">
            <h2 style={mainH}>Experience</h2>
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
            <h2 style={mainH}>Education</h2>
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
            <h2 style={mainH}>Projects</h2>
            {data.projects.map((p) => (
              <div className="rs-entry" key={p.id}>
                <div className="rs-entry-head">
                  <div className="rs-entry-title">{p.name || "Project"}</div>
                  <div className="rs-entry-dates">{dateRange(p.startDate, p.endDate)}</div>
                </div>
                {hasText(p.role) && <div className="rs-entry-sub">{p.role}</div>}
                {hasText(p.link) && <div className="rs-entry-sub" style={{ color: "#4f46e5" }}>{p.link}</div>}
                {hasText(p.description) && <p className="rs-desc">{p.description}</p>}
              </div>
            ))}
          </section>
        )}

        {data.customSections.map((c) =>
          hasText(c.title) || hasText(c.content) ? (
            <section className="rs-section" key={c.id}>
              <h2 style={mainH}>{c.title || "Section"}</h2>
              <p className="rs-desc">{c.content}</p>
            </section>
          ) : null,
        )}
      </div>
    </div>
  );
}
