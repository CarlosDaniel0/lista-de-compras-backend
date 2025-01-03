import { ProductList } from "./ProductList";
import { User } from "./User";

export class List {
  id: string;
  name: string;
  date: Date;
  user_id: string
  user?: User
  products?: ProductList[];

  constructor(id: string, name: string, date: string, user_id: string, user: Record<string, any>, products?: Record<string, any>[]) {
    this.id = id;
    this.name = name;
    this.date = new Date(date.substring(0, 10) + " 00:00:00");
    this.user_id = user_id
    if (user) this.user = User.parse(user)
    if (products) this.products = products?.map(ProductList.parse)
  }

  static parse(json: Record<string, any>) {
    const { id, name, date, user_id, user, products } = json;
    if (!name) throw new Error("O campo name é obrigatório");
    if (!date || !new Date(date.substring(0, 10) + " 00:00:00"))
      throw new Error("O campo date é obrigatório");
    return new List(id, name, date, user_id, user, products);
  }

  toEntity() {
    const json = {
      id: this.id,
      name: this.name,
      date: this.date,
      user_id: this.user_id
    };
    return json;
  }
}
