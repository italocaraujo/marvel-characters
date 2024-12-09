import React, { useState, useEffect } from 'react';
import { getCharacters } from '@services/marvelApi';
import CharacterCard from '@components/CharacterCard';
import styled, { keyframes } from 'styled-components';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';

// Interface para os dados dos personagens
interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

// Estilos para a animação do Loader
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e62429;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  input {
    width: 300px;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 8px 0 0 8px;
    outline: none;
    font-size: 16px;

    &:focus {
      border-color: #e62429;
      box-shadow: 0 0 5px rgba(230, 36, 41, 0.5);
    }
  }

  button {
    padding: 10px 20px;
    background-color: #e62429;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #b71c1c;
    }
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  button {
    padding: 10px 15px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &.active {
      background-color: #e62429;
      color: white;
    }

    &:hover {
      background-color: #ddd;
    }
  }
`;

const CharacterCardWrapper = styled.div`
  width: 250px; /* Largura fixa para todos os cards */
  height: 400px; /* Altura fixa para todos os cards */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Para cortar qualquer conteúdo que ultrapasse a altura do card */
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px); /* Leve elevação ao passar o mouse */
  }

  .thumbnail {
    width: 100%;
    height: 200px; /* Altura fixa para a imagem */
    object-fit: cover;
  }

  .info {
    padding: 10px;
    flex-grow: 1; /* Isso vai fazer com que a descrição ocupe o espaço restante no card */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }

  .description {
    font-size: 0.9em;
    color: #666;
    text-align: center;
    flex-grow: 1;
  }
`;



// Estilo do grid para os cards de personagens
const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  padding: 20px 20%;
  width: 100%;
  justify-items: center;
  align-items: center;

  @media (min-width: 2560px) {
    grid-template-columns: repeat(5, 1fr); /* 3 colunas em telas médias */
  }

  @media (max-width: 1440px) {
    grid-template-columns: repeat(4, 1fr); /* 3 colunas em telas médias */
    padding: 20px 9%;
    margin: 0 auto;
    justify-items: center;
    align-items: center;
  }

  @media (max-width: 1440px) {
    grid-template-columns: repeat(4, 1fr); /* 3 colunas em telas médias */
    padding: 20px 6%;
    margin: 0 auto;
    justify-items: center;
    align-items: center;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); /* 3 colunas em telas médias */
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr); /* 2 colunas em telas pequenas */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 1 coluna em telas muito pequenas */
  }
`;

const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterWithDescription, setFilterWithDescription] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const data = await getCharacters(100); // Busca inicial de 100 personagens
        setCharacters(data);
        setFilteredCharacters(data);
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) {
      setFilteredCharacters(characters);
      return;
    }

    setLoading(true);
    try {
      const data = await getCharacters(100, 0, searchTerm);
      setFilteredCharacters(data);
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (order: 'asc' | 'desc') => {
    const sorted = [...filteredCharacters].sort((a, b) => {
      if (a.name < b.name) return order === 'asc' ? -1 : 1;
      if (a.name > b.name) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredCharacters(sorted);
    setSortOrder(order);
  };

  const toggleDescriptionFilter = () => {
    if (!filterWithDescription) {
      const filtered = characters.filter((char) => char.description);
      setFilteredCharacters(filtered);
    } else {
      setFilteredCharacters(characters);
    }
    setFilterWithDescription(!filterWithDescription);
  };

  return (
    <div>
      <Head>
        <title>Marvel Character API</title>
        <link rel="icon" href="/marvel-favicon.png" />
      </Head>
      <Header />

      {/* Barra de pesquisa */}
      <SearchContainer>
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </SearchContainer>

      {/* Filtros */}
      <FiltersContainer>
        <button
          className={sortOrder === 'asc' ? 'active' : ''}
          onClick={() => handleSort('asc')}
        >
          A-Z
        </button>
        <button
          className={sortOrder === 'desc' ? 'active' : ''}
          onClick={() => handleSort('desc')}
        >
          Z-A
        </button>
        <button
          className={filterWithDescription ? 'active' : ''}
          onClick={toggleDescriptionFilter}
        >
          Com descrição
        </button>
      </FiltersContainer>

      {/* Loader */}
      {loading && <Loader />}

      {/* Grid de Cards */}
      <CharacterGrid>
        {filteredCharacters.map((character) => (
          <Link href={`/character/${character.id}`} key={character.id}>
            <CharacterCard
              name={character.name}
              description={character.description}
              thumbnail={character.thumbnail.path}
              id={character.id}
            />
          </Link>
        ))}
      </CharacterGrid>

      <Footer />
    </div>
  );
};

export default HomePage;
