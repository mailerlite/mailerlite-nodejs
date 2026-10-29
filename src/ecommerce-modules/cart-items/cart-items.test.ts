import { describe, it, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    ListCartItemsResponse,
    SingleCartItemResponse
} from "./cart-items.types";
import {getRandomInt, handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("E-commerce cart items", () => {

    let shopId: string;
    let productId: string;
    let cartId: string;

    beforeAll(async () => {
        const response = await mailerlite.ecommerce.shops.create({
            name: `Test shop nodejs ${getRandomInt()}`,
            url: "https://shop.example.com",
            currency: "EUR"
        });
        shopId = response.data.data.id;

        const product = await mailerlite.ecommerce.products.create(shopId, {
            name: `Test product nodejs ${getRandomInt()}`,
            price: 19.99
        });
        productId = product.data.data.id;

        const order = await mailerlite.ecommerce.orders.create(shopId, {
            customer: { email: `customer-${getRandomInt()}@example.com`, create_subscriber: false },
            cart: { items: [{ ecommerce_product_id: productId, quantity: 1, price: 19.99 }] }
        });
        cartId = order.data.data.cart.id;
    });

    afterAll(async () => {
        await mailerlite.ecommerce.shops.delete(shopId);
    });

    let itemId: string;

    it("Add a cart item", async () => {
        try {
            const response = await mailerlite.ecommerce.cartItems.create(shopId, cartId, { ecommerce_product_id: productId, quantity: 1 });

            expect(response).not.toBeNull();
            expect(response.data.data.id).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCartItemResponse>()

            itemId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get the items of a cart", async () => {
        try {
            const response = await mailerlite.ecommerce.cartItems.get(shopId, cartId, { limit: 10 });

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListCartItemsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Fetch a cart item", async () => {
        try {
            const response = await mailerlite.ecommerce.cartItems.find(shopId, cartId, itemId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCartItemResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a cart item", async () => {
        try {
            const response = await mailerlite.ecommerce.cartItems.update(shopId, cartId, itemId, { quantity: 2 });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCartItemResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete a cart item", async () => {
        try {
            const response = await mailerlite.ecommerce.cartItems.delete(shopId, cartId, itemId);

            expect(response).not.toBeNull();
            expect(response.status).toBe(204);
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
