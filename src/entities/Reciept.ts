import { ProductReciept } from "./ProductReciept";
import { Supermarket } from "./Supermarket";
import { User } from "./User";

export class Reciept {
  id: string;
  name: string;
  date: Date;
  total: number;
  discount: number;
  supermarket_id: string;
  supermarket?: Supermarket;
  user_id: string
  user?: User
  products?: ProductReciept[];
  

  constructor(
    id: string,
    name: string,
    date: string,
    total: number,
    discount: number,
    supermarket_id: string,
    user_id: string,
    user?: Record<string, any>,
    supermarket?: Record<string, any>,
    products?: Record<string, any>[]
  ) {
    this.id = id;
    this.name = name;
    this.date = new Date(date.substring(0, 10) + " 00:00:00");
    this.total = total;
    this.discount = discount;
    this.supermarket_id = supermarket_id;
    this.user_id = user_id
    if (user) this.user = User.parse(user)
    if (supermarket) this.supermarket = Supermarket.parse(supermarket)
    if (products) this.products = products?.map(ProductReciept.parse)
  }

  static parse(json: Record<string, any>) {
    const { id, name, date, total, discount, supermarket_id, user_id, user, supermarket, products } = json;
    if (!name) 
      throw new Error("O campo name é obrigatório");
    if (!date || !new Date(date.substring(0, 10) + " 00:00:00"))
      throw new Error("O campo date é obrigatório e deve ser válido");
    if (typeof total !== "number" && Number.isNaN(Number(total)))
      throw new Error("O campo total é obrigatório");
    if (typeof discount !== "number" && Number.isNaN(Number(discount)))
      throw new Error("O campo discount é obrigatório");
    if (!supermarket_id) throw new Error("O supermarket_id é obrigatório");
    if (!user_id) throw new Error("O user_id é obrigatório")
    return new Reciept(id, name, date, total, discount, supermarket_id, user_id, user, supermarket, products);
  }

  toEntity() {
    const json = {
      id: this.id,
      name: this.name,
      date: this.date,
      total: this.total,
      discount: this.discount,
      supermarket_id: this.supermarket_id,
      user_id: this.user_id
    };
    return json;
  }
}
