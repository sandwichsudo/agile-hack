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
        <td>{repo.valid_from.split('T')[1].replace(':00Z', '')}</td>
        <td>{repo.valid_to.split('T')[1].replace(':00Z', '')}</td>
        <td>{repo.value_inc_vat}</td>
        </tr>)}
    </tbody>
  </table>
);

RepoResultsList.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default RepoResultsList;
