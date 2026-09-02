export function getCourseButtonText(progress: number) {
  if (progress === 0) return "Start Course";
  if (progress === 100) return "Review Course";
  return "Continue Learning";
}

export function getCourseProgress(title: string): number {
  const t = title.toLowerCase();
  let storageKey = '';
  let totalItems = 0;

  if (t.includes('frontend') || t.includes('front-end')) {
    storageKey = 'maxIndexRead';
    totalItems = 201;
  } else if (t.includes('java')) {
    storageKey = 'maxJavaIndexRead';
    totalItems = 210;
  } else if (t.includes('sql')) {
    storageKey = 'maxSqlIndexRead';
    totalItems = 91;
  } else if (t.includes('golang')) {
    storageKey = 'maxGolangIndexRead';
    totalItems = 179;
  } else if (t.includes('full stack') || t.includes('fullstack')) {
    storageKey = 'maxFullStackIndexRead';
    totalItems = 7;
  } else if (t.includes('seo')) {
    storageKey = 'maxSeoIndexRead';
    totalItems = 27;
  } else if (t.includes('marketing')) {
    storageKey = 'maxDigitalMarketingIndexRead';
    totalItems = 27;
  } else if (t.includes('testing') || t.includes('qa')) {
    storageKey = 'maxTestingIndexRead';
    totalItems = 168;
  }

  if (storageKey) {
    const savedIdx = localStorage.getItem(storageKey);
    if (savedIdx) {
      const idx = parseInt(savedIdx, 10);
      if (!isNaN(idx)) {
        return Math.round(((idx + 1) / totalItems) * 100);
      }
    }
  }

  // No stored progress means the learner has not opened the course yet.
  return 0;
}
