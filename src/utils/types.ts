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

export interface User {
    id: string;
    name: string;
    email: string;
}