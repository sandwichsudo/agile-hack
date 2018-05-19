import React from 'react';
import PropTypes from 'prop-types';

const RepoResultsList = ({ repos }) => (
  <ul>
    {repos.map(repo => <li key={repo.valid_from}>
      valid_from: {repo.valid_from}
      valid_to: {repo.valid_to}
      value_inc_vat: {repo.value_inc_vat}
      </li>)}
  </ul>
);

RepoResultsList.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default RepoResultsList;
