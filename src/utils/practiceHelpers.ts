/**
 * Display names for the practice sets.
 *
 * The backend still stores the original titles; these are the learner-facing
 * names, so the rename needs no migration and no coordination with the API.
 * Keys are matched exactly against the stored title — anything not listed
 * falls through unchanged.
 */
const PRACTICE_SET_DISPLAY_TITLES: Record<string, string> = {
  'Foundational Basics': 'Core Fundamentals',
  'Path to Proficiency': 'Applied Practice',
  'Masters of Algorithms': 'Advanced Mastery',
  // Some responses arrive with the title already truncated.
  'Masters of Algorith...': 'Advanced Mastery',
};

export function formatPracticeSetTitle(title: string): string {
  return PRACTICE_SET_DISPLAY_TITLES[title.trim()] ?? title;
}
