/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Mantém o modo estrito do React
  compiler: {
    styledComponents: true, // Habilita suporte ao styled-components
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora erros de ESLint durante o build
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Protocolo usado pela Marvel API (troque para 'https' se necessário)
        hostname: 'i.annihil.us', // Domínio das imagens
        pathname: '/u/prod/marvel/**', // Caminho para imagens do Marvel API
      },
    ],
  },
};

module.exports = nextConfig;
