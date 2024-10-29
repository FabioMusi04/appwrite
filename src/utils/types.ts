export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isDiscounted: boolean;
    discount: number;
    stock: number;
}