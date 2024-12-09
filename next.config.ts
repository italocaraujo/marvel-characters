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
        protocol: 'http',
        hostname: 'i.annihil.us', // Permite imagens do domínio da API Marvel
        pathname: '/u/prod/marvel/**', // Permite todos os caminhos sob o diretório /u/prod/marvel/
      },
    ],
  },
};

module.exports = nextConfig;
