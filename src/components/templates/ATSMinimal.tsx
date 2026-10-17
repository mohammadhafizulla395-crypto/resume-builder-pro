import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * ATS Minimal — the strictest single-column layout.
 * Pure semantic text, no icons/columns/colors in body: highest ATS parse safety.
 */
export function ATSMinimal({ data }: { data: ResumeData }) {
  const { profile } = data;
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    ...profile.links.map((l) => l.url),
  ].filter(hasText);

  return (
    <div className="resume-paper" id="resume-paper-print">
      <header style={{ textAlign: "center" }}>
        <h1 className="rs-name">{profile.fullName || "Your Name"}</h1>
        {hasText(profile.jobTitle) && <p className="rs-title">{profile.jobTitle}</p>}
        <div className="rs-contact" style={{ justifyContent: "center" }}>
          {contact.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </header>

      {hasText(profile.summary) && (
        <section className="rs-section">
          <h2 className="rs-section-title">Summary</h2>
          <p className="rs-desc">{profile.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="rs-section">
          <h2 className="rs-section-title">Experience</h2>
          {data.experience.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title">{e.position || "Position"}</div>
                  <div className="rs-entry-sub">
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
          <h2 className="rs-section-title">Education</h2>
          {data.education.map((e) => (
            <div className="rs-entry" key={e.id}>
              <div className="rs-entry-head">
                <div>
                  <div className="rs-entry-title">
                    {[e.degree, e.field].filter(hasText).join(", ") || "Degree"}
                  </div>
                  <div className="rs-entry-sub">
                    {[e.institution, e.location].filter(hasText).join(" · ")}
                  </div>
                </div>
                <div className="rs-entry-dates">
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
          <h2 className="rs-section-title">Skills</h2>
          <div className="rs-chips">
            {data.skills.filter((s) => hasText(s.name)).map((s) => (
              <span className="rs-chip" key={s.id}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="rs-section">
          <h2 className="rs-section-title">Projects</h2>
          {data.projects.map((p) => (
            <div className="rs-entry" key={p.id}>
              <div className="rs-entry-head">
                <div className="rs-entry-title">{p.name || "Project"}</div>
                <div className="rs-entry-dates">{dateRange(p.startDate, p.endDate)}</div>
              </div>
              {hasText(p.role) && <div className="rs-entry-sub">{p.role}</div>}
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

      {data.certifications.length > 0 && (
        <section className="rs-section">
          <h2 className="rs-section-title">Certifications</h2>
          {data.certifications.map((c) => (
            <div className="rs-entry" key={c.id} style={{ marginBottom: 6 }}>
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
          <h2 className="rs-section-title">Languages</h2>
          <p>
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
            <h2 className="rs-section-title">{c.title || "Section"}</h2>
            <p className="rs-desc">{c.content}</p>
          </section>
        ) : null,
      )}
    </div>
  );
}
