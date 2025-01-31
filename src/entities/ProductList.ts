import { List } from "./List";
import { ProductSupermarket } from "./ProductSupermarket";
import { Supermarket } from "./Supermarket";

export class ProductList {
  id: string;
  description: string;
  unity: string;
  quantity: number;
  list_id: string;
  product_id?: string;
  supermarket_id?: string;
  list?: List;
  product?: ProductSupermarket;
  supermarket?: Supermarket;

  constructor(
    id: string,
    description: string,
    unity: string,
    quantity: number,
    list_id: string,
    product_id?: string,
    supermarket_id?: string,
    list?: Record<string, any>,
    product?: Record<string, any>,
    supermarket?: Record<string, any>
  ) {
    this.id = id;
    this.description = description;
    this.unity = unity;
    this.quantity = quantity;
    this.list_id = list_id;
    if (product_id) this.product_id = product_id;
    if (supermarket_id) this.supermarket_id = supermarket_id;
    if (list) this.list = List.parse(list);
    if (product) this.product = ProductSupermarket.parse(product);
    if (supermarket) this.supermarket = Supermarket.parse(supermarket)
  }

  static parse(json: Record<string, any>) {
    const { id, description, unity, quantity, list_id, product_id, supermarket_id, list, product, supermarket } = json;
    if (!description) throw new Error("O campo description é obrigatório");
    if (!unity) throw new Error("O campo unity é obrigatório");
    if (typeof quantity !== "number" && Number.isNaN(Number(quantity)))
      throw new Error("O campo quantity é obrigatório");
    if (!list_id) throw new Error("O campo list_id é obrigatório");
    return new ProductList(id, description, unity, quantity, list_id, product_id, supermarket_id, list, product, supermarket);
  }

  toEntity() {
    const json = {
      id: this.id,
      description: this.description,
      unity: this.unity,
      quantity: this.quantity,
      list_id: this.list_id,
      product_id: this.product_id,
      supermarket_id: this.supermarket_id
    };

    return json;
  }
}
