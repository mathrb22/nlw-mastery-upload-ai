<div align="center">
   <h1>upload.ai</h1>
</div>
<div align="center">
   <a href="https://github.com/mathrb22">
      <img alt="Made by mathrb22" src="https://img.shields.io/badge/made%20by-mathrb22-yellow">
   </a>
   <a href="https://github.com/mathrb22/nlw-mastery-upload-ai/commits/main">
      <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/mathrb22/nlw-mastery-upload-ai">
   </a>
   <a href="https://github.com/mathrb22/nlw-mastery-upload-ai/issues">
      <img alt="GitHub Issues" src="https://img.shields.io/github/issues/mathrb22/nlw-mastery-upload-ai">
   </a>
   <a href="https://github.com/mathrb22/nlw-mastery-upload-ai/pulls">
      <img alt="Pull Requests Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
   </a>
   <a href="https://github.com/mathrb22/nlw-mastery-upload-ai/blob/main/LICENSE.md">
      <img alt="GitHub License" src="https://img.shields.io/github/license/mathrb22/nlw-mastery-upload-ai">
   </a>
</div>

</br>
<div align="center">

[**Sobre**](#-sobre) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Objetivo**](#-objetivo) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Features**](#-features) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Tecnologias e ferramentas**](#-tecnologias-e-ferramentas) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Organização do projeto**](#-organização-do-projeto) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Instalação e execução**](#-instalação-e-execução) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Como contribuir**](#-como-contribuir) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Licença**](#-licença)

</div>

## 📃 Sobre

<img alt="Screenshot of the user interface for the upload.ai web application" src=".github/assets/upload.ai.png" width="100%"/>

**Upload.ai** é o projeto desenvolvido durante a trilha Mastery da **Next Level Week IA**, um evento online produzido pela [**Rocketseat**](https://github.com/Rocketseat).

Trata-se de uma aplicação que possibilita realizar upload de videos e por meio de IA, criar automaticamente títulos chamativos e descrições com um boa indexação.

## 🎯 Objetivo

O objetivo central do **Upload.ai** é criar uma plataforma que permita aos usuários realizar o upload de vídeos e, por meio de **IA** (Inteligência Artificial), gerar automaticamente títulos chamativos e descrições otimizadas para esses vídeos. Esta aplicação visa simplificar o processo de criação de conteúdo de vídeo e melhorar a visibilidade dos vídeos na web.

O projeto **Upload.ai** possui muitas aplicações práticas. Ele poderá ajudar criadores de conteúdo, profissionais de marketing, educadores online e empresas de mídia a melhorar a visibilidade e o desempenho de vídeos online, economizando tempo na criação de títulos e descrições atraentes e otimizadas para mecanismos de busca.

## ✨ Features

- [x] Upload de vídeos
- [x] Transcrição de áudio utilizando o [**Whisper (ASR - Automatic Speech Recognition)**](https://openai.com/research/whisper) da OpenAI.
- [x] Geração de resumo da transcrição utilizando o modelo GPT-3 da OpenAI.
- [ ] Geração de títulos chamativos utilizando o modelo GPT-3 da OpenAI.
- [ ] Geração de descrições otimizadas para SEO utilizando o modelo GPT-3 da OpenAI.

## 🚀 Tecnologias e ferramentas

<table>
  <tbody>
    <tr>
      <td style="font-weight: bold">Front-end (web)</td>
      <td>
        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>,
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript</a>,
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>,
        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">TailwindCSS</a>,
        <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">Vite.js</a>,
        <a href="https://radix-ui.com/" target="_blank" rel="noopener noreferrer">Radix UI</a>
      </td>
    </tr>
    <tr>
      <td style="font-weight: bold">Back-end (API)</td>
      <td>
        <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">Node.js</a>,
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript</a>,
        <a href="https://www.prisma.io/" target="_blank" rel="noopener noreferrer">Prisma</a>,
        <a href="https://www.fastify.io/" target="_blank" rel="noopener noreferrer">Fastify</a>,
        <a href="https://zod.dev/" target="_blank" rel="noopener noreferrer">Zod</a>,
        <a href="https://www.sqlite.org/index.html" target="_blank" rel="noopener noreferrer">SQLite</a>
      </td>
    </tr>
  </tbody>
</table>

## 📂 Organização do projeto

Este repositório é dividido em dois principais diretórios:

- **api**: Contém o código-fonte do back-end.
- **web**: Contém o código-fonte do front-end.

## 🔧 Instalação e execução

Para baixar o código-fonte do projeto em sua máquina, primeiramente terá que ter instalado o [**Git**](https://git-scm.com/).
Com o Git instalado, em seu terminal execute o seguinte comando:

```bash
git clone https://github.com/mathrb22/nlw-mastery-upload-ai.git
```

Para instalar as dependências e executar o projeto terá que ter instalado em sua máquina o [**node.js**](https://nodejs.org/en/), que vem acompanhado do npm.

> Nesse projeto foi utilizado o [**pnpm**](https://pnpm.io/), que busca economizar espaço em disco e acelerar a instalação de pacotes devido à sua abordagem de armazenamento de dependências compartilhado.

### Front-end (Web)

Acesse a pasta do projeto:

```bash
cd nlw-mastery-upload-ai/upload-ai-web
```

Instale as dependências usando **pnpm** ou **npm**:

```bash
# pnpm
pnpm install

# npm
npm install
```

Executar o projeto:

```bash
# pnpm
pnpm run dev

# npm
npm run dev
```

A aplicação estará disponível em http://localhost:5173. Você poderá acessá-la a partir do seu navegador.

### Back-end (API)

Acesse a pasta do projeto:

```bash
cd nlw-mastery-upload-ai/upload-ai-api
```

Instale as dependências usando **pnpm** ou **npm**:

```bash
# pnpm
pnpm install

# npm
npm install
```

Crie o arquivo .env com as variáveis de ambiente necessárias:

```bash
DATABASE_URL="file:./dev.db"
OPENAI_KEY="sua OpenAI key"
```

Execute as migrations do banco de dados:

```bash
# pnpm
pnpm prisma migrate dev

# npm
npm prisma migrate dev
```

Execute o projeto:

```bash
# pnpm
pnpm run dev

# npm
npm run dev
```

O servidor estará disponível em http://localhost:3333.

## 💡 Como contribuir

- Faça um **_fork_** desse repositório;
- Crie um **branch** para a sua feature: `git checkout -b minha-feature`;
- Faça um **commit** com suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça um **push** para o seu branch: `git push origin minha-feature`;
- Faça um **pull request** com sua feature;

Pull requests são sempre bem-vindos. Em caso de dúvidas ou sugestões, crie uma _**issue**_ ou entre em contato comigo.

## 📝 Licença

<a href="https://github.com/mathrb22/nlw-mastery-upload-ai/blob/main/LICENSE.md">
    <img alt="GitHub License" src="https://img.shields.io/github/license/mathrb22/nlw-mastery-upload-ai">
</a>

Esse projeto está sob a licença **MIT**. Veja o arquivo _**LICENSE**_ para mais detalhes.

---

Desenvolvido com 💚 por <a href="https://github.com/mathrb22/">mathrb22</a>

<div style="display: flex;">
  <a href="https://www.linkedin.com/in/madalena-machado-rocha/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" style="margin-right: 2vw" target="_blank"></a>
  <a href="mailto:math.ribeiro.dev@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail" style="margin-right: 2vw"/></a>
</div>
