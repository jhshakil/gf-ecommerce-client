export type TLoginData = {
  email: string;
  password: string;
};

export type TRegisterData = {
  email: string;
  password: string;
  name: string;
};

export type TUserData = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type TCustomerData = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  phone: string | null;
  image: string | null;
  address: string | null;
  city: string | null;
  zipCode: string | null;
  country: string | null;
};
