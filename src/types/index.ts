export type PaymentMethods = 'card' | 'cash' | '';
export type CategoryType = 'софт-скилл' | 'хард-скилл' | 'другое' | 'кнопка' | 'доп';

export interface IProduct {
  id: string,
  description: string,
  image: string,
  title: string,
  category: string,
  price: number | null,
}

export interface IAppState {
  catalog: IProduct[],
  order: IOrder | null,
  basket: IProduct[] | null,
  preview: string | null,
  loading: boolean,
}

export interface ICard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  selected: boolean;
  button: string;
}

export interface IPage {
  counter: number;
  store: HTMLElement[];
  locked: boolean;
}

export interface IOrderContacts {
  email: string,
  phone: string,
}

export interface IOrderDeliveryForm {
  payment: PaymentMethods,
  address: string,
}

export interface IOrderFormError extends IOrderContacts, IOrderDeliveryForm {}

export interface IOrder extends IOrderFormError {
  items: string[],
  total: number;
  payment: PaymentMethods;
}


export interface IOrderSuccess {
  id: string;
  total: number;
}

export type FormError = Partial<Record<keyof IOrder, string>>