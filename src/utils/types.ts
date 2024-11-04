export interface Product {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isDiscounted: boolean;
    discount: number;
    stock: number;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}

export interface ProductIns {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isDiscounted: boolean;
    discount: number;
    stock: number;
}

export interface Cart {
    items: CartItem[];
    user: User;

    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
    price: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Order {
    user: string;
    products: Product[];
    status: string;
    price: number;

    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}