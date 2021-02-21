export const create9WeeksFrame = () => {
  const dates = [];
  const today = new Date();
  const month = today.getMonth();
  dates.push(new Date());

  let currentDay = new Date();
  for (let i = 0; i < 31; i++) {
    const nextDate = new Date(currentDay.setDate(currentDay.getDate() + 1));
    dates.push(nextDate)
  };

  currentDay = new Date();
  for (let i = 31; i > 0; i--) {
    const nextDate = new Date(currentDay.setDate(currentDay.getDate() - 1));
    dates.push(nextDate)
  };

  return dates.sort((a, b) => a - b);
};
