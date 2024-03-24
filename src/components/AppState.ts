import { Model } from "./base/model";
import { IAppState, IProduct, IOrder, IOrderFormError, FormError, IOrderDeliveryForm, IOrderContacts, PaymentMethods } from "../types";
import { IEvents } from "./base/events";

export type CatalogChangeEvent = {
  catalog: Product[];
}

export class Product extends Model<IProduct> implements IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export class AppState extends Model<IAppState> {
  catalog: IProduct[];
  basket: IProduct[] = [];
  order: IOrder = {
    payment: "card",
    items: [],
    total: 0,
    email: "",
    phone: "",
    address: ""
  }
  preview: string | null;
  formErrors: FormError = {};

  updateBasket() {
    this.emitChanges('counter:changed', this.basket);
    this.emitChanges('basket:changed', this.basket);
  }

  clearBasket() {
    this.basket = [];
    this.updateBasket();
  }

  clearOrder() {
    this.order = {
      payment: "card",
      items: [],
      total: 0,
      email: "",
      phone: "",
      address: ""
    }
  }

  setCatalog(items: IProduct[]) {
    this.catalog = items.map(item => new Product(item, this.events))
    this.emitChanges('items:changed', { catalog: this.catalog })
  }

  setPreview(item: Product) {
    this.preview = item.id;
    this.emitChanges('preview:changed', item)
  }

  getOrderProducts(): IProduct[] {
		return this.basket;
	}

  productOrder(item: IProduct): boolean {
    return this.basket.includes(item);
  }

  addToBasket(item: Product) {
    if(this.basket.indexOf(item) < 0) {
      this.basket.push(item)
      this.updateBasket();
    }
  }

  removeFromBasket(id: string) {
    this.basket = this.basket.filter((it) => it.id != id)
    this.emitChanges('basket:changed');
  }

  getTotal(): number {
    return this.order.items.reduce((total, item) => total + this.catalog.find(it => it.id === item).price, 0)
  }

  setPaymentMethod(method: string) {
    this.order.payment = method as PaymentMethods;
    this.validateDelivery();
  }

  setOrderDeliveryField(value: string) {
    this.order.address = value;
    this.validateDelivery();
  };

  setOrderContactField(field: keyof IOrderContacts, value: string) {
    this.order[field] = value;
    this.validateContact();
  }

  validateDelivery() {
    const errors: typeof this.formErrors = {};
    if(!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты'
		}
    if(!this.order.address) {
      errors.address = 'Необходимо указать адрес'
    }
    this.formErrors = errors;
    this.events.emit('deliveryFormError:change', this.formErrors)
    return Object.keys(errors).length === 0
  }

  validateContact() {
    const errors: typeof this.formErrors = {};
    if(!this.order.email) {
      errors.email = 'Необходимо указать email'
    }
    if(!this.order.phone) {
      errors.phone = 'Необходимо указать телефон'
    }
    this.formErrors = errors;
    this.events.emit('contactFormError:change', this.formErrors)
    return Object.keys(errors).length === 0
  }
}