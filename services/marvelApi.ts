import axios, { AxiosError } from 'axios';
import md5 from 'md5';

// Configurações da API Marvel
const BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY || '22164f5cbae9ea5a0c8741c4ffa53ea4';
const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY || '29f0f8634be0b126e06046f645d9475af7cffed2';

// Instância Axios configurada
const marvelApi = axios.create({
  baseURL: BASE_URL,
});

/**
 * Gera os parâmetros de autenticação exigidos pela Marvel API.
 * @returns {Object} Parâmetros de autenticação (ts, apikey, hash)
 */
const generateAuthParams = (): Record<string, string> => {
  const ts = new Date().getTime().toString();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
  return { ts, apikey: PUBLIC_KEY, hash };
};

/**
 * Função genérica para acessar a rota protegida `/api/marvel`.
 * @param {string} endpoint - Endpoint da API da Marvel (ex.: 'characters').
 * @param {Object} params - Parâmetros para a consulta.
 * @returns {Promise<any>} Dados da API.
 */
export const fetchFromMarvelApi = async (endpoint: string, params: Record<string, any> = {}) => {
  try {
    const authParams = generateAuthParams();
    const response = await marvelApi.get(`/${endpoint}`, {
      params: { ...authParams, ...params },
    });
    return response.data.data.results;
  } catch (error: any) {
    handleApiError(error, `Erro ao acessar a Marvel API: ${endpoint}`);
    return null; // Retorna null em caso de erro
  }
};

/**
 * Busca a lista de personagens.
 * @param {number} limit - Número de personagens a retornar.
 * @param {number} offset - Posição inicial para paginação.
 * @param {string} nameStartsWith - Prefixo do nome (opcional).
 * @returns {Promise<Array>} Lista de personagens.
 */
export const getCharacters = async (limit = 10, offset = 0, nameStartsWith = ''): Promise<any[]> => {
  const params = {
    limit,
    offset,
    ...(nameStartsWith && { nameStartsWith }),
  };
  return await fetchFromMarvelApi('characters', params);
};

/**
 * Busca os detalhes de um personagem específico.
 * @param {string} id - ID do personagem.
 * @returns {Promise<Object>} Detalhes do personagem.
 */
export const getCharacterDetails = async (id: string): Promise<any> => {
  return await fetchFromMarvelApi(`characters/${id}`);
};

/**
 * Trata erros provenientes da Marvel API.
 * @param {unknown} error - Erro capturado.
 * @param {string} message - Mensagem de erro personalizada.
 * @throws {Error} Lança um erro detalhado com informações da API.
 */
const handleApiError = (error: unknown, message: string): void => {
  if (axios.isAxiosError(error)) {
    console.error(message, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message);
  } else {
    console.error('Erro desconhecido:', error);
    throw new Error('Erro desconhecido');
  }
};
