import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head'; 
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import Loader from '@components/Loader';

const CharacterDetail = () => {
  const { query } = useRouter();
  const { id } = query; // Captura o id da URL
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCharacterDetails = async () => {
        try {
          const response = await fetch(`/api/marvel`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              endpoint: `characters/${id}`,
              params: {},
            }),
          });

          if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
          }

          const data = await response.json();
          setCharacter(data[0]);
        } catch (error: any) {
          console.error('Erro ao buscar detalhes do personagem:', error);
          setError('Não foi possível carregar os dados do personagem.');
        } finally {
          setLoading(false);
        }
      };

      fetchCharacterDetails();
    }
  }, [id]);

  if (loading) return <div><Loader/ ></div>;
  if (error) return <div>{error}</div>;

  return (
    
    
    <div>
        <Head>
            <title>{loading ? 'Carregando...' : `${character.name} | Marvel Characters API`}</title>
            <meta name="description" content={`Página de detalhes do personagem ${character}`} />
            <link rel="icon" href="/marvel-favicon.png" />
        </Head>
      <Header />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        <h1>{character.name}</h1>
        <img style={{
            borderRadius: '20px',
            maxWidth: '80%',
        }}
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <p style={{
            marginTop: '30px',
            padding: '0 15% 0 15%',
        }}>{character.description || 'No description available.'}</p>
        
        {/* Botão para voltar à página principal */}
        <Link href="/" passHref>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#e62429',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'

          }}>
            <svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.213 476.213">
                <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5  57.427,253.107 476.213,253.107 "/>
            </svg>
            Voltar para a página inicial
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default CharacterDetail;