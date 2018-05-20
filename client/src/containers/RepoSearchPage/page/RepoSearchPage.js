import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RepoResultsList from '../components/RepoResultsList/RepoResultsList';
import Chart from '../components/Chart/Chart';

import * as RepoSearchActions from '../actions/RepoSearchActions';
import './RepoSearchPageStyles.scss';

export class RepoSearchPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.fetchRepos();
  }

  render() {
    const { error, searchResults, loading, graphData } = this.props;
    return (
      <div>
        <h1>Top Javascript Repos</h1>
        {error && <p>{error}</p>}
        {loading && <div className="loader" />}
        {!loading && graphData.length >0 && <Chart graphData={graphData}/>}
        {!loading && <RepoResultsList repos={searchResults}/>}

      </div>
    );
  }
}

RepoSearchPage.propTypes = {
  searchResults: PropTypes.array.isRequired,
  graphData: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

RepoSearchPage.defaultProps = {
  error: '',
};

const getChartData = (state) => {
  return state.results.reduce((chartData, item) => {
    let date = new Date(item.valid_from);

    if (date > Date.now()) {
      chartData.push({
        x: date,
        y: item.value_inc_vat,
      })
    }

    return chartData;
  }, []).reverse();
}
const getListData = (state) => {
  return state.results.reduce((chartData, item) => {
    let date = new Date(item.valid_from);

    if (date > Date.now()) {
      chartData.push(item)
    }

    return chartData;
  }, []).reverse();
}
const mapStateToProps = state => ({
  searchResults: getListData(state.repoSearch),
  error: state.repoSearch.error,
  loading: state.repoSearch.loading,
  graphData: getChartData(state.repoSearch)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(RepoSearchActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepoSearchPage);
