import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Executive Elegant — warm dark brown + muted gold rules, refined spacing.
 * For senior/leadership roles: roomy typography, hairline dividers, no clutter.
 */
export function ExecutiveElegant({ data }: { data: ResumeData }) {
  const { profile } = data;
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    ...profile.links.map((l) => l.url),
  ].filter(hasText);

  const GOLD = "#b58b2a";
  const BROWN = "#78350f";

  const sectionTitle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: BROWN,
    borderBottom: `1px solid ${GOLD}`,
    paddingBottom: 4,
    margin: "0 0 10px",
  };

  return (
    <div className="resume-paper" id="resume-paper-print" style={{ padding: "20mm 18mm" }}>
      <header style={{ textAlign: "center", paddingBottom: 12, borderBottom: `2px solid ${GOLD}` }}>
        <h1
          className="rs-name"
          style={{ fontSize: 30, color: BROWN, letterSpacing: "0.04em", fontWeight: 700 }}
        >
          {profile.fullName || "Your Name"}
        </h1>
        {hasText(profile.jobTitle) && (
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 14,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#7c6a4f",
              fontWeight: 600,
            }}
          >
            {profile.jobTitle}
          </p>
        )}
        <div className="rs-contact" style={{ justifyContent: "center", marginTop: 10 }}>
          {contact.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </header>

      {hasText(profile.summary) && (
        <section className="rs-section">
          <h2 style={sectionTitle}>Executive Profile</h2>
          <p className="rs-desc" style={{ textAlign: "center", fontStyle: "italic", color: "#44403c" }}>
            {profile.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="rs-section">
          <h2 style={sectionTitle}>Leadership Experience</h2>
          {data.experience.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title" style={{ fontSize: 14.5, color: BROWN }}>
                    {e.position || "Position"}
                  </div>
                  <div className="rs-entry-sub" style={{ fontWeight: 600 }}>
                    {[e.company, e.location].filter(hasText).join(" — ")}
                  </div>
                </div>
                <div className="rs-entry-dates" style={{ color: GOLD, fontWeight: 600 }}>
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
          <h2 style={sectionTitle}>Education</h2>
          {data.education.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title" style={{ color: BROWN }}>
                    {[e.degree, e.field].filter(hasText).join(", ") || "Degree"}
                  </div>
                  <div className="rs-entry-sub" style={{ fontWeight: 600 }}>
                    {[e.institution, e.location].filter(hasText).join(" — ")}
                  </div>
                </div>
                <div className="rs-entry-dates" style={{ color: GOLD, fontWeight: 600 }}>
                  {dateRange(e.startDate, e.endDate)}
                </div>
              </div>
              {hasText(e.description) && <p className="rs-desc">{e.description}</p>}
              {hasText(e.gpa) && <p className="rs-desc">GPA: {e.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="rs-section">
          <h2 style={sectionTitle}>Notable Projects</h2>
          {data.projects.map((p) => (
            <div className="rs-entry" key={p.id}>
              <div className="rs-entry-head">
                <div className="rs-entry-title" style={{ color: BROWN }}>
                  {p.name || "Project"}
                  {hasText(p.role) && (
                    <span style={{ fontWeight: 400, color: "#44403c" }}> · {p.role}</span>
                  )}
                </div>
                <div className="rs-entry-dates" style={{ color: GOLD, fontWeight: 600 }}>
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

      {data.skills.length > 0 && (
        <section className="rs-section">
          <h2 style={sectionTitle}>Core Competencies</h2>
          <div className="rs-chips">
            {data.skills
              .filter((s) => hasText(s.name))
              .map((s) => (
                <span
                  className="rs-chip"
                  key={s.id}
                  style={{
                    borderRadius: 2,
                    background: "#faf6ec",
                    borderColor: "#e7d9b8",
                    color: BROWN,
                    fontWeight: 500,
                  }}
                >
                  {s.name}
                </span>
              ))}
          </div>
        </section>
      )}

      {(data.certifications.length > 0 || data.languages.length > 0) && (
        <section className="rs-section">
          <h2 style={sectionTitle}>Credentials & Languages</h2>
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
            <h2 style={sectionTitle}>{c.title || "Section"}</h2>
            <p className="rs-desc">{c.content}</p>
          </section>
        ) : null,
      )}
    </div>
  );
}
