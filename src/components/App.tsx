import React, { useState } from 'react';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';

const App: React.FC = () => {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <SearchBar onChange={setFilter} />
      <PokemonList filter={filter} />
    </div>
  );
};

export default App;
