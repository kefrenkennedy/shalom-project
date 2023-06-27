export interface ITokenPayload {
  role: 'ADMINISTRATOR' | 'PARTICIPANT';
  sub: string;
  exp: number;
}
