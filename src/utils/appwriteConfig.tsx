import { Client, Account, Databases, ID, Query } from 'appwrite';
import { CartItem } from './types';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export { ID } from 'appwrite';

const databases = new Databases(client);

const DataBaseNames = {
    ECOMMERCE: import.meta.env.VITE_APPWRITE_ECOMMERCE_DB_ID as string,
};
const DataBaseCollections = {
    PRODUCTS: import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION as string,
    CARTS: import.meta.env.VITE_APPWRITE_CART_COLLECTION as string,
};

export async function GenerateProducts() {
    for (let i = 0; i < 100; i++) {
        await databases.createDocument(
            DataBaseNames.ECOMMERCE,
            DataBaseCollections.PRODUCTS,
            ID.unique(),
            {
                name: `Product ${i}`,
                description: `This is a description for product ${i}`,
                price: Math.floor(Math.random() * 1000),
                imageUrl: 'https://placehold.co/400',
                isDiscounted: Math.random() > 0.5,
                discount: Math.floor(Math.random() * 100),
                stock: Math.floor(Math.random() * 100),
            });
    }
}

export async function GetProducts(page: number, limit: number) {
    const response = await databases.listDocuments(
        DataBaseNames.ECOMMERCE,
        DataBaseCollections.PRODUCTS,
        [
            Query.limit(limit),
            Query.offset((page - 1) * limit),
        ],
    );

    return response.documents;
}

export async function GetProduct(id: string) {
    const response = await databases.getDocument(
        DataBaseNames.ECOMMERCE,
        DataBaseCollections.PRODUCTS,
        id,
    );

    return response;
}

export async function GetProductsWithSearch(page: number, limit: number, search: string) {
    const response = await databases.listDocuments(
        DataBaseNames.ECOMMERCE,
        DataBaseCollections.PRODUCTS,
        [
            Query.limit(limit),
            Query.offset((page - 1) * limit),
            Query.search('name', search),
        ],
    );

    

    return response.documents;
}

export async function GetUsers(page: number, limit: number) {
    const response = {
        users: [
        ],
    }

    return response.users;
}


export async function GetCart() {
    const user = await account.get();
    if (!user) return null;

    const response = await databases.listDocuments(
        DataBaseNames.ECOMMERCE,
        DataBaseCollections.CARTS,
        [
            Query.equal('user', user.$id),
        ],
    );

    if (response.total === 0) {
        const cart = await databases.createDocument(
            DataBaseNames.ECOMMERCE,
            DataBaseCollections.CARTS,
            ID.unique(),
            {
                items: [],
                user: user.$id,
            },
        );

        console.log ('Cart:', cart);

        return cart;
    }

    return response.documents[0];
}

export async function UpdateCart(productId: string | undefined, quantity: number, price: number) {
    if (!productId) return;

    const cart = await GetCart();
    if (!cart) return;

    const itemIndex = cart.items.findIndex((item: CartItem) => {
        console.log(item.product.$id, productId);
        return item.product.$id === productId;
    });
    if (quantity > 0) {
        if (itemIndex === -1) {
            cart.items.push({
                product: await GetProduct(productId),
                quantity,
                price: price,
                cart: cart.$id,
            });
        } else {
            cart.items[itemIndex].quantity += quantity;
        }
    } else {
        cart.items.splice(itemIndex, 1);
    }

    await databases.updateDocument(
        DataBaseNames.ECOMMERCE,
        DataBaseCollections.CARTS,
        cart.$id,
        {
            items: cart.items,
        },
    );
}

export async function CreateOrder() {
    const cart = await GetCart();
    if (!cart) return;

    const order = await databases.createDocument(
        DataBaseNames.ECOMMERCE,
        'orders',
        ID.unique(),
        {
            items: cart.items,
            user: cart.user,
        },
    );

    return order;
}
