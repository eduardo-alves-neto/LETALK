# Letalk — Desafio Técnico

## Links

| Recurso            | URL                                 |
| ------------------ | ----------------------------------- |
| Frontend           | https://letalk-desafio.netlify.app/ |
| API                | https://letalk-13id.onrender.com/api/v1/health   |
| Endpoint principal | `GET /api/v1/cnpj/:cnpj`            |
| Healthcheck        | `GET /api/v1/health`                |

## Stack

**API** — Node.js + TypeScript, Express , Zod , Axios, Vitest.

**Web** — React 19 + Vite, TypeScript, TailwindCSS , shadcn/ui, React Hook Form + Zod, TanStack Query, Sonner.

**Compartilhado** — `cpf-cnpj-validator` para validação determinística de CNPJ no client e no server.

## Estrutura

```
LETALK/
├── api/
└── web/
```

## Como rodar localmente

### Pré-requisitos

- Node.js ≥ 20
- npm ≥ 10

### 1. Clonar

```bash
git clone <url-do-repo>
cd LETALK
```

### 2. Variáveis de ambiente

#### `api/.env`

```env
PORT=3333
CORS_ORIGINS=http://localhost:5173
```

| Variável                | Obrigatória | Default                                | Descrição                                        |
| ----------------------- | ----------- | -------------------------------------- | ------------------------------------------------ |
| `PORT`                  | não         | `3333`                                 | Porta HTTP da API                                |
| `CORS_ORIGINS`          | **sim**     | —                                      | Origens permitidas. Ex.: `http://localhost:5173` |
| `BRASIL_API_BASE_URL`   | não         | `https://brasilapi.com.br/api/cnpj/v1` | Base da BrasilAPI                                |
| `BRASIL_API_TIMEOUT_MS` | não         | `10000`                                | Timeout da chamada externa (ms)                  |

#### `web/.env`

```env
VITE_API_URL=http://localhost:3333/api/v1
```

| Variável       | Obrigatória | Descrição                                       |
| -------------- | ----------- | ----------------------------------------------- |
| `VITE_API_URL` | **sim**     | URL base da API (incluindo o prefixo `/api/v1`) |

Tem um `.env.example` em cada pasta com esses templates prontos.

### 3. Instalar e rodar (dois terminais)

**Terminal 1 — API:**

```bash
cd api
npm install
npm run dev
# API em http://localhost:3333
```

**Terminal 2 — Web:**

```bash
cd web
npm install
npm run dev
# Web em http://localhost:5173
```

## Uso de IA no desenvolvimento

Usei o Claude como apoio durante o desenvolvimento, principalmente como um par de programação para acelerar tarefas e revisar implementações.

Ele ajudou em:

- estrutura inicial do projeto (Express + Vite, organização de pastas, configs base);
- revisão de código, refactors e melhoria de legibilidade;
- resolução de bugs e investigação de erros;
- extração da identidade visual da Letalk (cores, tipografia e tema);
- escrita de utilitários, helpers e alguns testes;
- configurações padrão como ESLint, Prettier e ajustes de ambiente;
- apoio pontual em partes do backend e validações.

Antes de implementar as funcionalidades, eu organizava ideias e etapas em pequenos documentos Markdown para orientar o desenvolvimento. A IA foi utilizada como apoio durante esse processo, auxiliando principalmente na revisão e refinamento do código, enquanto as definições de arquitetura, regras de negócio e organização geral do projeto foram conduzidas por mim.

## Decisões de projeto

### Arquitetura e estrutura

A arquitetura foi pensada para manter a solução simples e objetiva, considerando o escopo do desafio e os requisitos propostos.

- **Monorepo simples, sem workspaces.** Optei por manter `api` e `web` em pastas separadas dentro do mesmo repositório. Como o projeto era relativamente pequeno e sem múltiplos pacotes compartilhados, ferramentas como Turbo ou workspaces acabariam adicionando mais complexidade do que benefício.
- **API como camada de tratamento da BrasilAPI.** Como o desafio não exigia persistência de dados, a API ficou responsável por validar o CNPJ, consumir a BrasilAPI e reorganizar os dados em um formato mais amigável para o frontend, agrupando informações relevantes como endereço, contato, atividades e sócios.
- **Express + TypeScript com `tsx`.** Escolhi uma stack mais enxuta para facilitar desenvolvimento rápido, leitura do código e menor configuração inicial.
- **React 19 + React Compiler**. Utilizei React 19 com React Compiler habilitado, evitando otimizações manuais prematuras com useCallback e useMemo, deixando os componentes mais simples e legíveis.

### Validação e contratos

- **Resposta padronizada da API.** Estruturei as respostas em formatos previsíveis (`data` e `error`) para simplificar o consumo no frontend e melhorar o tratamento de erros.
- **Validação no frontend e backend.** Utilizei Zod e `cpf-cnpj-validator` para garantir feedback imediato no formulário e manter consistência das validações também na API.
- **CORS configurado via variável de ambiente.** Mantive a configuração flexível utilizando allowlist através de env (`CORS_ORIGINS`).

### UI e experiência

- **shadcn/ui + Tailwind.** Componentes acessíveis (Radix) com tema próprio extraído da identidade visual da Letalk , quis que a interface parecesse familiar pra quem avalia.
- **React Query no client.** Cache automático da consulta, retry controlado e estados `loading/error`.
- **Single-page com transição de estados.** O formulário e o resultado convivem na mesma tela; depois de buscar, o form da lugar ao resultado que entra com fade-in.

### Sobre os dados

A BrasilAPI retorna uma quantidade grande de informações, então optei por destacar os dados que realmente ajudam na análise e qualificação de um lead B2B, organizando tudo em grupos mais fáceis de consumir visualmente.

| Card                           | Dados exibidos                                                                                                                               | Relevância                                                                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **01 · Identificação**         | Nome fantasia, razão social, CNPJ, data de abertura, idade da empresa, status cadastral, tipo de filial, MEI/Simples, capital social e porte | Ajuda a entender rapidamente o perfil e a maturidade da empresa                    |
| **02 · Lead**                  | Nome, email, telefone e cargo                                                                                                                | Informações preenchidas pelo próprio lead no formulário                            |
| **03 · Dados estratégicos**    | CNAE principal, segmento, natureza jurídica e regime tributário                                                                              | Permite identificar área de atuação e contexto da empresa                          |
| **04 · Contato & localização** | Telefones, email institucional e endereço completo                                                                                           | Facilita contato e análise geográfica/comercial                                    |
| **05 · Dados complementares**  | CNAEs secundários e quadro societário                                                                                                        | Complementa a análise mostrando outras atividades e possíveis tomadores de decisão |

#### Limitação conhecida

A BrasilAPI não fornece quantidade exata de funcionários. O dado de porte disponível é uma classificação regulatória baseada em faturamento, então preferi exibir essa informação como “Porte” em vez de “Faixa de funcionários”, evitando interpretações incorretas dos dados.

## Tempo gasto

Aproximadamente 2 dias de desenvolvimento (~16h), considerando desde a definição da estrutura do projeto até a entrega final. Esse tempo incluiu setup inicial, modelagem e tratamento dos dados da API, desenvolvimento da interface, organização dos cards/informações, validações, testes, refinamentos visuais e deploy da aplicação.


## Se tivesse mais tempo

1. **Exportação em PDF do lead enriquecido** — gerar um relatório mais corporativo para compartilhamento interno ou anexos em CRM. 
2. **Persistência e histórico de consultas** — adicionar banco de dados  para salvar buscas realizadas, permitindo histórico, filtros e identificação de leads já analisados.
3. **Rate limiting e melhorias de segurança** — adicionar proteção contra excesso de requisições e possíveis abusos no endpoint público.
4. **Sugestões comerciais com IA** — gerar insights ou sugestões de abordagem comercial com base no perfil da empresa consultada.
5. **Testes E2E** — cobrir fluxos completos da aplicação, incluindo cenários de erro e comportamento da interface.



## Licença

Projeto desenvolvido exclusivamente para fins de avaliação técnica no processo seletivo da Letalk.

