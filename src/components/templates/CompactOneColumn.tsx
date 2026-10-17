import type { ResumeData } from "@/types/resume";
import { hasText, dateRange } from "./registry";

/**
 * Compact One-Column — tight spacing, 11.5px body, inline dates.
 * Designed to fit 10+ years of history on a single A4 page.
 */
export function CompactOneColumn({ data }: { data: ResumeData }) {
  const { profile } = data;
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    ...profile.links.map((l) => l.url),
  ].filter(hasText);

  const compact: React.CSSProperties = { fontSize: 12.5, lineHeight: 1.42 };

  return (
    <div
      className="resume-paper"
      id="resume-paper-print"
      style={{ ...compact, padding: "12mm 14mm" }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
        <div>
          <h1 className="rs-name" style={{ fontSize: 22 }}>
            {profile.fullName || "Your Name"}
          </h1>
          {hasText(profile.jobTitle) && (
            <p className="rs-title" style={{ fontSize: 13, marginTop: 1 }}>
              {profile.jobTitle}
            </p>
          )}
        </div>
        <div style={{ textAlign: "right", fontSize: 11, color: "#4b5563", lineHeight: 1.55 }}>
          {contact.map((c, i) => (
            <div key={i}>{c}</div>
          ))}
        </div>
      </header>
      <div style={{ height: 2, background: "#334155", marginTop: 8 }} />

      {hasText(profile.summary) && (
        <section className="rs-section" style={{ marginTop: 10 }}>
          <h2 className="rs-section-title" style={{ fontSize: 11.5, marginBottom: 4, borderBottomWidth: 1 }}>
            Summary
          </h2>
          <p className="rs-desc" style={{ marginTop: 0 }}>
            {profile.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="rs-section" style={{ marginTop: 10 }}>
          <h2 className="rs-section-title" style={{ fontSize: 11.5, marginBottom: 4, borderBottomWidth: 1 }}>
            Experience
          </h2>
          {data.experience.map((e) => (
            <div className="rs-entry" key={e.id} style={{ marginBottom: 7 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  {e.position || "Position"}
                  {hasText(e.company) && (
                    <span style={{ fontWeight: 400, color: "#475569" }}> — {e.company}</span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: "#64748b", whiteSpace: "nowrap" }}>
                  {dateRange(e.startDate, e.endDate, e.current)}
                  {hasText(e.location) && <span> · {e.location}</span>}
                </div>
              </div>
              {hasText(e.description) && (
                <p className="rs-desc" style={{ marginTop: 2, fontSize: 12 }}>
                  {e.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      <div style={{ display: "flex", gap: 18 }}>
        {data.education.length > 0 && (
          <section className="rs-section" style={{ marginTop: 8, flex: 1 }}>
            <h2 className="rs-section-title" style={{ fontSize: 11.5, marginBottom: 4, borderBottomWidth: 1 }}>
              Education
            </h2>
            {data.education.map((e) => (
              <div className="rs-entry" key={e.id} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>
                  {[e.degree, e.field].filter(hasText).join(", ") || "Degree"}
                </div>
                <div style={{ fontSize: 11.5, color: "#475569" }}>
                  {[e.institution, e.location].filter(hasText).join(" · ")}
                </div>
                <div style={{ fontSize: 11, color: "#64748b" }}>
                  {dateRange(e.startDate, e.endDate)}
                  {hasText(e.gpa) && <span> · GPA {e.gpa}</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="rs-section" style={{ marginTop: 8, flex: 1 }}>
            <h2 className="rs-section-title" style={{ fontSize: 11.5, marginBottom: 4, borderBottomWidth: 1 }}>
              Skills
            </h2>
            <div className="rs-chips" style={{ gap: 4 }}>
              {data.skills
                .filter((s) => hasText(s.name))
                .map((s) => (
                  <span className="rs-chip" key={s.id} style={{ fontSize: 11, padding: "1px 8px" }}>
                    {s.name}
                  </span>
                ))}
            </div>
          </section>
        )}
      </div>

      {data.projects.length > 0 && (
        <section className="rs-section" style={{ marginTop: 8 }}>
          <h2 className="rs-section-title" style={{ fontSize: 11.5, marginBottom: 4, borderBottomWidth: 1 }}>
            Projects
          </h2>
          {data.projects.map((p) => (
            <div className="rs-entry" key={p.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>
                  {p.name || "Project"}
                  {hasText(p.role) && <span style={{ fontWeight: 400, color: "#475569" }}> — {p.role}</span>}
                </div>
                <div style={{ fontSize: 11, color: "#64748b", whiteSpace: "nowrap" }}>
                  {dateRange(p.startDate, p.endDate)}
                </div>
              </div>
              {hasText(p.link) && <div style={{ fontSize: 11, color: "#2563eb" }}>{p.link}</div>}
              {hasText(p.description) && (
                <p className="rs-desc" style={{ marginTop: 1, fontSize: 12 }}>
                  {p.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {(data.certifications.length > 0 || data.languages.length > 0) && (
        <section className="rs-section" style={{ marginTop: 8 }}>
          <h2 className="rs-section-title" style={{ fontSize: 11.5, marginBottom: 4, borderBottomWidth: 1 }}>
            Certifications & Languages
          </h2>
          {data.certifications.length > 0 && (
            <p className="rs-desc" style={{ marginTop: 0, fontSize: 12 }}>
              <strong>Certifications:</strong>{" "}
              {data.certifications
                .filter((c) => hasText(c.name))
                .map((c) => [c.name, c.issuer, c.date].filter(hasText).join(", "))
                .join("; ")}
            </p>
          )}
          {data.languages.length > 0 && (
            <p className="rs-desc" style={{ marginTop: 2, fontSize: 12 }}>
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
          <section className="rs-section" key={c.id} style={{ marginTop: 8 }}>
            <h2 className="rs-section-title" style={{ fontSize: 11.5, marginBottom: 4, borderBottomWidth: 1 }}>
              {c.title || "Section"}
            </h2>
            <p className="rs-desc" style={{ marginTop: 0, fontSize: 12 }}>
              {c.content}
            </p>
          </section>
        ) : null,
      )}
    </div>
  );
}
