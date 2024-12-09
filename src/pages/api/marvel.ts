import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import md5 from 'md5';

// Configurações da API Marvel
const MARVEL_API_BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY!;

// Interface para os parâmetros da requisição
interface MarvelApiRequestParams {
  [key: string]: string | number | undefined;
}

// Interface para a resposta da API Marvel
interface MarvelApiResponse<T> {
  data: {
    results: T;
  };
}

/**
 * Manipulador para todas as chamadas à API Marvel.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  const { endpoint, params }: { endpoint: string; params: MarvelApiRequestParams } = req.body;

  // Validação do endpoint
  if (!endpoint) {
    res.status(400).json({ error: 'Endpoint é obrigatório' });
    return;
  }

  try {
    // Gerar os parâmetros de autenticação
    const ts = new Date().getTime();
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

    console.log(`Chamada para Marvel API: endpoint=${endpoint}, params=`, params); // Log para depuração

    // Requisição para a API Marvel
    const response = await axios.get<MarvelApiResponse<unknown>>(
      `${MARVEL_API_BASE_URL}/${endpoint}`,
      {
        params: {
          ...params,
          ts,
          apikey: PUBLIC_KEY,
          hash,
        },
      }
    );

    // Retorno dos dados da API Marvel
    res.status(200).json(response.data.data.results);
  } catch (error) {
    // Tratamento de erros
    if (axios.isAxiosError(error)) {
      console.error(
        'Erro na API Marvel:',
        error.response?.data || error.message
      );
      res.status(500).json({
        error: error.response?.data?.message || 'Erro ao buscar dados da Marvel API',
      });
    } else {
      console.error('Erro desconhecido:', error);
      res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
}
