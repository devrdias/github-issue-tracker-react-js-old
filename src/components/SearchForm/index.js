import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { InputFilter, Container } from './styles';

export default function SearchForm({ onSubmit, onChange, query }) {
  return (
    <Container onSubmit={onSubmit}>
      <FaSearch color="#d1d5da" size={15} />
      <InputFilter
        placeholder="Search all issues"
        value={query}
        onChange={onChange}
      />
    </Container>
  );
}
