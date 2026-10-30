import { describe, it, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    ListCartsResponse,
    SingleCartResponse
} from "./carts.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("E-commerce carts", () => {

    let shopId: string;
    let productId: string;
    let cartId: string;

    beforeAll(async () => {
        const response = await mailerlite.ecommerce.shops.create({
            name: "Test shop nodejs carts",
            url: "https://shop.example.com",
            currency: "EUR"
        });
        shopId = response.data.data.id;

        const product = await mailerlite.ecommerce.products.create(shopId, {
            name: "Test product nodejs carts",
            price: 19.99
        });
        productId = product.data.data.id;

        const order = await mailerlite.ecommerce.orders.create(shopId, {
            customer: { email: "customer-carts@example.com", create_subscriber: false },
            cart: { items: [{ ecommerce_product_id: productId, quantity: 1, price: 19.99 }] }
        });
        cartId = order.data.data.cart.id;
    });

    afterAll(async () => {
        await mailerlite.ecommerce.shops.delete(shopId);
    });

    it("Get carts", async () => {
        try {
            const response = await mailerlite.ecommerce.carts.get(shopId, { limit: 10 });

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListCartsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Fetch a cart", async () => {
        try {
            const response = await mailerlite.ecommerce.carts.find(shopId, cartId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCartResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a cart", async () => {
        try {
            const response = await mailerlite.ecommerce.carts.update(shopId, cartId, { checkout_url: "https://shop.example.com/cart" });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCartResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
