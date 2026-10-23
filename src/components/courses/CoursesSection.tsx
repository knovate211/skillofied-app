import React, { useMemo } from 'react';
import { useCarousel } from '../../hooks/useCarousel';
import SectionHeader from '../layout/SectionHeader';
import { courseForTitle, isDevelopmentLearner, ownedCourseKeys } from '../../lib/courseRegistry';
import CourseCard from './CourseCard';
import styles from './CoursesSection.module.css';

const CategoryRow: React.FC<{ title: string; eyebrow?: string; courses: any[] }> = ({ title, eyebrow, courses }) => {
  const { startIndex, prev, next, canPrev, canNext } = useCarousel(courses.length, 3);
  const visible = courses.slice(startIndex, startIndex + 3);

  if (courses.length === 0) return null;

  return (
    <div className={styles.categoryGroup}>
      <SectionHeader
        title={title}
        eyebrow={eyebrow}
        onPrev={prev}
        onNext={next}
        canPrev={canPrev}
        canNext={canNext}
      />
      <div className={styles.grid}>
        {visible.map((course, i) => (
          /* Tone cycles with the visible slot, so a row is always honey →
             olive → rose regardless of how far the carousel has scrolled. */
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>
    </div>
  );
};

/**
 * Self-paced courses. These are not enrolments: there is no mentor, no class
 * time and no grant behind them, so they never come back from getMyCourses.
 * They open for anyone on a development track, matching the same rule the
 * sidebar applies — see isDevelopmentStudent in Sidebar.tsx.
 */
const SELF_PACED_COURSES = [
  {
    id: 'self-os',
    title: 'Operating Systems',
    mentor: 'Self-paced',
    initial: 'OS',
    color: '#0984e3',
    classTime: 'Learn at your own pace',
  },
  {
    id: 'self-networking',
    title: 'Computer Networks',
    mentor: 'Self-paced',
    initial: 'CN',
    color: '#00b894',
    classTime: 'Learn at your own pace',
  },
];

/**
 * The cards to show for the learner's enrolments. getMyCourses already lists
 * the courses inside a bundle (Full Stack); the bundle's own record is an
 * entitlement, not a course, so it gets no card. Titles are de-duplicated in
 * case a course is held both directly and through a bundle.
 */
function cardsFor(enrolledCourses: any[]): any[] {
  return enrolledCourses.filter(
    (c, i) =>
      courseForTitle(c.title)?.key !== 'fullstack' &&
      enrolledCourses.findIndex((o) => o.title === c.title) === i,
  );
}

interface CoursesSectionProps {
  /** From App, which loads them once for the whole shell; null while loading. */
  enrolledCourses: any[] | null;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ enrolledCourses }) => {
  const courses = useMemo(() => cardsFor(enrolledCourses ?? []), [enrolledCourses]);
  const loading = enrolledCourses === null;

  if (loading) {
    return (
      <section className={styles.section}>
        <SectionHeader title="Development Courses" eyebrow="Pick up where you left off" />
        <div className={styles.grid}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading courses...</p>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className={styles.section}>
        <SectionHeader title="Development Courses" eyebrow="Pick up where you left off" />
        <div className={styles.grid}>
          <p style={{ color: 'var(--text-secondary)' }}>You are not enrolled in any courses yet.</p>
        </div>
      </section>
    );
  }

  // Rows by the course's category (courseRegistry). An enrolment the app has
  // no page for still shows, in the development row.
  const categoryOf = (c: any) => courseForTitle(c.title)?.category ?? 'Development';
  const devCourses = courses.filter((c) => categoryOf(c) === 'Development');
  const marketingCourses = courses.filter((c) => categoryOf(c) === 'Marketing');
  const testingCourses = courses.filter((c) => categoryOf(c) === 'QA & Testing');

  // Marketing- and QA-only students do not see the CS Core row: these are the
  // fundamentals under the development track, not part of what they enrolled in.
  const selfPaced = isDevelopmentLearner(ownedCourseKeys(enrolledCourses ?? [])) ? SELF_PACED_COURSES : [];

  return (
    <section className={styles.section}>
      <CategoryRow title="Development Courses" eyebrow="Pick up where you left off" courses={devCourses} />
      <CategoryRow
        title="Computer Science Core"
        eyebrow="Self-paced · no schedule, start any time"
        courses={selfPaced}
      />
      <CategoryRow title="Marketing Courses" eyebrow="Grow your reach" courses={marketingCourses} />
      <CategoryRow title="QA & Software Testing" eyebrow="Sharpen your rigour" courses={testingCourses} />
    </section>
  );
};

export default CoursesSection;
