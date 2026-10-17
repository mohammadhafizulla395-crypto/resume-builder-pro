import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Two-Column Sidebar — left sidebar (contact, skills, languages, certs),
 * right main column (profile, experience, education, projects).
 * Real table-free layout so ATS parsers read it top-to-bottom safely.
 */
export function TwoColumnSidebar({ data }: { data: ResumeData }) {
  const { profile } = data;

  return (
    <div
      className="resume-paper"
      id="resume-paper-print"
      style={{ padding: 0, display: "flex", minHeight: "297mm" }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "34%",
          background: "#0e7490",
          color: "#ffffff",
          padding: "16mm 8mm",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: 21,
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.2,
            wordBreak: "break-word",
          }}
        >
          {profile.fullName || "Your Name"}
        </h1>
        {hasText(profile.jobTitle) && (
          <p style={{ fontSize: 12.5, marginTop: 4, color: "#cffafe", fontWeight: 600 }}>
            {profile.jobTitle}
          </p>
        )}

        <div style={{ marginTop: 16, fontSize: 11.5, lineHeight: 1.9, wordBreak: "break-word" }}>
          {(
            [
              ["Email", profile.email],
              ["Phone", profile.phone],
              ["Location", profile.location],
              ["Website", profile.website],
              ...profile.links.map((l): [string, string] => [l.label || "Link", l.url]),
            ] as [string, string][]
          )
            .filter(([, v]) => hasText(v))
            .map(([k, v]) => (
              <div key={k + v} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a5f3fc" }}>
                  {k}
                </div>
                <div>{v}</div>
              </div>
            ))}
        </div>

        {data.skills.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <h2 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 3 }}>
              Skills
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0", fontSize: 11.5, lineHeight: 1.8 }}>
              {data.skills
                .filter((s) => hasText(s.name))
                .map((s) => (
                  <li key={s.id}>• {s.name}</li>
                ))}
            </ul>
          </div>
        )}

        {data.languages.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <h2 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 3 }}>
              Languages
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0", fontSize: 11.5, lineHeight: 1.8 }}>
              {data.languages
                .filter((l) => hasText(l.name))
                .map((l) => (
                  <li key={l.id}>
                    • {l.name}
                    {hasText(l.level) && <span style={{ color: "#a5f3fc" }}> — {l.level}</span>}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {data.certifications.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <h2 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 3 }}>
              Certifications
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0", fontSize: 11.5, lineHeight: 1.7 }}>
              {data.certifications
                .filter((c) => hasText(c.name))
                .map((c) => (
                  <li key={c.id} style={{ marginBottom: 5 }}>
                    • {c.name}
                    {hasText(c.issuer) && <div style={{ color: "#a5f3fc", fontSize: 10.5 }}>{c.issuer}</div>}
                    {hasText(c.date) && <div style={{ color: "#a5f3fc", fontSize: 10.5 }}>{c.date}</div>}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Main column */}
      <main style={{ flex: 1, padding: "16mm 12mm", boxSizing: "border-box" }}>
        {hasText(profile.summary) && (
          <section className="rs-section" style={{ marginTop: 0 }}>
            <h2 className="rs-section-title" style={{ color: "#0e7490", borderBottomColor: "#67e8f9" }}>
              Profile
            </h2>
            <p className="rs-desc">{profile.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="rs-section">
            <h2 className="rs-section-title" style={{ color: "#0e7490", borderBottomColor: "#67e8f9" }}>
              Experience
            </h2>
            {data.experience.map((e) => (
              <div className="rs-entry" key={e.id}>
                <div className="rs-entry-head">
                  <div>
                    <div className="rs-entry-title">{e.position || "Position"}</div>
                    <div className="rs-entry-sub" style={{ color: "#0e7490", fontWeight: 600 }}>
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

        {data.education.length > 0 && (
          <section className="rs-section">
            <h2 className="rs-section-title" style={{ color: "#0e7490", borderBottomColor: "#67e8f9" }}>
              Education
            </h2>
            {data.education.map((e) => (
              <div className="rs-entry" key={e.id}>
                <div className="rs-entry-head">
                  <div>
                    <div className="rs-entry-title">
                      {[e.degree, e.field].filter(hasText).join(", ") || "Degree"}
                    </div>
                    <div className="rs-entry-sub" style={{ color: "#0e7490", fontWeight: 600 }}>
                      {[e.institution, e.location].filter(hasText).join(" · ")}
                    </div>
                  </div>
                  <div className="rs-entry-dates">{dateRange(e.startDate, e.endDate)}</div>
                </div>
                {hasText(e.description) && <p className="rs-desc">{e.description}</p>}
                {hasText(e.gpa) && <p className="rs-desc">GPA: {e.gpa}</p>}
              </div>
            ))}
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="rs-section">
            <h2 className="rs-section-title" style={{ color: "#0e7490", borderBottomColor: "#67e8f9" }}>
              Projects
            </h2>
            {data.projects.map((p) => (
              <div className="rs-entry" key={p.id}>
                <div className="rs-entry-head">
                  <div>
                    <div className="rs-entry-title">{p.name || "Project"}</div>
                    {hasText(p.role) && <div className="rs-entry-sub">{p.role}</div>}
                  </div>
                  <div className="rs-entry-dates">{dateRange(p.startDate, p.endDate)}</div>
                </div>
                {hasText(p.link) && <div className="rs-entry-sub" style={{ color: "#0e7490" }}>{p.link}</div>}
                {hasText(p.description) && <p className="rs-desc">{p.description}</p>}
              </div>
            ))}
          </section>
        )}

        {data.customSections.map((c) =>
          hasText(c.title) || hasText(c.content) ? (
            <section className="rs-section" key={c.id}>
              <h2 className="rs-section-title" style={{ color: "#0e7490", borderBottomColor: "#67e8f9" }}>
                {c.title || "Section"}
              </h2>
              <p className="rs-desc">{c.content}</p>
            </section>
          ) : null,
        )}
      </main>
    </div>
  );
}
