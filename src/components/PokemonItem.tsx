import React, { useEffect, useState } from 'react';
import { fetchPokemonDetail } from '../services/pokeapi';

type PokemonItemProps = {
  url: string;
};

const PokemonItem: React.FC<PokemonItemProps> = ({ url }) => {
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchPokemonDetail(url);
      setPokemon(data);
    };
    loadPokemon();
  }, [url]);

  if (!pokemon) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-bold text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center  bg-white  rounded-lg shadow-lg">
      <div className="w-full flex items-center justify-center mb-4">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32"
        />
      </div>
      <div className="text-center w-full bg-yellow-400 rounded-lg ">
        <h2 className="text-xl font-bold capitalize text-gray-800">
          {pokemon.name}
        </h2>
        <p className="text-gray-600 capitalize">
          Type: {pokemon.types.map((type: any) => type.type.name).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default PokemonItem;