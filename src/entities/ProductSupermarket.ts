import { Supermarket } from "./Supermarket";
import { Wholesale } from "./Wholesale";

export class ProductSupermarket {
  id: string;
  description: string;
  unity: string;
  category: string;
  barcode?: string;
  price: number;
  last_update: Date;
  supermarket_id: string;
  wholesale?: Wholesale;
  supermarket?: Supermarket;

  constructor(
    id: string,
    description: string,
    unity: string,
    category: string,
    barcode: string = "",
    price: number,
    last_update: string,
    supermarket_id: string,
    wholesale?: Record<string, any>,
    supermarket?: Record<string, any>
  ) {
    this.id = id;
    this.description = description;
    this.unity = unity;
    this.category = category;
    this.barcode = barcode;
    this.price = price;
    this.last_update = new Date(last_update);
    this.supermarket_id = supermarket_id;
    if (wholesale) this.wholesale = Wholesale.parse(wholesale)
    if (supermarket) this.supermarket = Supermarket.parse(supermarket)
  }

  static parse(json: Record<string, any>) {
    const {
      id,
      description,
      unity,
      category,
      barcode,
      price,
      last_update,
      supermarket_id,
      wholesale,
      supermarket
    } = json;
    if (!description) throw new Error("O campo description é obrigatório");
    if (!unity) throw new Error("O campo unity é obrigatório");
    if (!category) throw new Error("O campo category é obrigatório");
    if (!barcode) throw new Error("O campo barcode é obrigatório");
    if (typeof price !== "number" && Number.isNaN(Number(price)))
      throw new Error("O campo price é obrigatório");
    if (!last_update || !new Date(last_update))
      throw new Error("O campo last_update é obrigatório");
    if (!supermarket_id)
      throw new Error("O campo supermarket_id é obrigatório");
    return new ProductSupermarket(
      id,
      description,
      unity,
      category,
      barcode,
      price,
      last_update,
      supermarket_id,
      wholesale,
      supermarket
    );
  }

  toEntity() {
    const json = {
      id: this.id,
      description: this.description,
      unity: this.unity,
      category: this.category,
      barcode: this.barcode,
      price: this.price,
      last_update: this.last_update,
      supermarket_id: this.supermarket_id,
    };
    return json;
  }
}
