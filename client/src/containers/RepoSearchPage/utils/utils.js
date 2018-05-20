export const createTimeScale = (times, hours) => {
  const numberOfPoints = times.length;
  const marks = {};
  const style = {
    color: 'white',
  }
  const period = hours/(numberOfPoints-1);


  for (var i = 0; i < numberOfPoints; i++) {
    const sum = i*period;
    marks[sum] = {
      label: times[i],
      style,
    }
  }
  return marks;
}
