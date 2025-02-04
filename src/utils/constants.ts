export const MAX_REQUEST_TIMEOUT = 2 * 60 * 1000;
export const DEBUG = process.env.NODE_ENV === "development";
export const databaseErrorResponse = (message: string) => ({
  status: false,
  message: message ?? "Database connection failed",
});

export const paths = {
  PI: {
    position: "label:contains('Num.').next()",
    description: "label:contains('Descrição').next()",
    barcode: "label:contains('Código EAN Comercial').next()",
    unity: "label:contains('Unidade Tributável').next()", // ou contains('Unidade Comercial')
    quantity: "label:contains('Quantidade Tributável').next()", // or contains('Qtd.')
    discount: "label:contains('Valor do Desconto').next()",
    price: "label:contains('Valor unitário de comercialização').next()", // or contains('Valor(R$)')
    total: "$total", // or 
  },
  PE: {
    position: ["infNFe det", "attr('nItem')"],
    description: "prod xProd",
    barcode: "prod cEAN",
    unity: "prod uCom",
    quantity: "prod qCom", 
    discount: "prod vDesc",
    price: "prod vUnCom",
    total: "prod vProd", // or prod vProd
  },
};
