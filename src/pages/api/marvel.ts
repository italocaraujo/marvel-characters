import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import md5 from 'md5';

// Configurações da API Marvel
const MARVEL_API_BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { endpoint, params } = req.body;

  if (!endpoint) {
    return res.status(400).json({ error: 'Endpoint é obrigatório' });
  }

  try {
    const ts = new Date().getTime();
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

    const response = await axios.get(`${MARVEL_API_BASE_URL}/${endpoint}`, {
      params: {
        ...params,
        ts,
        apikey: PUBLIC_KEY,
        hash,
      },
    });

    res.status(200).json(response.data.data.results);
  } catch (error: any) {
    console.error('Erro na API Marvel:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da Marvel API' });
  }
}
