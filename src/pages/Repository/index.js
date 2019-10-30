import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Container from '../../components/Container';
import SearchForm from '../../components/SearchForm';
import IssueList from '../../components/IssueList';
import Header from '../../components/Header';
import api from '../../services/api';
import { Loading, Paginator } from './styles';

export default function Repository({ match }) {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [query, setQuery] = useState('is:open');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const repoName = decodeURIComponent(match.params.repository);
    const fetchData = async () => {
      setLoading(true);
      const [_repo, _issues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepository(_repo.data);
      setIssues(_issues.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleOnChange = e => {
    setQuery(e.target.value);
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    const filterAll = query.trim().includes('is:all');
    const filterOpen = query.trim().includes('is:open');
    const filterClosed = query.trim().includes('is:closed');

    let filter = null;
    if (filterAll) {
      filter = 'all';
    }
    if (filterOpen) {
      filter = 'open';
    }
    if (filterClosed) {
      filter = 'closed';
    }

    if (!filter) {
      filter = 'all';
    }

    const filteredIssues = await api.get(
      `/repos/${repository.full_name}/issues?state=${filter}`
    );
    if (filteredIssues) {
      setIssues(filteredIssues.data);
    }
  };

  if (loading) {
    return <Loading>Loading</Loading>;
  }

  return (
    <Container>
      <Header repository={repository} />
      <SearchForm
        onSubmit={handleOnSubmit}
        onChange={handleOnChange}
        query={query}
      />
      <IssueList issues={issues} />
      <Paginator />
    </Container>
  );
}

Repository.defaultProps = {};

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
