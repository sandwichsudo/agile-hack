const combinePeriods = (periods) => {
    const numberOfPeriods = periods.length;
    const start = new Date(periods[0].valid_from).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const end = new Date(periods[numberOfPeriods-1].valid_to).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const averageCost = +(periods.reduce((total, item) => {
      total = total + item.value_inc_vat;
      return total;
    }, 0)/numberOfPeriods).toFixed(2);
    return {
      time: `${start}-${end}`,
      startTime: start,
      endTime: end,
      averageCost,
      date: periods[0].valid_from.split('T')[0],
      valid_from: periods[0].valid_from,
    }
}

export const getCheapestPeriods = (state) => {
  if (state.results.length == 0) { return [[],[]] }
  const periods = [];
  for (var i = 0; i < state.devices.length; i++) {
    const device = state.devices[i];
    periods.push({...getCheapestPeriod(state, device.timeinHours), ...device})
  }

  let short = periods.sort((a, b) =>  {
      let date1 = new Date(a.valid_from);
      let date2 = new Date(b.valid_from);

      if (date1 < date2) {
        return -1;
      }
      if (date1 > date2) {
        return 1;
      }
      // a must be equal to b
      return 0;
  });


  const buckets = [[],[]]
  for (var j = 0; j < short.length; j++) {
    const item = short[j];
    const closeOfToday = new Date()
    closeOfToday.setHours(23)
    closeOfToday.setMinutes(40)
    const date = new Date(item.valid_from);
    const index = closeOfToday > date ? 0 : 1;
    buckets[index].push(item);
  }
  return buckets;
}

export const getCheapestPeriod = (state, numberOfHours) => {
  const {
    morningMinTime,
    morningMaxTime,
    afternoonMinTime,
    afternoonMaxTime,
  } = state;

  const results = state.results.filter((item) => {
    let date = new Date(item.valid_from);
    const now = new Date();
    return date > now;
  }).reverse();

  const timePeriods = [];
  const periodsRequired = numberOfHours*2;
  for (var i = 0; i < results.length; i++) {
    const endPeriodIndex = i+periodsRequired;
    if (endPeriodIndex < results.length) {
      timePeriods.push(combinePeriods(results.slice(i, endPeriodIndex)))
    }
  }
  //filter duplicates
  let periods = timePeriods.filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t.time === thing.time && t.averageCost === thing.averageCost
    ))
  );

  // filter times outside the ranges
  periods = periods.filter((item) => {
      // is date in afternoon window?
      const date = new Date(item.valid_from);

      const afternoonMin = new Date(item.valid_from);
      afternoonMin.setHours(12+afternoonMinTime)
      afternoonMin.setMinutes(0)
      const afternoonMax = new Date(item.valid_from);
      afternoonMax.setHours(12+afternoonMaxTime)
      afternoonMax.setMinutes(0)
      const isInAfternoonWindow = afternoonMin <= date && date <= afternoonMax;
      // is date in morning window?
      const morningMin = new Date(item.valid_from);
      morningMin.setHours(morningMinTime)
      morningMin.setMinutes(0)
      const morningMax = new Date(item.valid_from);
      morningMax.setHours(morningMaxTime)
      morningMax.setMinutes(0)

      // could the period cross the morning and afternoon?
      let inWindow = false;
      if (morningMax.getTime() == afternoonMin.getTime()) {
        inWindow = morningMin <= date && date <= afternoonMax;
        console.log(item, inWindow)
      }
      const isInMorningWindow = morningMin <= date && date <= morningMax;
      return isInMorningWindow || isInAfternoonWindow || inWindow;
  })

  // sort by average cost
  periods.sort((a, b) =>  {
      if (a.averageCost < b.averageCost) {
        return -1;
      }
      if (a.averageCost > b.averageCost) {
        return 1;
      }
      // a must be equal to b
      return 0;
  });

  return periods[0];
}

export const getChartData = (state) => {
  return state.results.reduce((chartData, item) => {
    let date_from = new Date(item.valid_to);
    if (date_from > new Date()) {
      chartData.push({
        x: date_from,
        y: item.value_inc_vat,
      })
    }

    return chartData;
  }, []).reverse();
}

export const getListData = (state) => {
  return state.results.reduce((chartData, item) => {
    let date = new Date(item.valid_from);

    if (date > new Date()) {
      chartData.push(item)
    }

    return chartData;
  }, []).reverse();
}
