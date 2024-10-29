import { Client, Account, Databases, ID, Query } from 'appwrite';

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

export async function GetUsers(page: number, limit: number) {
    const response = {
        users: [
        ],
    }

    return response.users;
}