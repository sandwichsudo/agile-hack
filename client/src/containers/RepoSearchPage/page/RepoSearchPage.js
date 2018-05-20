import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from '../components/Menu/Menu';
import RepoResultsList from '../components/RepoResultsList/RepoResultsList';
import Chart from '../components/Chart/Chart';
import Timeline from '../components/Timeline/Timeline';
import { getChartData, getListData, getCheapestPeriods } from '../reducer/selectors';
import * as RepoSearchActions from '../actions/RepoSearchActions';
import { Route, Switch, withRouter } from 'react-router-dom';
import './RepoSearchPageStyles.scss';

export class RepoSearchPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.fetchRepos();
  }

  render() {
    const {
      error,
      searchResults,
      loading,
      graphData,
      cheapestHours,
      actions,
      morningMinTime,
      morningMaxTime,
      afternoonMinTime,
      afternoonMaxTime,
    } = this.props;

    return (
      <div>
        <h1>Electricity Forecast</h1>
        {error && <p>{error}</p>}
        {loading && <div className="loader" />}
        {!loading && <Switch>
          <Route exact path='/'
            render={() =>
               <Timeline
                cheapestHours={cheapestHours}
                sliderChange={actions.sliderChange}
                morningMinTime={morningMinTime}
                morningMaxTime={morningMaxTime}
                afternoonMinTime={afternoonMinTime}
                afternoonMaxTime={afternoonMaxTime}
                />
            }
          />
          <Route exact path='/list'
            render={() =>
              <RepoResultsList repos={searchResults}/>
            }
          />
          <Route exact path='/graph'
            render={() =>
              <Chart graphData={graphData}/>
            }
          />
        </Switch>}
        <Menu items={[
          { to: '/', title: 'Home'},
          { to: '/graph', title: 'Graph'},
          { to: '/list', title: 'List'},
        ]}/>
      </div>
    );
  }
}

RepoSearchPage.propTypes = {
  searchResults: PropTypes.array.isRequired,
  graphData: PropTypes.array.isRequired,
  cheapestHours: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
  morningMinTime:PropTypes.number.isRequired,
  morningMaxTime:PropTypes.number.isRequired,
  afternoonMinTime:PropTypes.number.isRequired,
  afternoonMaxTime: PropTypes.number.isRequired,
};

RepoSearchPage.defaultProps = {
  error: '',
};

const mapStateToProps = state => ({
  searchResults: getListData(state.repoSearch),
  error: state.repoSearch.error,
  loading: state.repoSearch.loading,
  graphData: getChartData(state.repoSearch),
  cheapestHours: getCheapestPeriods(state.repoSearch),
  morningMinTime:state.repoSearch.morningMinTime,
  morningMaxTime:state.repoSearch.morningMaxTime,
  afternoonMinTime:state.repoSearch.afternoonMinTime,
  afternoonMaxTime: state.repoSearch.afternoonMaxTime,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(RepoSearchActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RepoSearchPage));
