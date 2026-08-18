import React, { useState, useEffect } from 'react';
import { useCarousel } from '../../hooks/useCarousel';
import { getMyCoursesApi, listPracticeSetsApi } from '../../api';
import { practiceSetMetadata } from '../../data/mockData';
import SectionHeader from '../layout/SectionHeader';
import PracticeCard from './PracticeCard';
import styles from './PracticeSection.module.css';

interface PracticeSectionProps {
  isHomePage?: boolean;
}

const PracticeSection: React.FC<PracticeSectionProps> = ({ isHomePage = false }) => {
  const [sets, setSets] = useState<any[]>([]);
  const [isMarketingEnrolled, setIsMarketingEnrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Call hooks unconditionally at the top level
  const carousel = useCarousel(sets.length, 3);

  useEffect(() => {
    // 1. Load course enrollment statuses to verify Marketing courses
    getMyCoursesApi()
      .then((courses) => {
        const hasMarketing = (courses || []).some((c: any) =>
          c.title.includes('SEO') || c.title.includes('Marketing') || c.id === 'seo' || c.id === 'digital-marketing'
        );
        setIsMarketingEnrolled(hasMarketing);
      })
      .catch(err => console.error("Failed to load courses:", err));

    // 2. Load practice sets, enriched with local category/description metadata
    listPracticeSetsApi()
      .then((fetchedSets) => {
        setSets(fetchedSets.map((s) => {
          const meta = practiceSetMetadata[s.id];
          return {
            ...s,
            category: meta?.category || 'General Practice',
            description: meta?.description || 'Test your skills with these challenges.',
          };
        }));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load practice sets from API:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
          Loading practice sets...
        </div>
      </section>
    );
  }

  // If the user has no practice sets, hide the entire section.
  if (sets.length === 0 && !isMarketingEnrolled) {
    return null;
  }

  if (isHomePage) {
    const { startIndex, prev, next, canPrev, canNext } = carousel;
    const visible = sets.slice(startIndex, startIndex + 3);

    return (
      <section className={styles.section}>
        <SectionHeader
          title="Practice"
          eyebrow="Sharpen your skills"
          onPrev={prev}
          onNext={next}
          canPrev={canPrev}
          canNext={canNext}
        />
        <div className={styles.grid}>
          {visible.map((ps) => (
            <PracticeCard key={ps.id} practiceSet={ps} />
          ))}
        </div>
      </section>
    );
  }

  // Group sets by category for practice page
  const groupedSets = sets.reduce((acc, set) => {
    const cat = set.category || 'General Practice';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(set);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <section className={styles.section}>
      {Object.entries(groupedSets).map(([category, categorySets]) => (
        <div key={category} className={styles.categoryGroup}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          <div className={styles.grid}>
            {(categorySets as any[]).map((ps: any) => (
              <PracticeCard key={ps.id} practiceSet={ps} />
            ))}
          </div>
        </div>
      ))}

      {isMarketingEnrolled && (
        <div className={styles.categoryGroup}>
          <h2 className={styles.categoryTitle}>Marketing & Growth Experiments</h2>
          <div className={styles.comingSoonCard}>
            <div className={styles.comingSoonAnimation}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
            <h3 className={styles.comingSoonHeader}>SEO & Digital Marketing Practice</h3>
            <p className={styles.comingSoonSub}>
              Interactive keyword analysis, SEO grading matrices, and digital campaign simulations are being prepared by the mentors.
            </p>
            <div className={styles.comingSoonBadge}>🚀 Coming Soon</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PracticeSection;
