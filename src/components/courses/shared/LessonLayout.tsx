import React from 'react';
import styles from './LessonLayout.module.css';
import { LESSON_DIAGRAMS } from './diagrams';

export interface LessonCallout {
  /** Bold lead-in, e.g. "Think of Java like this:" */
  lead?: string;
  /** Highlighted remainder of the sentence. */
  text: string;
}

export interface LessonSideBullet {
  label: string;
  text: string;
}

export interface LessonSidePanel {
  title: string;
  /** Key into LESSON_DIAGRAMS. Omit for a text-only panel. */
  diagram?: string;
  bulletsTitle?: string;
  bullets: LessonSideBullet[];
}

interface Props {
  /** Eyebrow badge, e.g. "Module 1 • Lesson 2". */
  badge?: string;
  title: string;
  /** Pre-rendered theory prose. */
  theory: React.ReactNode;
  callout?: LessonCallout;
  objectives: string[];
  takeaways: string[];
  sidePanel?: LessonSidePanel;
  /** Syntax / code demo / mistakes blocks, rendered between objectives and takeaways. */
  children?: React.ReactNode;
}

// Icons cycle by position so a lesson only has to supply plain strings.
const OBJECTIVE_ICONS = ['🎯', '⚙️', '🚀', '🧩', '🔧', '📐'];
const TAKEAWAY_ICONS = ['💻', '🧠', '🌐', '⚡', '🔒', '📦'];
const TAKEAWAY_TINTS = [styles.tint1, styles.tint2, styles.tint3];

const CheckIcon: React.FC = () => (
  <svg className={styles.sideBulletCheck} width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M6 10.2l2.6 2.6L14 7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LessonLayout: React.FC<Props> = ({
  badge,
  title,
  theory,
  callout,
  objectives,
  takeaways,
  sidePanel,
  children,
}) => {
  const Diagram = sidePanel?.diagram ? LESSON_DIAGRAMS[sidePanel.diagram] : undefined;
  // toArray drops the `false`/null branches the renderer passes for lessons
  // without a syntax, code, or mistakes block, so the spacer stays collapsed.
  const hasExtras = React.Children.toArray(children).length > 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        <div className={styles.main}>
          {badge && <span className={styles.badge}>{badge}</span>}
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.theory}>{theory}</div>

          {callout && (
            <div className={styles.callout}>
              <span className={styles.calloutIcon} aria-hidden="true">i</span>
              <p className={styles.calloutText}>
                {callout.lead && <>{callout.lead} </>}
                <em>{callout.text}</em>
              </p>
            </div>
          )}

          {objectives.length > 0 && (
            <>
              <hr className={styles.divider} />
              <h2 className={styles.sectionHead}>
                <span className={styles.sectionIcon} aria-hidden="true">🎯</span>
                Learning Objectives
              </h2>
              <ul className={styles.objectives}>
                {objectives.map((obj, i) => (
                  <li key={i} className={styles.objective}>
                    <span className={styles.objectiveIcon} aria-hidden="true">
                      {OBJECTIVE_ICONS[i % OBJECTIVE_ICONS.length]}
                    </span>
                    <span className={styles.objectiveText}>{obj}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {hasExtras && <div className={styles.extras}>{children}</div>}

          {takeaways.length > 0 && (
            <>
              <hr className={styles.divider} />
              <h2 className={styles.sectionHead}>
                <span className={styles.sectionIcon} aria-hidden="true">💡</span>
                Key Takeaways
              </h2>
              <ul className={styles.takeaways}>
                {takeaways.map((item, i) => (
                  <li key={i} className={`${styles.takeaway} ${TAKEAWAY_TINTS[i % TAKEAWAY_TINTS.length]}`}>
                    <span className={styles.takeawayIcon} aria-hidden="true">
                      {TAKEAWAY_ICONS[i % TAKEAWAY_ICONS.length]}
                    </span>
                    <span className={styles.takeawayText}>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {sidePanel && (
          <aside className={styles.side}>
            <div className={styles.sideCard}>
              <h2 className={styles.sideTitle}>{sidePanel.title}</h2>

              {Diagram && (
                <div className={styles.sideDiagram}>
                  <Diagram />
                </div>
              )}

              {sidePanel.bullets.length > 0 && (
                <>
                  {sidePanel.bulletsTitle && (
                    <h3 className={styles.sideBulletsTitle}>{sidePanel.bulletsTitle}</h3>
                  )}
                  <ul className={styles.sideBullets}>
                    {sidePanel.bullets.map((b, i) => (
                      <li key={i} className={styles.sideBullet}>
                        <CheckIcon />
                        <span>
                          <span className={styles.sideBulletLabel}>{b.label}</span>
                          {b.text ? ` – ${b.text}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default LessonLayout;
