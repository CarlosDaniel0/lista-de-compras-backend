export class User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  token?: string

  constructor(id: string, name: string, email: string, picture?: string, token?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.picture = picture;
    if (token) this.token = token
  }

  static parse(json: Record<string, any>) {
    const { id, name, email, picture, token } = json;
    if (!name) throw new Error("O campo name é obrigatório");
    if (!email) throw new Error("O campo email é obrigatório");
    if (!picture) throw new Error("O campo picture é obrigatório");
    return new User(id, name, email, picture, token);
  }

  toEntity() {
    const json = {
      id: this.id,
      name: this.name,
      email: this.email,
      picture: this.picture,
    };
    return json;
  }
}
