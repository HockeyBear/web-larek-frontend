import { Model } from "./base/model";
import { IAppState, IProduct, IOrder, IOrderFormError } from "../types";

export class AppState extends Model<IAppState> {
  catalog: IProduct[];
  order: IOrder = {
    email: '',
    phone: '',
    address: '',
    payment: '',
    items: [],
    total: 0,
  };
  formErrorOrder: IOrderFormError = {
    email: "",
    phone: "",
    payment: "",
    address: "",
  };

  toggleOrderedProduct(id: string, isIncluded: boolean) {
    if(isIncluded) {
      this.order.items.push(id);
    } else {
      this.order.items.filter((item) => item !== id);
    }
  }
}