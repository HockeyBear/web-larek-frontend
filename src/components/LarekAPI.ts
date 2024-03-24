import { IOrder, IOrderSuccess, IProduct } from "../types";
import { Api, ApiListResponse } from "./base/api";

interface ILarekAPI {
  getProductList: () => Promise<IProduct[]>
  getProduct: (id: string) => Promise<IProduct>
  orderProduct: (order: IOrder) => Promise<IOrderSuccess>
}

export class LarekAPI extends Api implements ILarekAPI {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProduct(id: string): Promise<IProduct> {
    return this.get(`/product/${id}`).then(
      (item: IProduct) => ({
        ...item,
        image: this.cdn + item.image
      })
    )
  }

  getProductList(): Promise<IProduct[]> {
    return this.get('/product').then((data: ApiListResponse<IProduct>) =>
        data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image
        }))
    );
}

  orderProduct(order: IOrder): Promise<IOrderSuccess> {
    return this.post(`/order`, order)
    .then((data: IOrderSuccess) => data)
  }
}