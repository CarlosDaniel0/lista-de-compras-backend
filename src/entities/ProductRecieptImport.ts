export class ProductRecieptImport {
  position: number
  barcode: string
  description: string
  quantity: number
  unity: string
  price: number
  total: number
  discount: number

  constructor (position: number, barcode: string, description: string, quantity: number, unity: string, price: number, total: number, discount: number) {
    this.position = position
    this.barcode = barcode
    this.description = description
    this.quantity = quantity
    this.unity = unity
    this.price = price
    this.discount = discount ?? 0
    this.total = total
  }

  static parse(json: Record<string, any>) {
    const { position, barcode, description, quantity, unity, price, total, discount } = json
    return new ProductRecieptImport(position, barcode, description, quantity, unity, price, total, discount)
  }
}