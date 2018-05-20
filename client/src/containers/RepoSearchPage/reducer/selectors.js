const combinePeriods = (a, b) => {
    const start = new Date(a.valid_from).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const end = new Date(b.valid_to).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return {
      time: `${start}-${end}`,
      averageCost: +((a.value_inc_vat + b.value_inc_vat) / 2).toFixed(2),
      date: a.valid_from.split('T')[0],
      valid_from: a.valid_from,
    }
}

export const getCheapestPeriods = (state) => {
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
  // bring the cheapest periods to the beginning of the array and check half hours either side
  const sortedResults = results.slice().sort((a, b) => {
      if (a.value_inc_vat < b.value_inc_vat) {
        return -1;
      }
      if (a.value_inc_vat < b.value_inc_vat) {
        return 1;
      }
      // a must be equal to b
      return 0;
  });
  const hourPeriods = [];
  for (var i = 0; i < sortedResults.length; i++) {
    const period = sortedResults[i];

    const periodIndex = results.findIndex((el) => el.valid_from == period.valid_from);
    let previousPeriod;
    let nextPeriod;
    if (periodIndex > 0) {
      previousPeriod = results[periodIndex-1];
      hourPeriods.push(combinePeriods(previousPeriod, period))
    }
    if (periodIndex < (results.length - 1)) {
      nextPeriod = results[periodIndex+1]
      hourPeriods.push(combinePeriods(period, nextPeriod))
    }
  }
  hourPeriods.sort((a, b) =>  {
      if (a.averageCost < b.averageCost) {
        return -1;
      }
      if (a.averageCost > b.averageCost) {
        return 1;
      }
      // a must be equal to b
      return 0;
  });

  //filter duplicates
  let periods = hourPeriods.filter((thing, index, self) =>
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
      const isInMorningWindow = morningMin <= date && date <= morningMax;
      return isInMorningWindow || isInAfternoonWindow;
  })

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
  }).slice(0,3);


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

export const getChartData = (state) => {
  return state.results.reduce((chartData, item) => {
    let date = new Date(item.valid_from);

    if (date > new Date()) {
      chartData.push({
        x: date,
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
