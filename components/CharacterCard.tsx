import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface CharacterCardProps {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

// Estilos do Card
const Card = styled.div`
  width: 250px; /* Largura fixa para todos os cards */
  height: 350px; /* Altura fixa para garantir uniformidade */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden; /* Para cortar conteúdos que ultrapassam o card */

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%; /* A imagem vai ocupar toda a largura */
    height: 250px; /* Definindo uma altura fixa para a imagem */
    object-fit: cover; /* Garantir que a imagem não deforme */
  }

  h3 {
    margin: 10px 0;
    font-size: 18px;
    color: #444;
    text-overflow: ellipsis; /* Prevenir que o nome ultrapasse o espaço */
    overflow: hidden;
    white-space: nowrap;
  }

  p {
    padding: 0 10px;
    font-size: 14px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis; /* Prevenir que a descrição ultrapasse o limite */
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limitar a descrição a 3 linhas */
    -webkit-box-orient: vertical;
  }
`;

const CharacterCard: React.FC<CharacterCardProps> = ({ id, name, description, thumbnail }) => {
  // Verificar se o thumbnail é válido, caso contrário usar a imagem padrão
  const validThumbnail = thumbnail.includes('image_not_available')
    ? '/assets/default-character.png' // Caminho da imagem padrão
    : `${thumbnail}/portrait_medium.jpg`; // Thumbnail válido

  return (
    <Link href={`/character/${id}`} passHref>
      <Card>
        <img
          src={validThumbnail}
          alt={name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/default-character.png'; // Substitui caso a imagem falhe
          }}
        />
        <h3>{name}</h3>
        <p>{description ? description : 'No description available.'}</p>
      </Card>
    </Link>
  );
};

export default CharacterCard;
