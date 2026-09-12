<<<<<<< HEAD
/**
 * LifeBuild Helper Utilities
 */

/**
 * Calculate player level and progress based on total XP
 * Formula: Level = floor(sqrt(XP / 100)) + 1
 */
export function calculateLevel(xp = 0) {
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const currentLevelBaseXP = Math.pow(level - 1, 2) * 100;
  const nextLevelXP = Math.pow(level, 2) * 100;
  const xpNeeded = nextLevelXP - currentLevelBaseXP;
  const xpCurrent = xp - currentLevelBaseXP;
  const progressPercent = Math.min(100, Math.max(0, Math.round((xpCurrent / xpNeeded) * 100)));

  return {
    level,
    xpCurrent,
    xpNeeded,
    progressPercent,
  };
}

/**
 * Format date to human readable string
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format number with commas (e.g. 1,000)
 */
export function formatNumber(num = 0) {
  return Number(num).toLocaleString();
}

/**
 * Helper to combine CSS class names conditionally
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
=======

>>>>>>> 96ae548fbe03e2e51ff19e8d491968e1e494b6dd
