import axios from 'axios';

const CACHE_DURATION = 3600 * 1000; // 1 hour in milliseconds

type Pokemon = {
  name: string;
  url: string;
};

type PokemonDetail = {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
};

const cache: { [key: string]: { data: any, expiry: number } } = {};

export const fetchPokemons = async (): Promise<Pokemon[]> => {
  const cacheKey = 'pokemonList';
  const cached = cache[cacheKey];
  const now = new Date().getTime();

  if (cached && cached.expiry > now) {
    return cached.data;
  }

  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  const pokemons = response.data.results;
  cache[cacheKey] = { data: pokemons, expiry: now + CACHE_DURATION };
  return pokemons;
};

export const fetchPokemonDetail = async (url: string): Promise<PokemonDetail> => {
  const cacheKey = url;
  const cached = cache[cacheKey];
  const now = new Date().getTime();

  if (cached && cached.expiry > now) {
    return cached.data;
  }

  const response = await axios.get(url);
  const pokemonDetail = response.data;
  cache[cacheKey] = { data: pokemonDetail, expiry: now + CACHE_DURATION };
  return pokemonDetail;
};
