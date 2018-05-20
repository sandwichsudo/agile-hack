import results from './results';
import { getCheapestPeriods } from './selectors';

Object.defineProperty(Date, "now", {
    value: jest.fn(() => new Date('2018-05-20T18:00:00Z')),
    writable: true
});

describe('selectors', () => {
  describe('getPeriods', () => {
    it('should get two cheapest hour periods', () => {
      const state = {
        results,
        morningMinTime: 0,
        morningMaxTime: 12,
        afternoonMinTime: 0,
        afternoonMaxTime: 8,
      };
      const periods = getCheapestPeriods(state);
      expect(periods).toHaveLength(2)
      expect(periods[0]).toHaveLength(1)
      expect(periods[1][0].time).toEqual('18:00-19:00')
      expect(periods[1][0].averageCost).toEqual(13.36)
      expect(periods[0][0].time).toEqual('18:30-19:30')
      expect(periods[0][0].averageCost).toEqual(15.33)
    });
  });
})
