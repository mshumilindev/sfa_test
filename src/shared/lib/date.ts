export const getCurrentYear = (): number => new Date().getFullYear();

export const getGraduationYearBounds = (): { minYear: number; maxYear: number } => {
  const maxYear = getCurrentYear();
  return { minYear: maxYear - 50, maxYear };
};
