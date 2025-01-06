import { jwtDecode } from "jwt-decode";
import { User } from "./User";

type SelectedBy =
  | "auto"
  | "user"
  | "user_1tap"
  | "user_2tap"
  | "btn"
  | "btn_confirm"
  | "btn_add_session"
  | "btn_confirm_add_session";

export class CredentialResponse {
  credential: string;
  select_by: SelectedBy;
  clientId: string;
  user?: User

  constructor(credential: string, select_by: string, clientId: string) {
    this.credential = credential;
    this.select_by = select_by as SelectedBy;
    this.clientId = clientId;
    this.user = User.parse(jwtDecode(credential))
  }

  static parse(json: Record<string, never>) {
    const { credential, select_by, clientId } = json;
    if (!credential) throw new Error("O campo credential é obrigatório");
    if (!select_by) throw new Error("O campo select_by é obrigatório");
    if (!clientId) throw new Error("O campo clientId é obrigatório");
    return new CredentialResponse(credential, select_by, clientId);
  }

  toEntity() {
    return {
      credential: this.credential,
      select_by: this.select_by,
      clientId: this.clientId,
      user: this.user
    };
  }
}
