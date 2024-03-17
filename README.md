# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


# Документация
## MVP

Приложение будет реализовано по принципу MVP архитектуре.

- **Модель (Model)** - Классы Model, хранит данные и бизнес-логику приложения, так же взаимодействуют с потомками - `Product`, `AppState`
- **Вью (View)** - Классы View, отображает данные пользователю, 
реагирует на действия пользователя, так же взаимодействуют с потомками `Card`, `Modal`, `Basket`, `Page`, `Form`, `Success`
- **Презентер (Presenter)** - Классы Presenter, cвязывает модель и вид, 
обрабатывая действия пользователя и обновляя данные в модели, 
так же взаимодействуют с потомками `LarekAPI`, `EventEmitter`, + `src/index.ts`

## Описание базовых классов

Класс `Component<T>`
Базовый класс для отображения компонентов, от него наследуются компоненты представления
#### Конструктор:
В конструктор входит один аргумент. класс принимает констурктор: `constructor(container: HTMLElement)` - принимает начальный данные для модели и объект событий для уведомления о изменениях в модели

### Методы: ###
  - `setText`: Устанавливает текст содержимого
  - `setDisable`: Устанавливает статус `Disabled`
  - `setHidden`: Скрывает элемент
  - `setVisible`: Покаызвает элемент
  - `setImage`: Устанавливает изображение с альт. текстом
  - `toggleClass`: Переключает классы элемента
  - `render`: Отображает возвращаемое значение элемента

Класс `EventEmitter`
Класс реализует паттерн "Наблюдатель", позволяет уведомлять и подписываться на события, так же сбрасывать от одного события либо же от всех событий.

### Методы: ###
  - `on`: Подписка на событие
  - `off`: Отписка от события
  - `emit`: Уведомление о событии
  - `onAll`: Подписка на все события
  - `offAll`: Отписка от всех событий

Класс `Api`
Класс обеспечивает обмен данными с сервером, реализует `GET` и `POST` методы
В конструктор входит два аргумента базоый URL (baseURL) и запросы (option) - Если option не передан то используется пустой объект

### Методы: ###
  - `GET`: Забирает данные от сервера
  - `POST`: Отправляет данные на сервер

Класс `LarekAPI`
Класс наследует класс `Api` и имплементирует интерфейс ILarekAPI, реализует обмен данными с севрером и его моделей данных. принимает список товаров, получить карточку, и отправить заказ

### Методы: ###
  - `getProduct (id: string): Promise<IProduct>`: Отправляет запрос на сервер для получения информации о продукте с указанным идентификатором
  - `getProductList (): Promise<IProduct[]>`: Отправляет запрос на сервер для получения списка всех товаров
  - `orderProduct (order: IOrder): Promise<IOrderResult>`: Отправляет запрос на сервер для оформления заказа с указанными данными

Класс `Model`
Базовый класс классов бизнес-модели, наследуются Product и AppState. класс принимает констурктор: `constructor(data: Partial<T>, protected events: IEvents)` - принимает начальный данные для модели и объект событий для уведомления о изменениях в модели, содержит метод emitChange, для того чтобы вызывать событие из компонента
#### Конструктор:
В конструктор помещается два аргумента: Частичные данные типа `T` и объект событий `IEvents`. Частичные данные `T` представляют структуру данных, которая используется для инициализации экземпляра класса. Объект `IEvents` содержит определения различных событий, которые могут быть сгенерированы и обработаны внутри класса.

### Методы: ###
  - `emitChange`: используется для уведомления других частей приложения о том, что модель была изменена.

Класс `AppState`
Дочерний класс Model.
Имеет поля `catalog: IProduct[]` - хранит данные товара
`order: IOrder[...]` - хранит данные при оформлении заказа
`orderformerror: IOrderFormError = {}` - хранит сообщения об ошибках.

### Методы: ###
  `setStore(items: IProduct[])` - Инициируется данные в массиве, и рендерит карточки на странице
  `toggleOrderedProduct(): string` - Записывает или удаляет id товара в order
  `clearBasket()` - Для чистки корзины
  `getTotalBasketPrice(): number` - Для получения суммы цены всех товаров в корзине
  `validateContacts(): boolean;` - Валидация полей контакты
  `validateDelivery(): boolean;` - Валидация полей заказа
  `refreshOrder(): boolean;` - Очистка товаров после заказа
  `orderformerror: IOrderFormError = {}` - Ошибки полей

Класс `Card`
Класс описывающий данные карточки продукта
#### Элементы:
`_title: HTMLElement` - Элемент наименования заголовка катрочки
`_image: HTMLImageElement` - Элемент изображение продукта
`_category: HTMLElement` - Элемент отображения категории продукта
`_description: HTMLElement` - Элемент Отображение описания продукта
`_price: HTMLElement` - Элемент отображения цены продукта
`_button: HTMLButtonElement` - Элемент кнопки, которая используется для добавления продукта в корзину
`_buttonModal: HTMLButtonElement` - Элемент кнопки, для открытия модального окна

#### Конструктор:
`blockname: string` -  Название карточки
`container: HTMLElement` - Элемент который будет встроен создаваемый блок
`actions?: ICardActions` - Параметр, представляющий объект с действиями, которые могут быть выполнены внутри блока

#### Методы класса:
`set id(value: string)` - Этот метод устанавливает атрибут id в контейнере
`get id(): string` - Этот метод возвращает атрибут id в контейнере, или пустую строку если строка пустая
`set title(value: string)` - Этот метод устанавливает текст заголовка карточки
`get title(): string` - Этот метот возвращавет текст заголовка карточки
`set image(value: string)` - Этот метод устанавливает изображение для карточки
`set description(value: string | string[])` - Этот метод устанавливает описание продукта
`set price(value: string)` - Этот метод устанавливает цену продукта
`set category(value: string)` - Этот метод устаналивает катогорию товара
`get category(): string` - Этот метод возвращает категорию товара

## Компоненты 

Наследники класса `Component` - `Card`, `Modal`, `Basket`, `Page`, `Form`, `Success`. Используются для визуализации компонентов. Каждый из этих компонентов выполняет определенную функцию в пользовательском интерфейсе.

- `Card`: Отображение информации о продукте в виде карточки.
- `Modal`: Отображение всплывающего модального окна с контентом.
- `Basket`: Отображение содержимого корзины покупок.
- `Page`: Управление основными компонентами на странице.
- `Form`: Управление формой для ввода данных.
- `Success`: Отображение модального окна с оповещением об успешном заказе.

## События приложения

При Запуске проекта отрисовывается главный экран Компонент `Page` с продуктами, и кнопкой корзины <<Где вешается и при клике активирует событие `basket:open`>>. Отправляя и забирая данные список товаров с класса LarekAPI, передавая их в класс AppState
которое изменяет список товаров в приложении через событие `catalog:changed`.

Событие `catalog:changed` использует EventEmitter который инициирует карточки . Для этого использует компонент Card где вешается событие `card:selected`.

Событие `card:selected` Использует EventEmitter который при клике на карточку, на которую была кликнута карточка возвращается id карточки, возвращая поля с данными этой карточки,
формирует с помощью компонента Card, в ней же создается событие клика `card:addBasket`. Далее запускает метод render компонент модального окна (Modal) с содержимим карточки

Событие `card:addBasket` использует EventEmitter который при клике добавляет в массив корзины с помощью метода AddProduct в AppState обновляет счетчик на иконке корзины Page добавляет кнопке булево значение disabled, запускает событие `basket:changed`

Событие `basket:changed` использует EventEmitter который запускает колбек. Где с помощью метода fetchProductOnBasket() класса AppState возвращает список товара где и подсчитывает общую стоимость товара в корзине и возыращает это значение, для каждого товара инициируется элемент BasketItem и вешает на него событие слушатель кнопка удаления `delete:product` после нажатия обновляет общую стоимость корзины.

Событие `basket:open` используется EventEmitter при клике запускает метод render компонента Component класса Modal. Класс Basket вешает кнопку 'Оформить' с событием `basket:order`

Событие `basket:order` используется EventEmitter который запускает метод render с содержимым класса Delivery, в конструкторе вешается на кнопки выбора оплаты после инициируется событие `payment:changed`. Так же класс Delivery является потомком Form. Констурктор на родителя вешает на поля

События `order.address:change` (используется для формы с адресом) и `contacts:change` (используется для формы ввода почты и телефона) обрабатываются через EventEmitter, их колбэки обновляют соответствующие поля объекта заказа AppState.order и запускают валидацию формы.

Запускают методы validateDelivery() или validateContacts() для этих форм. Эти методы проверяют заполнение полей данными. Если не все поля заполнены, то делают кнопку для перехода далее недоступной и возращают текст ошибки в события `formDeliveryErrors:change` или `formContactsErrors:change` для этих же форм.

Событие `order:submit` от кнопки "Далее" на форме способа оплаты и адреса обрабатывается EventEmitter. Его колбэк запускает событие `contacts:open`.

Событие `contacts:submit` от кнопки "Оплатить" на форме контактных данных обрабатывается EventEmitter. Его колбэк выполняет следующие действия. Завершает оформление заказа, перенося данные из корзины в заказ через метод completeOrder() класса AppState. Отправляет заказ на сервер и обрабатывает ответ. Создает экземпляр класса Success, передавая информацию об итогах заказа.

Настраивает обработчик на кнопку "За новыми покупками!", который:
- Закрывает модальное окно.
- Очищает корзину.
- Сбрасывает выбранный способ оплаты.
- Генерирует событие 'basket:changed'.
- Вызывает метод render.

## Типы данных

```typescript

export type PaymentMethods = 'card' | 'cash' | '';
export type Categorytype = 'софт-скилл' | 'хард-скилл' | 'другое' | 'кнопка' | 'доп';

/*
  * Интерфейс, указывающий возвращаемые данные карточки
  **/
interface IProduct {
  // ID продукта
  id: string;
  // Категория товара
  categoty: string;
  // Описание товара
  description: string;
  // Ссылка на картинку
  image: string;
  // Название
  title: string;
  // Категория товара
  category: CategoryType;
  // Цена товара, может быть null
  price: number | null;
}

/*
  * Интерфейс, для хранения актуального состояния приложения
    Используется для хранения карточек, корзины, заказа пользователя, ошибок
    в формах
  **/
interface IAppState {
  // Массив карточек товара
  catalog: IProduct[];
  // Информация о заказе при покупке товара
  order: IOrder || null;
  // Корзина с товарами
  basket: IProduct[] | null;
  // Предосмотр товара
  preview: string | null
}

/*
  * Интерфейс, описывающий карточку товара
  **/
interface ICard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  selected: boolean;
}

/*
  * Интерфейс описывающий страницу
  **/
interface IPage {
  // Счётчик товаров в корзине
  counter: number;
  // Массив карточек с товарвми
  store: HTMLElement[];
  // Булево значение отключает прокрутку страницы при открытом окошке
  locked: boolean;
}

/*
  * Интерфейс, описывающий корзину товаров
  **/
interface IBasket {
  // Массив элементов с товаром
  list: HTMLElement[];
  // Общая цена товаров
  price: number;
}

/*
  * Интерфейс, поля для ввода адреса и метот оплаты
  * */
interface IOrderDeliveryForm {
  // Адрес
  address: string;
  // Способ оплаты
  payment: string;
}

/*
  * Интерфейс, полей для ввода контактов
  * */
interface IOrderContacts {
  // Телефон
  phone: string;
  // Почта
  email: string;
}

/**
  * Интерйфейс форм 
  **/
interface IOrderFormError extends IOrderContacts, IOrderDeliveryForm {}


/*
* Интерфейс, описывающий поля заказа товара и объеденяющий поля
**/
interface IOrder extends IOrderFormError {
  // Массив ID купленных товаров
  items: string[];
  // Сумма заказа
  total: number;
}

/*
  * Интерфейс описывающий оформление заказа
  **/
interface IOrderSuccess {
  // ID заказа
  id: string;
  // Сумма заказа
  total: number;
}

/*
  * Тип, описывающий ошибки валидации форм
  **/
type FormErrors = Partial<Record<keyof IOrder, string>>;

```