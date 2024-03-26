import { IOrderDeliveryForm } from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export class Order extends Form<IOrderDeliveryForm> {
  protected _paymentContainer: HTMLDivElement;
  protected _paymentButton: HTMLButtonElement[];
  protected _addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._paymentContainer = ensureElement<HTMLDivElement>('.order__buttons', this.container);
    this._paymentButton = Array.from(this._paymentContainer.querySelectorAll('.button_alt'));
    this._addressInput = this.container.elements.namedItem('address') as HTMLInputElement;

    this._paymentContainer.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLButtonElement;
      this.setToggleClassPayment(target.name)
      events.emit(`order.payment:change`, {target: target.name}) 
    })
  }

  setToggleClassPayment(className: string) {
    this._paymentButton.forEach(button => {
      this.toggleClass(button, 'button_alt-active', button.name === className);
  });
  }

  set address(value: string) {
    this._addressInput.value = value;
  }
}