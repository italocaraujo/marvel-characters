# <img src="https://cdn-icons-png.flaticon.com/512/11892/11892408.png" width="30px"> Marvel Characters Explorer 
**Marvel Characters Explorer** é um projeto desenvolvido com **Next.js** e **TypeScript**, que utiliza a **API oficial da Marvel** para permitir a exploração de personagens da Marvel. O projeto oferece uma interface interativa onde os usuários podem listar, buscar e visualizar informações detalhadas sobre diversos heróis e vilões do universo Marvel.

## 🚀 Funcionalidades

- **Listagem de Personagens**: Exibe uma lista de personagens da Marvel com sua imagem, nome e uma breve descrição.
- **Barra de Busca**: Permite filtrar personagens por nome de forma dinâmica.
- **Filtros de Ordenação**: Ordenação alfabética (A-Z, Z-A) para facilitar a navegação entre os personagens.
- **Filtragem por Descrição**: Exibe apenas personagens que possuem uma descrição.
- **Página de Detalhes**: Visualização detalhada de cada personagem, com informações adicionais, como histórias e quadrinhos.
- **Animação de Carregamento**: Mostra uma animação de carregamento enquanto os dados estão sendo buscados.
- **Interface Responsiva**: O layout é adaptável para diferentes dispositivos, como desktops, tablets e smartphones.
- **Rodapé**: Links para o GitHub, LinkedIn e portfólio pessoal do desenvolvedor.

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

- **Next.js**: Framework React para **SSR** (Server-Side Rendering) e **SSG** (Static Site Generation), garantindo uma excelente performance e SEO.
- **TypeScript**: Utilização de tipagem estática para garantir maior robustez e confiabilidade no código.
- **Styled-components**: Utilizado para estilização de componentes de forma modular e reutilizável.
- **Axios**: Cliente HTTP para realizar requisições para a API oficial da Marvel.
- **Marvel API**: API pública que fornece dados sobre os personagens, quadrinhos e histórias do universo Marvel.
- **React**: Biblioteca JavaScript para construção da interface interativa do projeto.

## 🏗️ Instalação e Execução Local

Para rodar este projeto em sua máquina localmente, siga os passos abaixo:

### Pré-requisitos

- **Node.js** (versão LTS recomendada)
- **npm** ou **yarn** como gerenciador de pacotes

### Passos para Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/italocaraujo/marvel-characters.git
   cd marvel-characters
## 🏗️ Instalação e Execução Local

### Pré-requisitos

- **Node.js** (versão LTS recomendada)
- **npm** ou **yarn** como gerenciador de pacotes

### Passos para Configuração

1. **Instale as dependências**:
    Se você estiver usando o `npm`:
        
        npm install
    Ou, se preferir usar o `yarn`:

        yarn install

2. **Crie um arquivo .env.local na raiz do projeto**: 
O projeto utiliza a API da Marvel, que exige uma chave de acesso. Você precisará configurar essa chave. Para isso, acesse o site da [Marvel Developers](https://developer.marvel.com/) e crie uma conta para obter a chave de acesso.

    No arquivo .env.local, adicione a seguinte variável de ambiente:

        NEXT_PUBLIC_MARVEL_API_KEY=Sua_Chave_API_Aqui

3. **Execute o servidor de desenvolvimento**: 
Após configurar o ambiente, rode o servidor de desenvolvimento:

    Com npm:

        npm run dev
    Com yarn:

        yarn dev
    **Acesse o aplicativo**: Abra o navegador e vá para http://localhost:3000 para visualizar o projeto rodando localmente.

## 🔗 Link do Deploy
O projeto está disponível online no seguinte link: [Marvel Characters Explorer - Deploy](https://marvel-characters-black.vercel.app)

## 🌐 Links Importantes
[GitHub](https://www.github.com/italocaraujo)
[LinkedIn](https://www.linkedin.com/in/italocaraujo)
[Portfólio](https://italocaraujo.vercel.app)

## ⚙️ Notas de Desenvolvimento
- **API Marvel**: A API da Marvel é limitada em número de requisições por minuto. Em caso de sobrecarga, espere alguns minutos antes de tentar novamente.

- **Melhorias Futuras**: Algumas funcionalidades, como filtros avançados ou integração com outras APIs, podem ser adicionadas em versões futuras.

Obrigado por conferir o **Marvel Characters Explorer**! Esperamos que este projeto ajude a explorar os personagens da Marvel de maneira divertida e interativa. 🚀