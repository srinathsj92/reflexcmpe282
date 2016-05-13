export interface ICustomer {
    id?: number;
    customerNumber?: string;
    lastName?: string;
    gender?: string;
    address?: string;
    city?: string;
    state?: IState;
    orderTotal?: number,

    customerNumber: number,
    customerName: string,
    contactLastName: string,
    contactFirstName: string,
    phone: string,
    addressLine1: string,
    addressLine2?: string,
    city: string,
    state?: string,
    postalCode?:number,
    country: string,
    salesRepEmployeeNumber: number,
    creditLimit:number

}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    customerId: number;
    orderItems: IOrderItem[];
}

export interface IOrderItem {
    id: number;
    productName: string;
    itemCost: number;
}