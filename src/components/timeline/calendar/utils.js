export const create9WeeksFrame = () => {
  const dates = [];
  const today = new Date();
  const month = today.getMonth();
  dates.push(new Date());

  let currentDay = new Date();
  for (let i = 0; i < 51; i++) {
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

export const getFutureDays = (setDaysRange, container) => {
  const x = container.scrollLeft;
  setDaysRange(range => {

    const copyRange = [...range];
    if (copyRange.length === 0) return copyRange;

    const lastDay = copyRange[copyRange.length - 1];
    let dates = [];
    let currentDay = new Date(`${lastDay.month}-${lastDay.day}-${lastDay.year}`);

    for (let i = 0; i < 10; i++) {
      const nextDate = new Date(currentDay.setDate(currentDay.getDate() + 1));
      dates.push(nextDate)
    };

    const newDates = dates.map(date => {
      return {
        time: date.getTime(),
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    })

    copyRange.splice(0, 10);
    const sortedDays = [...copyRange, ...newDates].sort((a, b) => a.time - b.time);
    return [...sortedDays];
  });
  container.scrollLeft -= 10 * 40;
};

export const getPastDays = (setDaysRange, container) => {
  console.log('getPastDays');
  setDaysRange(range => {
    if (range.length === 0) return range;
    const rangeLength = range.length;
    const firstDay = range[0];
    let dates = [];
    let currentDay = new Date(`${firstDay.month}-${firstDay.day}-${firstDay.year}`);
    for (let i = 0; i < 31; i++) {
      const nextDate = new Date(currentDay.setDate(currentDay.getDate() - 1));
      dates.push(nextDate)
    };
    const formatedDates = dates.map(date => {
      return {
        time: date.getTime(),
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    })
    // range.splice(0, 31);
    const sortedDays = [...range, ...formatedDates].sort((a, b) => a.time - b.time);
    return [...sortedDays];
  });
  container.scrollLeft += 31 * 40;
};

