export enum TokenType {
  OAUTH,
  OTHER
}

export class TokenInfo {
  token: string;
  refreshToken?: string;
  start: Date;
  end: Date;
  time: number;
  tokenType: TokenType;
}

export class IdentityUser {
  id: string;
  name?: string;
  username: string;
  tokenInfo: TokenInfo;
  roles: Array<string>;
  date?: Date;
}
