export const getStartEndUTCTime = (period: number) => {
  const dt = new Date();

  const yearEnd = dt.getUTCFullYear();
  const monthEnd = dt.getUTCMonth() + 1;
  const dayEnd = dt.getUTCDate();

  dt.setUTCDate(dt.getUTCDate() - period);

  const yearStart = dt.getUTCFullYear();
  const monthStart = dt.getUTCMonth() + 1;
  const dayStart = dt.getUTCDate();

  const starttime = `${yearStart}-${monthStart}-${dayStart}`;
  const endtime = `${yearEnd}-${monthEnd}-${dayEnd}`;

  return { starttime, endtime };
};
