import { IOrderDeliveryForm } from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export class Order extends Form<IOrderDeliveryForm> {
  protected _paymentContainer: HTMLDivElement;
  protected _paymentButton: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._paymentContainer = ensureElement<HTMLDivElement>('.order__buttons', this.container);
    this._paymentButton = Array.from(this._paymentContainer.querySelectorAll('.button_alt'));

    this._paymentContainer.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLButtonElement;
      this.setToggleClassPayment(target.name)
      events.emit(`order.payment:change`, {target: target.name}) 
    })
  }

  setToggleClassPayment(className: string) {
    this._paymentButton.forEach(button => {
      if (button.name === className) {
        button.classList.add('button_alt-active');
      } else {
        button.classList.remove('button_alt-active');
      }
    })
  }

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }
}