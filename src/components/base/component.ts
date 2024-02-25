/**
 * абсткратный класс
 */
export abstract class Component<T> {
  protected constructor(protected readonly container: HTMLElement) {

  }

  /**
   *  Переключение классов
   */
  toggleClass(element: HTMLElement, className: string, force?: boolean) {
    element.classList.toggle(className, force);
  }

  /**
   * Обновление текстового содержимого
   */
  protected setText(element: HTMLElement, value: unknown) {
    if(element) {
      element.textContent = String(value);
    }
  }

  /**
   * Статус блокировки
   */
  setDisable(element: HTMLElement, state: boolean) {
    if(element) {
      if(state) element.setAttribute('disabled', 'disabled');
      else element.removeAttribute('disabled');
    }
  }

  /**
   * Скрытый элемент
   */
  protected setHidden(element: HTMLElement) {
    element.style.display = 'none';
  }

  /**
   * Показываемый элемент
   */
  protected setVisible(element: HTMLElement) {
    element.style.removeProperty('display');
  }

  /**
   * Вывод изображения
   * @param src Вставляемая ссылка
   * @param alt Альтернативный текст на случай если отсутвует ссылка на изображение
   */
  protected setImage(element: HTMLElement, src: string, alt?: string) {
    if (element instanceof HTMLImageElement) {
      element.src = src;
      if (alt) {
        element.alt = alt;
      } 
    }
  }

  /**
   * Возвращает рендер в DOM
   */
  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}