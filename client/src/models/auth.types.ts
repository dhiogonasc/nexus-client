export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  user: any;
  data: any;
  jwt: string;
  accessToken: string;
  token: string;
  expiresIn: number;
  loggedInAt: string;
}

export interface RegisterRequestDTO {
  username: string;
  email: string;
  password: string;
}