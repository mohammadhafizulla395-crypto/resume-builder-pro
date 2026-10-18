import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * IT Specialist — certifications forward, violet accents, two-up skill rows.
 * Free-tier staple for sysadmin / support / infrastructure roles.
 */
export function ItSpecialist({ data }: { data: ResumeData }) {
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
    color: "#7c3aed",
    borderBottom: "2px solid #ddd6fe",
    paddingBottom: 4,
  };

  return (
    <div className="resume-paper" id="resume-paper-print" style={{ padding: "16mm 15mm" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 8, padding: "12px 14px" }}>
        <div>
          <h1 className="rs-name" style={{ margin: 0, fontSize: 21, color: "#4c1d95" }}>{profile.fullName || "Your Name"}</h1>
          {hasText(profile.jobTitle) && <p className="rs-title" style={{ color: "#7c3aed" }}>{profile.jobTitle}</p>}
        </div>
        <div style={{ textAlign: "right", fontSize: 9.5, color: "#4b5563", lineHeight: 1.6 }}>
          {contact.map((c, i) => (
            <div key={i}>{c}</div>
          ))}
        </div>
      </header>

      {hasText(profile.summary) && (
        <section className="rs-section" style={{ marginTop: 10 }}>
          <h2 style={h2}>Summary</h2>
          <p className="rs-desc">{profile.summary}</p>
        </section>
      )}

      {/* Certifications forward — IT hiring convention */}
      {data.certifications.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Certifications</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px 14px" }}>
            {data.certifications.map((c) => (
              <div key={c.id} style={{ fontSize: 10.5 }}>
                <span style={{ fontWeight: 700, color: "#3b0764" }}>{c.name || "Certification"}</span>
                {hasText(c.issuer) && <span> — {c.issuer}</span>}
                {hasText(c.date) && <span style={{ color: "#6b7280" }}> ({c.date})</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="rs-section">
          <h2 style={h2}>Technical Skills</h2>
          <div className="rs-chips">
            {data.skills.filter((s) => hasText(s.name)).map((s) => (
              <span className="rs-chip" key={s.id} style={{ background: "#ede9fe", color: "#5b21b6" }}>
                {s.name}
                {hasText(s.level) ? ` · ${s.level}` : ""}
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
              {hasText(p.link) && <div className="rs-entry-sub" style={{ color: "#7c3aed" }}>{p.link}</div>}
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
  );
}
