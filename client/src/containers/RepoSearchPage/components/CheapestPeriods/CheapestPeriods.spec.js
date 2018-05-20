import React from 'react';
import { shallow } from 'enzyme';
import CheapestPeriods from './CheapestPeriods';

describe('<CheapestPeriods />', () => {
  let props = {};
  let repoDataMock1 = {
    time: 'foo',
    averageCost: 'bar',
  };
  let repoDataMock2 = {
    time: 'baz',
    averageCost: 'bing',
  };
  beforeEach(() => {

    props = {
      actions: {
        fetchRepos: jest.fn(),
      },
      periods: [ repoDataMock1, repoDataMock2 ]
    };
  });

  describe('CheapestPeriods', () => {
    it('should have list item for each repo', () => {
      const wrapper = shallow(<CheapestPeriods {...props} />);
      expect(wrapper.find('li').length).toEqual(2);
    });
  });

});
