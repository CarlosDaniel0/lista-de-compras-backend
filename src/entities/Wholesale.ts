import { ProductSupermarket } from "./ProductSupermarket";

export class Wholesale {
  id: string;
  description: string;
  min_quantity: number;
  price: number;
  product_id: string;
  product?: ProductSupermarket;

  constructor(
    id: string,
    description: string,
    min_quantity: number,
    price: number,
    product_id: string,
    product?: Record<string, any>
  ) {
    this.id = id;
    this.description = description;
    this.min_quantity = min_quantity;
    this.price = price;
    this.product_id = product_id;
    if (product) this.product = ProductSupermarket.parse(product)
  }

  static parse(json: Record<string, any>) {
    const { id, description, min_quantity, price, product_id, product } = json
    if (!description) throw new Error("O campo description é obrigatório");
    if (typeof min_quantity !== "number" && Number.isNaN(Number(min_quantity)))
      throw new Error("O campo min_quantity é obrigatório");
    if (typeof price !== "number" && Number.isNaN(Number(price))) throw new Error("O campo price é obrigatório");
    if (!product_id) throw new Error("O campo product_id é obrigatório");
    return new Wholesale(id, description, min_quantity, price, product_id, product)
  }

  toEntity() {
    const json = {
      id: this.id,
      description: this.description,
      min_quantity: this.min_quantity,
      price: this.price,
      product_id: this.product_id,
    };
    return json;
  }
}
