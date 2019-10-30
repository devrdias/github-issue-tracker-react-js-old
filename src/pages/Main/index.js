import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Form, Input, ErrorMessage, SubmitButton, List } from './styles';
import Container from '../../components/Container';

export default function Main() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const reposLocalStorage = localStorage.getItem('repositories');
    if (reposLocalStorage) {
      setRepositories(JSON.parse(reposLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  useEffect(() => {
    if (errorMessage !== '') {
      setErrorMessage('');
      setError(false);
    }
  }, [newRepo]);

  const handleOnChange = e => {
    setNewRepo(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);

      if (
        repositories.some(r => r.name.toLowerCase() === newRepo.toLowerCase())
      ) {
        throw new Error('Duplicated repository');
      }
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };
      setRepositories([...repositories, data]);
      setNewRepo('');
      setLoading(false);
    } catch (err) {
      console.log('TCL: Main -> error', err);
      setLoading(false);
      setError(true);
      setErrorMessage(err.message);
    }
  };

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositories
      </h1>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Add repository"
          value={newRepo}
          onChange={handleOnChange}
          error={error}
        />

        <SubmitButton loading={loading} disabled={newRepo === ''}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Details
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
