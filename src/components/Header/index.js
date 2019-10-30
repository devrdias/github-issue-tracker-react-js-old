import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

export default function Header({ repository }) {
  return (
    <Container>
      <Link to="/">Return to repositories</Link>
      <img src={repository.owner.avatar_url} alt={repository.owner.login} />
      <h1>{repository.name}</h1>
      <p>{repository.description}</p>
    </Container>
  );
}
