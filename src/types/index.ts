export interface IProductList {
  id: string,
  description: string,
  image: string,
  title: string,
  category: string,
  price: number | null,
}

export interface IAppState {
  catalog: IProductList[],
  order: IOrder | null,
  basket: string[],
  loading: boolean,
}

export interface IOrderForm {
  email: string,
  phone: string,
}

export interface IOrderDeliveryForm {
  payment: string,
  address: string,
}

export interface IOrder extends IOrderForm, IOrderDeliveryForm {
  items: string[],
}

export type FormError = Partial<Record<keyof IOrder, string>>