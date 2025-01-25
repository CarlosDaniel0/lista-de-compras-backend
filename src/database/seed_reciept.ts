import { PrismaClient } from "@prisma/client";
import adapter from "./prisma";
import { ProductSupermarket } from "../entities/ProductSupermarket";

const products_1 = [
  {
    position: 1,
    barcode: "02900004361337",
    description: "V COENTRO MATEUS A UN ",
    quantity: 6,
    unity: "UN",
    value: 1.59,
    total: 9.54,
  },
  {
    position: 2,
    barcode: "02900004362518",
    description: "V CEBOLINHA MATEUS A UN",
    quantity: 7,
    unity: "UN",
    value: 1.59,
    total: 11.13,
  },
  {
    position: 3,
    barcode: "07898700023084",
    description: "F MORANGO BDJ 250G ",
    quantity: 1,
    unity: "UN",
    value: 8,
    total: 8,
  },
  {
    position: 4,
    barcode: "02900000060692",
    description: "F MORGOTH KG",
    quantity: 0.91,
    unity: "KG",
    value: 6.99,
    total: 6.36,
  },
  {
    position: 5,
    barcode: "02900000087811",
    description: "F ABACATE KG",
    quantity: 0.665,
    unity: "KG",
    value: 10.99,
    discount: 1.66,
    total: 7.31,
  },
  {
    position: 6,
    barcode: "07898957749034",
    description: "F UVA VITORIA SS CUMBUCA 500G",
    quantity: 1,
    unity: "UN",
    value: 10.99,
    total: 10.99,
  },
  {
    position: 7,
    barcode: "02900004361511",
    description: "V ALFACE AMERICANO MATEUS A UN",
    quantity: 1,
    unity: "UN",
    value: 3.49,
    total: 3.49,
  },
  {
    position: 8,
    barcode: "02900000067134",
    description: "V CENOURA KG",
    quantity: 0.835,
    unity: "KG",
    value: 3.99,
    total: 3.33,
  },
  {
    position: 9,
    barcode: "02900000014060",
    description: "V BATATINHA LAV KG",
    quantity: 1.745,
    unity: "KG",
    value: 7.99,
    discount: 1.74,
    total: 13.94,
  },
  {
    position: 10,
    barcode: "02900000050433",
    description: "F BANANA NANICA KG",
    quantity: 2.21,
    unity: "KG",
    value: 6.29,
    total: 13.9,
  },
  {
    position: 11,
    barcode: "02900000087231",
    description: "V ALHO KG",
    quantity: 0.405,
    unity: "KG",
    value: 30.89,
    total: 12.51,
  },
  {
    position: 12,
    barcode: "02900000064195",
    description: "V REPOLHO LISO KG",
    quantity: 1.325,
    unity: "KG",
    value: 3.99,
    total: 5.29,
  },
  {
    position: 13,
    barcode: "02900000060753",
    description: "F MAMAO PAPAIA KG",
    quantity: 1.005,
    unity: "KG",
    value: 9.99,
    total: 10.04,
  },
  {
    position: 14,
    barcode: "02300000087545",
    description: "F MELAO AMARELO KG",
    quantity: 3.19,
    unity: "KG",
    value: 4.29,
    total: 13.69,
  },
  {
    position: 15,
    barcode: "02900000079731",
    description: "V CHUCHU KG",
    quantity: 0.67,
    unity: "KG",
    value: 3.79,
    total: 2.54,
  },
  {
    position: 16,
    barcode: "02900000016323",
    description: "F BANANA PRATA KG",
    quantity: 1.91,
    unity: "KG",
    value: 7.09,
    total: 13.54,
  },
  {
    position: 17,
    barcode: "02900000060524",
    description: "F MARACUJA KG",
    quantity: 2.48,
    unity: "KG",
    value: 8.99,
    total: 22.3,
  },
  {
    position: 18,
    barcode: "02900000038721",
    description: "V CEBOLA COMUM KG",
    quantity: 1.85,
    unity: "KG",
    value: 3.99,
    discount: 0.92,
    total: 7.38,
  },
  {
    position: 19,
    barcode: "02900004361825",
    description: "V PIMENTA DE CHEIRO MATEUS A KG",
    quantity: 0.15,
    unity: "KG",
    value: 10.99,
    total: 1.65,
  },
  {
    position: 20,
    barcode: "02900000019478",
    description: "V BETERRABA KG",
    quantity: 0.22,
    unity: "KG",
    value: 5.89,
    total: 1.3,
  },
  {
    position: 21,
    barcode: "02900000016071",
    description: "F KIWI IMPORTADO KG",
    quantity: 0.44,
    unity: "KG",
    value: 27.99,
    total: 12.32,
  },
  {
    position: 22,
    barcode: "02900000808164",
    description: "V TOMATE SALADETE KG",
    quantity: 1.7,
    unity: "KG",
    value: 3.49,
    total: 5.93,
  },
  {
    position: 23,
    barcode: "02900000041196",
    description: "V PIMENTAO KG",
    quantity: 0.38,
    unity: "KG",
    value: 5.99,
    discount: 0.36,
    total: 2.28,
  },
  {
    position: 24,
    barcode: "02900000087514",
    description: "V PEPINO KG",
    quantity: 0.765,
    unity: "KG",
    value: 3.89,
    total: 2.98,
  },
  {
    position: 25,
    barcode: "02900000064201",
    description: "F ABACAXI UN",
    quantity: 2,
    unity: "UN",
    value: 6.99,
    total: 13.98,
  },
  {
    position: 26,
    barcode: "02900004361856",
    description: "V QUIABO MATEUS A KG",
    quantity: 0.4,
    unity: "KG",
    value: 22.99,
    total: 9.2,
  },
  {
    position: 27,
    barcode: "02900000053045",
    description: "V BATATA DOCE KG ",
    quantity: 1.075,
    unity: "KG",
    value: 4.29,
    total: 4.61,
  },
  {
    position: 28,
    barcode: "07894904271719",
    description: "MARGARINA PRIMOR 1KG ",
    quantity: 1,
    unity: "UN",
    value: 11.89,
    total: 11.89,
  },
  {
    position: 29,
    barcode: "07898043915039",
    description: "SORV FROSTY LEITINHO C ACAI 1.5L",
    quantity: 1,
    unity: "UN",
    value: 25.99,
    total: 25.99,
  },
  {
    position: 30,
    barcode: "07898034920325",
    description: "IOG ISIS SALADA DE FRUTAS 8L 900G",
    quantity: 1,
    unity: "UN",
    value: 6.19,
    total: 6.19,
  },
  {
    position: 31,
    barcode: "07898403781014",
    description: "BEBIDA LACT BETANIA AMEIXA 900G",
    quantity: 1,
    unity: "UN",
    value: 6.19,
    total: 6.19,
  },
  {
    position: 32,
    barcode: "07898968620711",
    description: "GALINHA INTEIRA CONG KERO FRANGO KG",
    quantity: 2.975,
    unity: "KG",
    value: 5.99,
    total: 17.82,
  },
  {
    position: 33,
    barcode: "02900002822595",
    description: "COXA DE FGO RESF INTERF KG",
    quantity: 2,
    unity: "KG",
    value: 12.49,
    total: 24.98,
  },
  {
    position: 34,
    barcode: "02900005266778",
    description: "LING CHUR MIRANDA CARNE SUINA KG",
    quantity: 0.598,
    unity: "KG",
    value: 17.9,
    total: 10.7,
  },
  {
    position: 35,
    barcode: "02900002212518",
    description: "QUEIJO MUSS PRO GIROLANDA KG",
    quantity: 0.376,
    unity: "KG",
    value: 49.9,
    total: 18.76,
  },
  {
    position: 36,
    barcode: "02900001970389",
    description: "PRES PRO FRIKESA SCAPA DE GORD KG",
    quantity: 0.33,
    unity: "KG",
    value: 21.9,
    total: 7.23,
  },
  {
    position: 37,
    barcode: "02900003174952",
    description: "LING CALAB FRIMESA M KG",
    quantity: 0.647,
    unity: "KG",
    value: 23.99,
    total: 15.52,
  },
  {
    position: 38,
    barcode: "02900000099593",
    description: "BISTECA BOVINA KG",
    quantity: 2.132,
    unity: "KG",
    value: 31.9,
    total: 68.01,
  },
  {
    position: 39,
    barcode: "02900000089082",
    description: "PALETA SUINA KG",
    quantity: 2.268,
    unity: "KG",
    value: 21.9,
    total: 49.67,
  },
  {
    position: 40,
    barcode: "02900000090903",
    description: "COSTELA P A BOVINA KG",
    quantity: 1.134,
    unity: "KG",
    value: 17.9,
    total: 20.3,
  },
  {
    position: 41,
    barcode: "02900000915374",
    description: "PATINHO BOV PED KG",
    quantity: 2.774,
    unity: "KG",
    value: 35.9,
    total: 99.59,
  },
  {
    position: 42,
    barcode: "07891150060296",
    description: "SAB LUX SUAVE ROSAS FRANCESAS 125G",
    quantity: 1,
    unity: "UN",
    value: 3.19,
    total: 3.19,
  },
  {
    position: 43,
    barcode: "07891150059917",
    description: "SAB LUX SUAVE LIRIO AZUL 85G",
    quantity: 4,
    unity: "UN",
    value: 1.99,
    total: 7.96,
  },
  {
    position: 44,
    barcode: "07891150060296",
    description: "SAB LUX SUAVE ROSAS FRANCESAS 125G ",
    quantity: 1,
    unity: "UN",
    value: 3.19,
    total: 3.19,
  },
  {
    position: 45,
    barcode: "07891150059856",
    description: "SAB LUX SUAVE FLOR VERBENA 85G",
    quantity: 1,
    unity: "UN",
    value: 1.99,
    total: 1.99,
  },
  {
    position: 46,
    barcode: "07891150059917",
    description: "SAB LUX SUAVE LIRIO AZUL 85G",
    quantity: 1,
    unity: "UN",
    value: 1.99,
    total: 1.99,
  },
  {
    position: 47,
    barcode: "07891150059849",
    description: "SAB LUX SUAVE BUQUE JASMIM 85G",
    quantity: 2,
    unity: "UN",
    value: 1.99,
    total: 3.98,
  },
  {
    position: 48,
    barcode: "07891150059917",
    description: "SAB LUX SUAVE LIRIO AZUL 85G",
    quantity: 1,
    unity: "UN",
    value: 1.99,
    total: 1.99,
  },
  {
    position: 49,
    barcode: "07891150059856",
    description: "SAB LUX SUAVE FLOR VERBENA 85G",
    quantity: 1,
    unity: "UN",
    value: 1.99,
    total: 1.99,
  },
  {
    position: 50,
    barcode: "07891024132005",
    description: "CR D COLGATE TR A ORIG 90G",
    quantity: 1,
    unity: "UN",
    value: 4.69,
    total: 4.69,
  },
  {
    position: 51,
    barcode: "07500435154420",
    description: "AP BARB DESC PREST MEN U GRIP CARD",
    quantity: 1,
    unity: "UN",
    value: 4.19,
    total: 4.19,
  },
  {
    position: 52,
    barcode: "07896067200179",
    description: "PILHA PANASONIC ALK AA LR6 PQ 4X1",
    quantity: 1,
    unity: "UN",
    value: 12.99,
    total: 12.99,
  },
  {
    position: 53,
    barcode: "07896009724015",
    description: "PILHA RAYOVAC ALC PAL 20912 2X1",
    quantity: 1,
    unity: "UN",
    value: 8.65,
    total: 8.65,
  },
  {
    position: 54,
    barcode: "07891024132005",
    description: "CR D COLGATE TR A ORIG 90G",
    quantity: 2,
    unity: "UN",
    value: 4.69,
    total: 9.38,
  },
  {
    position: 55,
    barcode: "07891024180877",
    description: "SH DARLING TILIA PRO VIT B5 350ML",
    quantity: 1,
    unity: "UN",
    value: 8.45,
    total: 8.45,
  },
  {
    position: 56,
    barcode: "07891024182475",
    description: "SH DARLING 2X1 350ML",
    quantity: 1,
    unity: "UN",
    value: 8.45,
    total: 8.45,
  },
  {
    position: 57,
    barcode: "07897312400504",
    description: "LIMP ALUM ECONOMICO 5OOML ",
    quantity: 2,
    unity: "UN",
    value: 2.29,
    total: 4.58,
  },
  {
    position: 58,
    barcode: "07896013108870",
    description: "AMAC ROU SONHO MAGIC L5P4.5L",
    quantity: 1,
    unity: "UN",
    value: 25.99,
    total: 25.99,
  },
  {
    position: 59,
    barcode: "07896098901052",
    description: "LAVA ROU TIXAN PRIMAVERA 5L",
    quantity: 2,
    unity: "UN",
    value: 48.59,
    total: 97.18,
  },
  {
    position: 60,
    barcode: "07896098901373",
    description: "LAVA ROU TIXAN MACIEZ 3L",
    quantity: 1,
    unity: "UN",
    value: 29.99,
    total: 29.99,
  },
  {
    position: 61,
    barcode: "07898247780297",
    description: "OLEO SOJA VITALIV PET 900ML",
    quantity: 3,
    unity: "UN",
    value: 7.29,
    total: 21.87,
  },
  {
    position: 62,
    barcode: "07898403782387",
    description: "LEITE L VIDA BETANIA INT CTAMPA 1L ",
    quantity: 1,
    unity: "UN",
    value: 5.79,
    total: 5.79,
  },
  {
    position: 63,
    barcode: "07898215152354",
    description: "LEITE PO PIRACANJUBA INT 1G ",
    quantity: 1,
    unity: "UN",
    value: 37.9,
    total: 37.9,
  },
  {
    position: 64,
    barcode: "07897748800213",
    description: "ARROZ BCO BELLSABOR T1 5KG ",
    quantity: 2,
    unity: "UN",
    value: 26.99,
    total: 53.98,
  },
  {
    position: 65,
    barcode: "07898211130028",
    description: "SALG SALSITO QUEIJO 32G ",
    quantity: 2,
    unity: "UN",
    value: 1.35,
    total: 2.7,
  },
  {
    position: 66,
    barcode: "07891132019724",
    description: "TEMP SAZON MARROM PFEIJAO SH 60G ",
    quantity: 1,
    unity: "UN",
    value: 4.49,
    total: 4.49,
  },
  {
    position: 67,
    barcode: "07891910007110",
    description: "ACUC CONF GLACUCAR UNIAO 500G",
    quantity: 1,
    unity: "UN",
    value: 6.99,
    total: 6.99,
  },
  {
    position: 68,
    barcode: "07898935659010",
    description: "ACUC CRISTAL CAUAXI 1KG",
    quantity: 1,
    unity: "UN",
    value: 4.15,
    total: 4.15,
  },
  {
    position: 69,
    barcode: "00192505232014",
    description: "ESP OREGANO PURO TEMPERO 10G",
    quantity: 1,
    unity: "UN",
    value: 1.95,
    total: 1.95,
  },
  {
    position: 70,
    barcode: "07891000307045",
    description: "CAFE NESCAFE SOLUV MATINAL SH 40G",
    quantity: 2,
    unity: "UN",
    value: 5.49,
    total: 10.98,
  },
  {
    position: 71,
    barcode: "07891000307120",
    description: "CAFE NESCAFE SOLUV ORIGINAL SH 40G ",
    quantity: 1,
    unity: "UN",
    value: 5.49,
    total: 5.49,
  },
  {
    position: 72,
    barcode: "00192505233271",
    description: "ESP CHIMICHURRI PICANTE PURO TEMPER",
    quantity: 1,
    unity: "UN",
    value: 3.25,
    total: 3.25,
  },
  {
    position: 73,
    barcode: "00192505231901",
    description: "ESP ERVA DOCE PURO TEMPERO 20G ",
    quantity: 1,
    unity: "UN",
    value: 1.99,
    total: 1.99,
  },
  {
    position: 74,
    barcode: "00192505232014",
    description: "ESP OREGANO PURO TEMPERO 10G",
    quantity: 1,
    unity: "UN",
    value: 1.95,
    total: 1.95,
  },
  {
    position: 75,
    barcode: "07891132019281",
    description: "TEMP SAZON VERM PCARNES SH 60G",
    quantity: 3,
    unity: "UN",
    value: 4.49,
    total: 13.47,
  },
  {
    position: 76,
    barcode: "07898211130356",
    description: "SALG DELICITO CHURRASCO 50G ",
    quantity: 2,
    unity: "UN",
    value: 1.89,
    total: 3.78,
  },
  {
    position: 77,
    barcode: "00192505232014",
    description: "ESP OREGANO PURO TEMPERADO 10G",
    quantity: 1,
    unity: "UN",
    value: 1.95,
    total: 1.95,
  },
  {
    position: 78,
    barcode: "00192505232014",
    description: "ESP OREGANO PURDO TEMPERADO 10G",
    quantity: 1,
    unity: "UN",
    value: 1.95,
    total: 1.95,
  },
  {
    position: 79,
    barcode: "07891132019724",
    description: "TEMP SAZON MARROM PFEIJAO SH 60G",
    quantity: 1,
    unity: "UN",
    value: 4.49,
    total: 4.49,
  },
  {
    position: 80,
    barcode: "07891000120095",
    description: "CHOC PO CACAU NESTLE 200G",
    quantity: 1,
    unity: "UN",
    value: 35.49,
    total: 35.49,
  },
  {
    position: 81,
    barcode: "07898041790850",
    description: "BISC POLV ARG TRAD VALE DO PRATA 80",
    quantity: 2,
    unity: "UN",
    value: 6.49,
    total: 12.98,
  },
  {
    position: 82,
    barcode: "00192505233462",
    description: "ESP CEBOLA SALSA E ALHO PURO TEMPER",
    quantity: 1,
    unity: "UN",
    value: 3.99,
    total: 3.99,
  },
  {
    position: 83,
    barcode: "07896490288775",
    description: "FLOCAO MILHO DONA CLARA TRAD 500G",
    quantity: 3,
    unity: "UN",
    value: 1.59,
    total: 4.77,
  },
  {
    position: 84,
    barcode: "07898211130363",
    description: "SALG DELICITOS APETITO PIZZA 50G",
    quantity: 2,
    unity: "UN",
    value: 1.79,
    total: 3.58,
  },
  {
    position: 85,
    barcode: "07896036098981",
    description: "MOLHO TOM POMODORO TRAD SH 300G",
    quantity: 1,
    unity: "UN",
    value: 1.89,
    total: 1.89,
  },
  {
    position: 86,
    barcode: "07891040299614",
    description: "ESP 3M SB M USO ECON 4X1",
    quantity: 1,
    unity: "UN",
    value: 6.49,
    total: 6.49,
  },
  {
    position: 87,
    barcode: "07896259410133",
    description: "LEITE PO CAMPONESA INT 200G",
    quantity: 1,
    unity: "UN",
    value: 7.19,
    total: 7.19,
  },
  {
    position: 88,
    barcode: "07898274440034",
    description: "FAR MAND BCA IDEAL 1KG",
    quantity: 1,
    unity: "UN",
    value: 12.49,
    total: 12.49,
  },
  {
    position: 89,
    barcode: "07899767443822",
    description: "MASSA PRONTA TAPIOCA NOSSA GOMA 1KG",
    quantity: 1,
    unity: "UN",
    value: 6.59,
    total: 6.59,
  },
  {
    position: 90,
    barcode: "07896327511342",
    description: "MIST BOLO APTI LARANJA 400G",
    quantity: 1,
    unity: "UN",
    value: 5.29,
    total: 5.29,
  },
  {
    position: 91,
    barcode: "07896490288775",
    description: "FLOCAO MILHO DONA CLARA TRAD 500G",
    quantity: 1,
    unity: "UN",
    value: 1.59,
    total: 1.59,
  },
  {
    position: 92,
    barcode: "07898922012286",
    description: "FEIJAO DE CORDA DONA DE TP1 1KG",
    quantity: 1,
    unity: "UN",
    value: 6.99,
    total: 6.99,
  },
  {
    position: 93,
    barcode: "07896327501251",
    description: "MIST BOLO APTI ABACAXI 400G",
    quantity: 1,
    unity: "UN",
    value: 5.29,
    total: 5.29,
  },
  {
    position: 94,
    barcode: "00602883656642",
    description: "MAC CORACAO NORDESTINO ESPAGUET COM",
    quantity: 2,
    unity: "UN",
    value: 2.79,
    total: 5.58,
  },
  {
    position: 95,
    barcode: "07000005174907",
    description: "PAO DE FORMA INTEGRAL 36 BUMBA 400G",
    quantity: 1,
    unity: "UN",
    value: 6.99,
    total: 6.99,
  },
  {
    position: 96,
    barcode: "17896259410133",
    description: "LEITE L VIDA PIRACANJUBA SEMI DESN",
    quantity: 12,
    unity: "UN",
    value: 5.49,
    total: 65.88,
  },
  {
    position: 97,
    barcode: "07896259410133",
    description: "LEITE PO CAMPONESA INT 200G",
    quantity: 6,
    unity: "UN",
    value: 7.19,
    total: 43.14,
  },
  {
    position: 98,
    barcode: "07898935659010",
    description: "ACUC CRISTAL CAUAXI 1KG",
    quantity: 10,
    unity: "UN",
    value: 4.15,
    total: 41.5,
  },
  {
    position: 99,
    barcode: "07896181700234",
    description: "ACUC MASC DACOLONIA 500G",
    quantity: 4,
    unity: "UN",
    value: 8.99,
    total: 35.96,
  },
];

const products_2 = [
  {
    position: 1,
    barcode: "02900002374971",
    description: "COXA CSOB FGO INTERF CONG KG",
    quantity: 3.03,
    unity: "KG",
    value: 12.49,
    total: 37.48,
  },
  {
    position: 2,
    barcode: "02900000024724",
    description: "BISTECA SUINA CONGELADA KG",
    quantity: 1.35,
    unity: "KG",
    value: 19.9,
    total: 26.86,
  },
  {
    position: 3,
    barcode: "02900000915350",
    description: "CHA DE FORA PED KG",
    quantity: 3.266,
    unity: "KG",
    value: 31.9,
    total: 104.19,
  },
  {
    position: 4,
    barcode: "02900000354968",
    description: "PALETA SUINA CONS KG",
    quantity: 1.308,
    unity: "KG",
    value: 18.49,
    total: 24.18,
  },
  {
    position: 5,
    barcode: "02900000354968",
    description: "PALETA SUINA CONG KG",
    quantity: 1.256,
    unity: "KG",
    value: 18.49,
    total: 23.22,
  },
  {
    position: 6,
    barcode: "02900005581086",
    description: "QUEIJO PRATO BARRA GRANDE KG",
    quantity: 0.108,
    unity: "KG",
    value: 77.9,
    total: 8.41,
  },
  {
    position: 7,
    barcode: "02900002212518",
    description: "QUEIJO MUSS PRO GIROLANDA KG",
    quantity: 0.218,
    unity: "KG",
    value: 49.9,
    total: 10.88,
  },
  {
    position: 8,
    barcode: "02900003094373",
    description: "LANCHE PRO PEPERI KG",
    quantity: 0.348,
    unity: "KG",
    value: 14.9,
    total: 5.19,
  },
  {
    position: 9,
    barcode: "02900000915114",
    description: "FIGADO BOY CONG KG",
    quantity: 0.72,
    unity: "KG",
    value: 12.49,
    total: 8.99,
  },
  {
    position: 10,
    barcode: "07898061709221",
    description: "BEB LACT FLAMBOYANT MORANGO SH 1KG",
    quantity: 1,
    unity: "UN",
    value: 6.89,
    total: 6.89,
  },
  {
    position: 11,
    barcode: "07898046870540",
    description: "BEBIDA LACT LANGA MRGO 900G",
    quantity: 1,
    unity: "UN",
    value: 4.99,
    total: 4.99,
  },
  {
    position: 12,
    barcode: "07898046870571",
    description: "BEBIDA LACT LONGA BAN MC CER 900G",
    quantity: 1,
    unity: "UN",
    value: 4.99,
    total: 4.99,
  },
  {
    position: 13,
    barcode: "02900000050433",
    description: "F BANANA NANICA KG",
    quantity: 2.485,
    unity: "KG",
    value: 6.29,
    total: 15.63,
  },
  {
    position: 14,
    barcode: "02900000060524",
    description: "F MARACUJA KG",
    quantity: 2.99,
    unity: "KG",
    value: 6.99,
    total: 20.9,
  },
  {
    position: 15,
    barcode: "02900000038721",
    description: "V CEBOLA COMUN KG",
    quantity: 1.695,
    unity: "KG",
    value: 2.99,
    total: 5.07,
  },
  {
    position: 16,
    barcode: "02900000808164",
    description: "V TOMATE SALADETE KG",
    quantity: 0.555,
    unity: "KG",
    value: 3.29,
    total: 1.83,
  },
  {
    position: 17,
    barcode: "02900000058101",
    description: "F PERA PORTUGUESA KG",
    quantity: 0.48,
    unity: "KG",
    value: 25.99,
    total: 12.48,
  },
  {
    position: 18,
    barcode: "02900000087545",
    description: "MELAO AMARELO KG",
    quantity: 3.41,
    unity: "KG",
    value: 3.79,
    total: 12.92,
  },
  {
    position: 19,
    barcode: "02900000016323",
    description: "F BANANA PRATA KG",
    quantity: 1.27,
    unity: "KG",
    value: 7.39,
    total: 9.39,
  },
  {
    position: 20,
    barcode: "02900000041196",
    description: "V PIMENTAO KG",
    quantity: 0.255,
    unity: "KG",
    value: 5.99,
    total: 1.53,
  },
  {
    position: 21,
    barcode: "02900000016323",
    description: "F BANANA PRATA KG",
    quantity: 0.35,
    unity: "KG",
    value: 7.39,
    total: 2.59,
  },
  {
    position: 22,
    barcode: "02900000016071",
    description: "F KIWI IMPORTADO KG",
    quantity: 0.35,
    unity: "KG",
    value: 27.99,
    total: 9.8,
  },
  {
    position: 23,
    barcode: "02900000022553",
    description: "UVA PASSAS PRETA KG",
    quantity: 0.306,
    unity: "KG",
    value: 24.99,
    total: 7.65,
  },
  {
    position: 24,
    barcode: "02900004362068",
    description: "V ACELGA MATEUS A KG",
    quantity: 0.402,
    unity: "KG",
    value: 10.99,
    total: 4.42,
  },
  {
    position: 25,
    barcode: "02900000067134",
    description: "V CENOURA KG",
    quantity: 0.645,
    unity: "KG",
    value: 3.89,
    total: 2.51,
  },
  {
    position: 26,
    barcode: "07898215151760",
    description: "LETTE L VIDA PIRACANJUBA SEMI DESN",
    quantity: 5,
    unity: "UN",
    value: 5.49,
    total: 27.45,
  },
  {
    position: 27,
    barcode: "07898080643018",
    description: "LEITE L VIDA ITALAC S-D A2 1L",
    quantity: 3,
    unity: "UN",
    value: 6.59,
    total: 19.77,
  },
  {
    position: 28,
    barcode: "07891107101621",
    description: "OLEO SOJA SOYA PET 900ML",
    quantity: 3,
    unity: "UN",
    value: 8.59,
    total: 25.77,
  },
  {
    position: 29,
    barcode: "07891700011266",
    description: "TEMP COMP ARISCO SPIM 1KG",
    quantity: 1,
    unity: "UN",
    value: 21.05,
    total: 21.05,
  },
  {
    position: 30,
    barcode: "07898046870311",
    description: "REQUEIJAO LIGHT LONGA 200G",
    quantity: 1,
    unity: "UN",
    value: 9.99,
    total: 9.99,
  },
  {
    position: 31,
    barcode: "07896004400075",
    description: "LEITE COCO SOCOCO 200ML",
    quantity: 1,
    unity: "UN",
    value: 7.09,
    total: 7.09,
  },
  {
    position: 32,
    barcode: "07394904271719",
    description: "MARGARINA PRIMOR 1KG",
    quantity: 1,
    unity: "UN",
    value: 10.99,
    total: 10.99,
  },
  {
    position: 33,
    barcode: "07891242810549",
    description: "LAVA ROU UAU ROSAS E SEDUCAO 5L.",
    quantity: 1,
    unity: "UN",
    value: 44.99,
    total: 44.99,
  },
  {
    position: 34,
    barcode: "07497534822184",
    description: "DESINF AZULIM ERVA DOCE 5L",
    quantity: 1,
    unity: "UN",
    value: 21.9,
    total: 21.9,
  },
  {
    position: 35,
    barcode: "07891150062825",
    description: "LAVA ROU OMO LAVANDA 3L",
    quantity: 1,
    unity: "UN",
    value: 34.99,
    total: 34.99,
  },
  {
    position: 36,
    barcode: "07896006413851",
    description: "PAPEL TOALHA SCALA 120 FLS",
    quantity: 1,
    unity: "UN",
    value: 4.89,
    total: 4.89,
  },
  {
    position: 37,
    barcode: "07896042077505",
    description: "ESCORREDOR TALHER PLASUTIL VERM",
    quantity: 1,
    unity: "UN",
    value: 7.65,
    total: 7.65,
  },
  {
    position: 38,
    barcode: "07891150059917",
    description: "SAB LUX SUAVE LIRIO AZUL 85G",
    quantity: 2,
    unity: "UN",
    value: 1.99,
    total: 3.98,
  },
  {
    position: 39,
    barcode: "07896229943654",
    description: "REPAR PONTAS NATU HAIR OLEO RICINO",
    quantity: 1,
    unity: "UN",
    value: 9.35,
    total: 9.35,
  },
  {
    position: 40,
    barcode: "07898658625934",
    description: "OLEO CAP NATUTRAT GEL VINAGRE MACA",
    quantity: 1,
    unity: "UN",
    value: 19.99,
    total: 19.99,
  },
  {
    position: 41,
    barcode: "07891024181072",
    description: "SH DARLING CERAMIDAS 350ML",
    quantity: 1,
    unity: "UN",
    value: 8.79,
    total: 8.79,
  },
  {
    position: 42,
    barcode: "07891024132005",
    description: "CR D COLGATE TR A ORIG 90G",
    quantity: 1,
    unity: "UN",
    value: 4.69,
    total: 4.69,
  },
  {
    position: 43,
    barcode: "07891150059900",
    description: "SAB LUX SUAVE ORQUIDEA NEGRA 85G",
    quantity: 1,
    unity: "UN",
    value: 1.99,
    total: 1.99,
  },
  {
    position: 44,
    barcode: "07896000722690",
    description: "CR TRAT NIELY GOLD NUT OLEO DE COCO",
    quantity: 1,
    unity: "UN",
    value: 17.89,
    total: 17.89,
  },
  {
    position: 45,
    barcode: "07509546653143",
    description: "ESC DENTAL COLG COLORS 5X1",
    quantity: 1,
    unity: "UN",
    value: 28.55,
    total: 28.55,
  },
  {
    position: 46,
    barcode: "07896005271964",
    description: "FERMENTO D BENTA FERMIX INST 10G",
    quantity: 1,
    unity: "UN",
    value: 1.89,
    total: 1.89,
  },
  {
    position: 47,
    barcode: "07891132019724",
    description: "TEMP SAZON MARRON PFEIJAO SH 60G",
    quantity: 2,
    unity: "UN",
    value: 6.49,
    total: 12.98,
  },
  {
    position: 48,
    barcode: "07896005271964",
    description: "FERMENTO D BENTA FERMIX INST 10G",
    quantity: 1,
    unity: "UN",
    value: 1.89,
    total: 1.89,
  },
  {
    position: 49,
    barcode: "07896005279489",
    description: "FERMENTO D BENTA PO TRAD 100G",
    quantity: 1,
    unity: "UN",
    value: 5.09,
    total: 5.09,
  },
  {
    position: 50,
    barcode: "07896259424116",
    description: "CR LEITE CULINARIO EMBARE 200G",
    quantity: 1,
    unity: "UN",
    value: 1.99,
    total: 1.99,
  },
  {
    position: 51,
    barcode: "07891000065440",
    description: "LEITE COND NESTLE MOCA SEMI DES TP",
    quantity: 1,
    unity: "UN",
    value: 8.59,
    total: 8.59,
  },
  {
    position: 52,
    barcode: "07891150059900",
    description: "SAB LUX SUAVE ORQUIDEA NEGRA 85G",
    quantity: 1,
    unity: "UN",
    value: 1.99,
    total: 1.99,
  },
  {
    position: 53,
    barcode: "07898962229545",
    description: "ESP PIMENTA CALABRESA ALRAH 30G",
    quantity: 1,
    unity: "UN",
    value: 4.25,
    total: 4.25,
  },
  {
    position: 54,
    barcode: "07898954999012",
    description: "F UVA VITORIA GRANDVALLE 500G",
    quantity: 1,
    unity: "UN",
    value: 8.99,
    total: 8.99,
  },
  {
    position: 55,
    barcode: "07891167023017",
    description: "SARDINHA 88 OLEO 125G",
    quantity: 1,
    unity: "UN",
    value: 5.05,
    total: 5.05,
  },
  {
    position: 56,
    barcode: "07891167023017",
    description: "SARDINHA 88 OLEO 125G",
    quantity: 1,
    unity: "UN",
    value: 5.05,
    total: 5.09,
  },
  {
    position: 57,
    barcode: "07896945403296",
    description: "DOCE TAMBAU BANANA 500G",
    quantity: 1,
    unity: "UN",
    value: 10.99,
    total: 10.99,
  },
  {
    position: 58,
    barcode: "07891000115787",
    description: "RACAO PGATO FRISKIES CORDEIRO 85G",
    quantity: 2,
    unity: "UN",
    value: 2.69,
    total: 5.38,
  },
  {
    position: 59,
    barcode: "07891000118061",
    description: "RACAO PGATO FRISKIES PERU 85G",
    quantity: 1,
    unity: "UN",
    value: 2.69,
    total: 2.69,
  },
  {
    position: 60,
    barcode: "07894000030470",
    description: "MAIONESE HELLMANNS SH 200G",
    quantity: 1,
    unity: "UN",
    value: 4.89,
    total: 4.89,
  },
  {
    position: 61,
    barcode: "07894900011753",
    description: "REFRIG COCA COLA 1.5L",
    quantity: 1,
    unity: "UN",
    value: 6.79,
    total: 6.79,
  },
  {
    position: 62,
    barcode: "07891991002646",
    description: "REFRIG GUARANA ANTARCTICA 600ML",
    quantity: 2,
    unity: "UN",
    value: 3.99,
    total: 7.98,
  },
  {
    position: 63,
    barcode: "07898952139113",
    description: "CAJUINA BRASUCOS 500ML",
    quantity: 2,
    unity: "UN",
    value: 6.59,
    total: 13.18,
  },
  {
    position: 64,
    barcode: "07896181712480",
    description: "CREME AMENDOIM DACOLONIA PACOCA 200",
    quantity: 1,
    unity: "UN",
    value: 12.89,
    total: 12.89,
  },
  {
    position: 65,
    barcode: "07896036000717",
    description: "EXT TOMATE ELEFANTE PP 300G",
    quantity: 1,
    unity: "UN",
    value: 7.79,
    total: 7.79,
  },
  {
    position: 66,
    barcode: "07891150060296",
    description: "SAB LUX SUAVE ROSAS FRANCESAS 125G",
    quantity: 2,
    unity: "UN",
    value: 3.19,
    total: 6.38,
  },
  {
    position: 67,
    barcode: "07896045506040",
    description: "CERVEJA HEINEKEN 0.0 ALCOOL LN 330M",
    quantity: 2,
    unity: "UN",
    value: 6.69,
    total: 13.38,
  },
  {
    position: 68,
    barcode: "07894650003787",
    description: "INSET BAYGON AER ACAO TOTAL 360ML",
    quantity: 1,
    unity: "UN",
    value: 13.49,
    total: 13.49,
  },
  {
    position: 69,
    barcode: "07898617581745",
    description: "MAC LAM MARATA CARNE 74G",
    quantity: 2,
    unity: "UN",
    value: 1.35,
    total: 2.7,
  },
  {
    position: 70,
    barcode: "07891000065440",
    description: "LEITE COND NESTLE MOCA SEMI DES TP",
    quantity: 1,
    unity: "UN",
    value: 8.59,
    total: 8.59,
  },
  {
    position: 71,
    barcode: "07898617581769",
    description: "MAC LAM MARATA GAL CAIP 74G",
    quantity: 1,
    unity: "UN",
    value: 1.35,
    total: 1.35,
  },
  {
    position: 72,
    barcode: "07899676510981",
    description: "ARROZ BCO TIA DORA T1 5KG",
    quantity: 1,
    unity: "UN",
    value: 29.69,
    total: 29.69,
  },
  {
    position: 73,
    barcode: "07898994865643",
    description: "FAR MANDIOCA BRANCA MALU 1KG",
    quantity: 1,
    unity: "UN",
    value: 10.19,
    total: 10.19,
  },
  {
    position: 74,
    barcode: "07898935659010",
    description: "ACUC CRISTAL CAUAXI 1KG",
    quantity: 2,
    unity: "UN",
    value: 4.39,
    total: 8.78,
  },
  {
    position: 75,
    barcode: "07898274440065",
    description: "FEIJAO CARIOCA IDEAL T1 1KG",
    quantity: 1,
    unity: "UN",
    value: 5.69,
    total: 5.69,
  },
  {
    position: 76,
    barcode: "07898286203122",
    description: "CAFE MARATA SOLUV SH 100G",
    quantity: 1,
    unity: "UN",
    value: 10.89,
    total: 10.89,
  },
  {
    position: 77,
    barcode: "07898286203122",
    description: "CAFE MARATA SOLUV SH 100G",
    quantity: 1,
    unity: "UN",
    value: 10.89,
    total: 10.89,
  },
  {
    position: 78,
    barcode: "07896327501251",
    description: "MIST BOLO APTI ABACAXI 400G",
    quantity: 1,
    unity: "UN",
    value: 5.29,
    total: 5.29,
  },
  {
    position: 79,
    barcode: "07896327511342",
    description: "MIST BOLO APTI LARANJA 400G",
    quantity: 1,
    unity: "UN",
    value: 5.29,
    total: 5.29,
  },
  {
    position: 80,
    barcode: "07896259424116",
    description: "CR LEITE CULINARIO EMBARE 200G",
    quantity: 1,
    unity: "UN",
    value: 1.99,
    total: 1.99,
  },
  {
    position: 81,
    barcode: "07898962560020",
    description: "AGUA COCO PARAISO 1L",
    quantity: 1,
    unity: "UN",
    value: 19.67,
    total: 19.67,
  },
  {
    position: 82,
    barcode: "07898043915039",
    description: "SORV FROSTY LEITINHO C ACAI 1.5L",
    quantity: 1,
    unity: "UN",
    value: 25.99,
    total: 25.99,
  },
  {
    position: 83,
    barcode: "07898280080149",
    description: "SAL REFINADD UNIOURO 1KG",
    quantity: 1,
    unity: "UN",
    value: 1.29,
    total: 1.29,
  },
  {
    position: 84,
    barcode: "07898046870205",
    description: "BEBIDA LACT LONGA BANMACCE BL 200G",
    quantity: 1,
    unity: "UN",
    value: 1.49,
    total: 1.49,
  },
  {
    position: 85,
    barcode: "07896046870144",
    description: "BEBIDA LACT LONGA AMEIXA LIGHT BL20",
    quantity: 1,
    unity: "UN",
    value: 1.49,
    total: 1.49,
  },
  {
    position: 86,
    barcode: "07894900010015",
    description: "BEBIDA COCA COLA LT 350ML",
    quantity: 1,
    unity: "UN",
    value: 3.59,
    total: 3.59,
  },
  {
    position: 87,
    barcode: "07000005174891",
    description: "PAO DE FORMA INTEG 36 MASSA E FORM",
    quantity: 1,
    unity: "UN",
    value: 8.49,
    total: 8.49,
  },
];

interface Product {
  position: number;
  barcode: string;
  description: string;
  quantity: number;
  unity: string;
  value: number;
  total: number;
  discount?: number;
}

const insertReceipt =
  async (
    name: string,
    products: Product[],
    date: Date,
    total: number,
    discount: number
  ) => {
    const prisma = new PrismaClient({ adapter });

    try {
      const supermarket = await prisma.supermarket.findFirst({
        where: { name: { contains: "Mateus" } },
        include: { products: true },
      });
      console.log(supermarket)
      const prods = products.filter((item) =>
        !supermarket?.products?.some((prod) => prod?.barcode == item?.barcode)
      );

      console.log(prods.length)
      const reciept = await prisma.reciept.create({
        data: {
          name,
          user_id: "25bae2c4-8bd6-4b25-8d00-50c75273a7ad",
          supermarket_id: supermarket!.id,
          total,
          discount,
          date: date,
        },
      });

      if (reciept.id) {
        const supermarketProducts = await prisma.productSupermarket.createManyAndReturn({
          data: prods.map(item => ({
            category: '',
            description: item.description,
            last_update: new Date(),
            price: item.value,
            supermarket_id: supermarket?.id,
            unity: item.unity,
            barcode: item.barcode
          }) as ProductSupermarket)
        })

        const recipetProducts = products.map(prod => {
          const item = supermarketProducts.concat(supermarket?.products ?? []).find(p => p.barcode === prod.barcode)
          return ({ ...prod, product_id: item?.id, supermarket_id: supermarket?.id })
        })
        console.log(recipetProducts.length)
        const r = await prisma.productReciept.createManyAndReturn({
          data: recipetProducts.map((prod) => ({
            position: prod.position!,
            quantity: prod.quantity!,
            price: prod.value!,
            total: prod.total!,
            discount: prod?.discount ?? 0,
            receipt_id: reciept.id!,
            product_id: prod.product_id!
          })),
        });
        console.log(r.length)
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

export const insertReciepts = async () => {
  await insertReceipt(
    "Comprovante 15/10/2024",
    products_1,
    new Date("2024-10-15 00:00:00"),
    1351.28,
    4.67
  )
  await insertReceipt(
    "Comprovante 10/11/2024",
    products_2,
    new Date("2024-11-10 00:00:00"),
    1032.05,
    0
  )
};
