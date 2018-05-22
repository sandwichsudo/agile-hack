import React from 'react';
import PropTypes from 'prop-types';

const RepoResultsList = ({ repos }) => (
  <table>
    <thead>
      <tr>
        <th>From</th>
        <th>To</th>
        <th>p/kWh</th>
      </tr>
    </thead>
    <tbody>
      {repos.map(repo => <tr key={repo.valid_from}>
        <td>{new Date(repo.valid_from).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
        <td>{new Date(repo.valid_to).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
        <td>{repo.value_inc_vat}</td>
        </tr>)}
    </tbody>
  </table>
);

RepoResultsList.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default RepoResultsList;
