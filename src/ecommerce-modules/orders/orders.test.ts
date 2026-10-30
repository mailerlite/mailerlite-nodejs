import { describe, it, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    ListOrdersResponse,
    SingleOrderResponse
} from "./orders.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("E-commerce orders", () => {

    let shopId: string;
    let productId: string;

    beforeAll(async () => {
        const response = await mailerlite.ecommerce.shops.create({
            name: "Test shop nodejs orders",
            url: "https://shop.example.com",
            currency: "EUR"
        });
        shopId = response.data.data.id;

        const product = await mailerlite.ecommerce.products.create(shopId, {
            name: "Test product nodejs orders",
            price: 19.99
        });
        productId = product.data.data.id;
    });

    afterAll(async () => {
        await mailerlite.ecommerce.shops.delete(shopId);
    });

    let orderId: string;

    it("Create an order", async () => {
        try {
            const response = await mailerlite.ecommerce.orders.create(shopId, { customer: { email: "customer-orders@example.com", create_subscriber: false }, cart: { items: [{ ecommerce_product_id: productId, quantity: 1, price: 19.99 }] } });

            expect(response).not.toBeNull();
            expect(response.data.data.id).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleOrderResponse>()

            orderId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get orders", async () => {
        try {
            const response = await mailerlite.ecommerce.orders.get(shopId, { filter: { status: "pending" } });

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListOrdersResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Fetch an order", async () => {
        try {
            const response = await mailerlite.ecommerce.orders.find(shopId, orderId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleOrderResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update an order", async () => {
        try {
            const response = await mailerlite.ecommerce.orders.update(shopId, orderId, { status: "complete" });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleOrderResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete an order", async () => {
        try {
            const response = await mailerlite.ecommerce.orders.delete(shopId, orderId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleOrderResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
