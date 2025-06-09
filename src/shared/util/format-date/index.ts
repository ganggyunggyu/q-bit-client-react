export const formatDate = (input: Date | string) => {
  const date = new Date(input);
  if (isNaN(date.getTime())) throw new Error('Invalid date input');

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

  return {
    year,
    month,
    day,
    weekday,
    ymd: `${year}-${month}-${day}`,
    full: `${year}년 ${month}월 ${day}일 (${weekday})`,
    short: `${month}.${day} (${weekday})`,
  };
};
