import { describe, it, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    ListProductsResponse,
    SingleProductResponse
} from "./products.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("E-commerce products", () => {

    let shopId: string;

    beforeAll(async () => {
        const response = await mailerlite.ecommerce.shops.create({
            name: "Test shop nodejs products",
            url: "https://shop.example.com",
            currency: "EUR"
        });
        shopId = response.data.data.id;
    });

    afterAll(async () => {
        await mailerlite.ecommerce.shops.delete(shopId);
    });

    let productId: string;

    it("Create a product", async () => {
        try {
            const response = await mailerlite.ecommerce.products.create(shopId, { name: "Test product nodejs products", price: 19.99 });

            expect(response).not.toBeNull();
            expect(response.data.data.id).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleProductResponse>()

            productId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get products", async () => {
        try {
            const response = await mailerlite.ecommerce.products.get(shopId, { filter: { enabled: true }, sort: "-created_at" });

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListProductsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Fetch a product", async () => {
        try {
            const response = await mailerlite.ecommerce.products.find(shopId, productId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleProductResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a product", async () => {
        try {
            const response = await mailerlite.ecommerce.products.update(shopId, productId, { price: 24.99 });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleProductResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Enable or disable a product", async () => {
        try {
            const response = await mailerlite.ecommerce.products.changeStatus(shopId, productId, { status: false });

            expect(response).not.toBeNull();
            expect(response.data.data.enabled).toBe(false);
            expectTypeOf(response.data).toEqualTypeOf<SingleProductResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete a product", async () => {
        try {
            const response = await mailerlite.ecommerce.products.delete(shopId, productId);

            expect(response).not.toBeNull();
            expect(response.status).toBe(204);
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
