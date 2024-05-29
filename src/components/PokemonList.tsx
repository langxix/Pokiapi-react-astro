import React, { useEffect, useState } from 'react';
import { fetchPokemons, fetchPokemonDetail } from '../services/pokeapi';
import PokemonItem from './PokemonItem';

type Pokemon = {
  name: string;
  url: string;
};

const PokemonList: React.FC<{ filter: string }> = ({ filter }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemons();
      setPokemons(data);
      setFilteredPokemons(data);
    };
    loadPokemons();
  }, []);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [filter, pokemons]);

  return (
    <>
    <div>
      <h2 className='flex justify-center text-yellow-400 font-bold mt-5 text-[24px]'> Here you can find the name and type of pokimon with their image. </h2>
    </div>
        <div className='grid gap-5 grid-cols-5 grid-rows-3 m-10'>
      
      {filteredPokemons.map(pokemon => (
        <PokemonItem key={pokemon.name} url={pokemon.url} />
      ))}
    </div>
    </>
    

  );
};

export default PokemonList;
