import { ProductSupermarket } from "./ProductSupermarket";
import { Reciept } from "./Reciept";

export class ProductReciept {
  id: string;
  position: number;
  quantity: number;
  price: number;
  total: number;
  receipt_id: string;
  product_id: string;
  receipt?: Reciept;
  product?: ProductSupermarket;

  constructor(
    id: string,
    position: number,
    quantity: number,
    price: number,
    total: number,
    receipt_id: string,
    product_id: string,
    receipt?: Record<string, any>,
    product?: Record<string, any>
  ) {
    this.id = id;
    this.position = position;
    this.quantity = quantity;
    this.price = price;
    this.total = total;
    this.receipt_id = receipt_id;
    this.product_id = product_id;
    if (receipt) this.receipt = Reciept.parse(receipt);
    if (product) this.product = ProductSupermarket.parse(product);
  }

  static parse(json: Record<string, any>) {
    const {
      id,
      position,
      quantity,
      price,
      total,
      receipt_id,
      product_id,
      receipt,
      product,
    } = json;
    if (typeof position !== "number" && Number.isNaN(Number(position)))
      throw new Error("O campo position é obrigatório");
    if (typeof quantity !== "number" && Number.isNaN(Number(quantity)))
      throw new Error("O campo quantity é obrigatório");
    if (typeof price !== "number" && Number.isNaN(Number(price)))
      throw new Error("O campo quantity é obrigatório");
    if (typeof price !== "number" && Number.isNaN(Number(price)))
      throw new Error("O campo price é obrigatório");
    if (typeof total !== "number" && Number.isNaN(Number(total)))
      throw new Error("O campo total é obrigatório");
    if (!receipt_id) throw new Error("O campo receipt_id é obrigatório");
    if (!product_id) throw new Error("O campo product_id é obrigatório");
    return new ProductReciept(
      id,
      position,
      quantity,
      price,
      total,
      receipt_id,
      product_id,
      receipt,
      product
    );
  }

  toEntity() {
    const json = {
      id: this.id,
      position: this.position,
      quantity: this.quantity,
      price: this.price,
      total: this.total,
      receipt_id: this.receipt_id,
      product_id: this.product_id
    };
    return json;
  }
}
