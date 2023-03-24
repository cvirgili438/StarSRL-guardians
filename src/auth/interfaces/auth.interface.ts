import { ROLS } from 'src/constants/Rols';

export interface PayloadToken {
  sub: string;
  role: ROLS;
}
export interface AuthBody {
  username: string;
  password: string;
}
export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: Boolean;
}
