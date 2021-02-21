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

export const placeItemsOnCalendar = (items, daysRange, setDaysRange) => {
  items.forEach(item => {
    const startDay = item.start_time.getDate();
    const startMonth = item.start_time.getMonth() + 1;
    const startYear = item.start_time.getFullYear();
    const startDate = document.querySelector(`#elem-${item.group}-${startDay}-${startMonth}-${startYear}`);

    const interval = (item.end_time.getTime() - item.start_time.getTime()) / (1000*60*60*24) + 1;

    // const dateCell = daysRange.find(date => {
    //   return date.day === startDay && date.month === startMonth && date.year === startYear;
    // });

    // setDaysRange(daysRange => {

    //   const index = daysRange.findIndex(date => {
    //     return date.day === startDay && date.month === startMonth && date.year === startYear;
    //   });

    //   console.log('index', index);

    //   return [...daysRange];
    // });

    const element = document.createElement('div');
    // element.insertAdjacentHTML('beforeend', item.title);
    element.append(item.title);
    element.classList.add('bg-red-500', 'absolute');
    element.style.height = '40px';
    element.style.width = `${40 * interval}px`;
    element.style.top = 0;
    element.style.left = 0;
    element.style.zIndex = 1;

    if (!startDate) return;
    startDate.appendChild(element);

  });




};