export const getStartEndTime = (period: number) => {
  const dt = new Date();

  const yearEnd = dt.getFullYear();
  const monthEnd = dt.getMonth() + 1;
  const dayEnd = dt.getDate();

  dt.setDate(dt.getDate() - period);

  const yearStart = dt.getFullYear();
  const monthStart = dt.getMonth() + 1;
  const dayStart = dt.getDate();

  const starttime = `${yearStart}-${monthStart}-${dayStart}`;
  const endtime = `${yearEnd}-${monthEnd}-${dayEnd}`;

  return { starttime, endtime };
};
