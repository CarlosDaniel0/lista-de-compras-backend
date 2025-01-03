export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static parse(json: Record<string, any>) {
    const { id, name, email, password } = json;
    if (!name) throw new Error("O campo name é obrigatório");
    if (!email) throw new Error("O campo email é obrigatório");
    if (!password) throw new Error("O campo password é obrigatório");
    return new User(id, name, email, password);
  }

  toEntity() {
    const json = {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    };
    return json;
  }
}
