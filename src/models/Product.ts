import { ProductType } from "./ProductType";

export interface Product {
    id: number;
    name: string;
    barcode: string;
    description: string;
    price: number;
    productType: ProductType;
    createdAt: string;
    updatedAt: string;
}