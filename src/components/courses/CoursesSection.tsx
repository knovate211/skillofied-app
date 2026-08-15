import React, { useState, useEffect } from 'react';
import { useCarousel } from '../../hooks/useCarousel';
import SectionHeader from '../layout/SectionHeader';
import CourseCard from './CourseCard';
import styles from './CoursesSection.module.css';
import { getMyCoursesApi } from '../../api';

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

const CoursesSection: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyCoursesApi()
      .then((data) => {
        // Expand "Full Stack Engineering" into its constituent courses
        const expanded: any[] = [];
        data.forEach((course) => {
          if (course.title === 'Full Stack Engineering') {
            expanded.push(
              {
                id: '1',
                title: 'Java Development',
                mentor: 'Deeptanshu Kumar',
                initial: 'J',
                color: '#6c5ce7',
                classTime: '09:00 – 11:30 AM',
              },
              {
                id: '2',
                title: 'Front-End Technologies',
                mentor: 'Priya M. Khaisate',
                initial: 'F',
                color: '#e05a36',
                classTime: '11:15 – 01:15 PM',
              },
              {
                id: '3',
                title: 'Mastering SQL',
                mentor: 'Ayush B',
                initial: 'M',
                color: '#10ac84',
                classTime: '11:30 – 12:45 PM',
              }
            );
          } else {
            expanded.push(course);
          }
        });
        setCourses(expanded);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <SectionHeader title="Continue growing" eyebrow="Pick up where you left off" />
        <div className={styles.grid}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading courses...</p>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className={styles.section}>
        <SectionHeader title="Continue growing" eyebrow="Pick up where you left off" />
        <div className={styles.grid}>
          <p style={{ color: 'var(--text-secondary)' }}>You are not enrolled in any courses yet.</p>
        </div>
      </section>
    );
  }

  const devCourses = courses.filter(c => {
    const t = c.title.toLowerCase();
    return !t.includes('seo') && !t.includes('marketing') && !t.includes('testing') && !t.includes('qa');
  });
  
  const marketingCourses = courses.filter(c => {
    const t = c.title.toLowerCase();
    return (t.includes('seo') || t.includes('marketing')) && !t.includes('testing') && !t.includes('qa');
  });

  const testingCourses = courses.filter(c => {
    const t = c.title.toLowerCase();
    return t.includes('testing') || t.includes('qa');
  });

  return (
    <section className={styles.section}>
      <CategoryRow title="Continue growing" eyebrow="Pick up where you left off" courses={devCourses} />
      <CategoryRow title="Marketing Courses" eyebrow="Grow your reach" courses={marketingCourses} />
      <CategoryRow title="QA & Software Testing" eyebrow="Sharpen your rigour" courses={testingCourses} />
    </section>
  );
};

export default CoursesSection;
