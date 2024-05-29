import React from 'react';

type Props = {
  onChange: (value: string) => void;
};

const SearchBar: React.FC<Props> = ({ onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokemons"
      className="border p-2 rounded w-full"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
