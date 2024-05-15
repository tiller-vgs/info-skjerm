export type LoginValue = {
  email: string;
  password: string;
};

export type RegisterValue = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UpdateProfileValue = {
  expires: string | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  id?: string | null | undefined;
};

export type weatherData = {
  time: string;
  airTemperature: number;
  symbol_code: string;
};
