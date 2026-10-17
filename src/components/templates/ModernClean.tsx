import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Modern Clean — indigo accent rules, confident headings.
 * Still single-column under the hood for ATS safety, with colored section dividers.
 */
export function ModernClean({ data }: { data: ResumeData }) {
  const { profile } = data;
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    ...profile.links.map((l) => l.url),
  ].filter(hasText);

  return (
    <div className="resume-paper" id="resume-paper-print" style={{ padding: "18mm 16mm" }}>
      <header style={{ borderBottom: "3px solid #4f46e5", paddingBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
          <div>
            <h1 className="rs-name" style={{ color: "#111827" }}>
              {profile.fullName || "Your Name"}
            </h1>
            {hasText(profile.jobTitle) && (
              <p
                className="rs-title"
                style={{ color: "#4f46e5", fontWeight: 600, fontSize: 14.5 }}
              >
                {profile.jobTitle}
              </p>
            )}
          </div>
          <div style={{ textAlign: "right", fontSize: 11.5, color: "#4b5563", lineHeight: 1.7 }}>
            {contact.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        </div>
      </header>

      {hasText(profile.summary) && (
        <section className="rs-section">
          <h2
            className="rs-section-title"
            style={{ color: "#4f46e5", borderBottomColor: "#c7d2fe" }}
          >
            Profile
          </h2>
          <p className="rs-desc">{profile.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="rs-section">
          <h2
            className="rs-section-title"
            style={{ color: "#4f46e5", borderBottomColor: "#c7d2fe" }}
          >
            Work Experience
          </h2>
          {data.experience.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title">{e.position || "Position"}</div>
                  <div className="rs-entry-sub" style={{ color: "#4f46e5", fontWeight: 600 }}>
                    {[e.company, e.location].filter(hasText).join(" · ")}
                  </div>
                </div>
                <div className="rs-entry-dates">
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
          <h2
            className="rs-section-title"
            style={{ color: "#4f46e5", borderBottomColor: "#c7d2fe" }}
          >
            Education
          </h2>
          {data.education.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title">
                    {[e.degree, e.field].filter(hasText).join(", ") || "Degree"}
                  </div>
                  <div className="rs-entry-sub" style={{ color: "#4f46e5", fontWeight: 600 }}>
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

      {data.skills.length > 0 && (
        <section className="rs-section">
          <h2
            className="rs-section-title"
            style={{ color: "#4f46e5", borderBottomColor: "#c7d2fe" }}
          >
            Skills
          </h2>
          <div className="rs-chips">
            {data.skills
              .filter((s) => hasText(s.name))
              .map((s) => (
                <span
                  className="rs-chip"
                  key={s.id}
                  style={{
                    background: "#eef2ff",
                    borderColor: "#c7d2fe",
                    color: "#3730a3",
                    fontWeight: 500,
                  }}
                >
                  {s.name}
                </span>
              ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="rs-section">
          <h2
            className="rs-section-title"
            style={{ color: "#4f46e5", borderBottomColor: "#c7d2fe" }}
          >
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
              {hasText(p.link) && (
                <div className="rs-entry-sub" style={{ color: "#4f46e5" }}>
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
          <h2
            className="rs-section-title"
            style={{ color: "#4f46e5", borderBottomColor: "#c7d2fe" }}
          >
            Certifications & Languages
          </h2>
          {data.certifications.length > 0 && (
            <p className="rs-desc">
              {data.certifications
                .filter((c) => hasText(c.name))
                .map((c) => [c.name, c.issuer, c.date].filter(hasText).join(" — "))
                .join("\n")}
            </p>
          )}
          {data.languages.length > 0 && (
            <p className="rs-desc" style={{ marginTop: 6 }}>
              <strong>Languages:</strong>{" "}
              {data.languages
                .filter((l) => hasText(l.name))
                .map((l) => [l.name, l.level].filter(hasText).join(" — "))
                .join("  ·  ")}
            </p>
          )}
        </section>
      )}

      {data.customSections.map((c) =>
        hasText(c.title) || hasText(c.content) ? (
          <section className="rs-section" key={c.id}>
            <h2
              className="rs-section-title"
              style={{ color: "#4f46e5", borderBottomColor: "#c7d2fe" }}
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
