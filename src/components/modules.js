export const checkAm = (isAM, time) => {
  let countTime = parseInt(time);
  if (isAM) {
    countTime += 12;
  }
  return countTime;
};

export const checkDate = (data) => {
  let nowDate = new Date(); //현재시간

  nowDate = nowDate.getTime();

  let startDate = new Date(); //이벤트 시작 시간
  startDate.setHours(checkAm(data.startAm, data.startTime), 0, 0);

  let beforestartDate = new Date(); //이벤트 시작 시간
  beforestartDate.setHours(checkAm(data.startAm, data.startTime - 2), 0, 0);

  let endDate = new Date(); //이벤트 끝나는 시간
  endDate.setHours(checkAm(data.endAm, data.endTime), 0, 0);

  if (endDate <= startDate) {
    endDate.setTime(endDate.getTime() + 1000 * 60 * 60 * 24);
  }

  return {
    nowDate,
    startDate,
    beforestartDate,
    endDate,
  };
};
