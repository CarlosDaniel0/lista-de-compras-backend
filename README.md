<div style="display: flex; gap: 8px">
<img src="https://img.shields.io/badge/node.js-%23339933.svg?&style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/express-%23000000.svg?&style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/postgresql-%23336791.svg?&style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/prisma-%232D3748.svg?&style=for-the-badge&logo=prisma&logoColor=white" />
<img src="https://img.shields.io/badge/typescript-%233178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" />
</div>

# API Lista de Compras

API utilizada pelo site de [Lista de Compras](https://github.com/CarlosDaniel0/lista-de-compras-frontend)

## Bibliotecas

- [x] [Express](https://expressjs.com/pt-br/)
- [x] [PostgreSQL](https://www.postgresql.org/)
- [x] [Prisma](https://www.prisma.io/)
- [x] [Typescript](https://www.typescriptlang.org/)

## Início Rápido

1 - Altere o arquivo .env.example para .env e substitua a `<database-url-connection>` por sua conexão com o
banco de dados [PostgreSQL](https://www.postgresql.org/)

2 - Também no arquivo .env substitua o `<brazillian-proxy>` por um proxy brasileiro para permitir requisições
em um servidor de produção (Vercel, por exemplo). 
Link que utilizei para buscar Proxies gratúitos no Brasil: [Proxy Scrape](https://pt-br.proxyscrape.com/lista-de-procuradores-gratuitos)

> Essa configuração não é obrigatória no ambiente de desenvolvimento e pode ser removida alterando o arquivo `src\routes\reciept\tools.ts`:

```diff
const getProductsFromQRCode = async (text: string) => {
  // TODO: realizar troca do proxy de forma automática posteriormente (comutador)
  // Site com proxies gratuitos -> https://pt-br.proxyscrape.com/lista-de-procuradores-gratuitos
- const proxy = process.env.PROXY ?? ''
- const httpsAgent = new HttpsProxyAgent(proxy);
- const $ = axios.create({ httpsAgent });
  const uf = extractUF(text);
  const [url, chave] = parseURL(text, uf);
- const res = await $.get(url);
+ const res = await axios.get(url);
  const products = extractProducts(res.data, uf);
  return [products, chave] as [ProductRecieptImport[], string];
};
```

### Recomendações de Bancos Relacionais

- [Aiven](https://aiven.io/)
- [Koyeb](https://www.koyeb.com/)

:paperclip: Pode utilizar um banco local ou algum que está disponível online

> Caso não queira utilizar o PostegreSQL faça a alteção em src/database/prisma.ts para o banco de sua preferência

2 - Faça a instalação das dependências

```bash
# Instalar as dependências4
yarn
```

3 - Rode o comando para criar as tabelas no banco
```bash
# Criar migration com todas 
npx prisma migrate dev --name init
```

4 - Rode o Projeto
```bash
# Rodar o projeto
yarn dev
```
