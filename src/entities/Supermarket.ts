import { ProductSupermarket } from "./ProductSupermarket";
import { Reciept } from "./Reciept";

export class Supermarket {
  id: string;
  name: string;
  address: string;
  coords: number[];
  reciepts?: Reciept[];
  products?: ProductSupermarket[];

  constructor(
    id: string,
    name: string,
    address: string,
    coords: number[],
    reciepts?: Record<string, any>[],
    products?: Record<string, any>[]
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.coords = coords;
    if (reciepts) this.reciepts = reciepts?.map(Reciept.parse);
    if (products) this.products = products?.map(ProductSupermarket.parse);
  }

  static parse(json: Record<string, any>) {
    const { id, name, address, coords, reciepts, products } = json;
    if (!name) throw new Error("O campo name é obrigatório");
    if (!address)
      throw new Error("O campo address é obrigatório e deve ser válido");
    if (
      !coords ||
      !Array.isArray(coords) ||
      coords.some((e) => typeof e !== "number")
    )
      throw new Error("O campo coords é obrigatório");

    return new Supermarket(id, name, address, coords, reciepts, products);
  }

  toEntity() {
    const json = {
      id: this.id,
      name: this.name,
      address: this.address,
      coords: this.coords,
    };
    return json;
  }
}
