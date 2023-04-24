# sales-front
Front-end em React da aplicação de teste da SoftExpert.

## Visão geral

O projeto se trata de uma aplicação para registrar vendas de um mercado. Temos cadastro de tipos de produtos, produtos e venda. Este módulo é um front-end desenvolvido com React, que consome a API PHP sales-api. 


## Configuração do ambiente

### Requisitos
Para executar esta aplicação é necessário ter instalado:
* Node.js

É necessário a API estar executando no endereço e porta especificados no arquivo:
```
src/constants/api.js
```

### Instalação

Com o Node.js instalado, precisamos instalar as dependências, basta rodar o seguinte comando na raiz do projeto:

```
npm install
```

### Executando o projeto

Em ambiente de desenvolvimento, podemos iniciar a aplicação pelo comando:
```
npm start
```

Para ambiente de produção, é necessário fazermos o build da aplicação: 

```
npm run build
```

Para executarmos a aplicação construída, podemos utilizar o pacote `serve`, o seguinte comando instala globalmente:

```
npm install -g serve
```

Feito isso, basta executar o comando para subir o servidor:
```
serve -s [build_path]
```

### Sobre a aplicação

Atualmente existem três módulos:

* Tipos de produtos: onde são cadastrados os tipos de produtos e seus respectivos percentuais de impostos.
* Produtos: onde são cadastrados os produtos, vinculando o tipo de produto.
* Vendas: onde são realizadas as vendas, vinculamos o produto e informamos a quantidade vendida, de forma a calcular os totais de venda e impostos pagos.

# Considerações finais
Esta aplicação foi desenvolvida como parte de um projeto de mercado e pode ser usada como base para outras aplicações similares. Se tiver alguma dúvida ou sugestão, por favor, não hesite em entrar em contato conosco.