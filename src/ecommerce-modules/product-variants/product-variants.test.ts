import { describe, it, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    ListProductVariantsResponse,
    ProductWithVariantsResponse
} from "./product-variants.types";
import {getRandomInt, handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("E-commerce product variants", () => {

    let shopId: string;
    let productId: string;

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
    });

    afterAll(async () => {
        await mailerlite.ecommerce.shops.delete(shopId);
    });

    let variantId: string;

    it("Create product variants", async () => {
        try {
            const response = await mailerlite.ecommerce.productVariants.create(shopId, productId, [{ name: "Large", attributes: { size: "L" }, resource_id: `variant-${getRandomInt()}` }]);

            expect(response).not.toBeNull();
            expect(response.data.data.variants[0].id).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<ProductWithVariantsResponse>()

            variantId = response.data.data.variants[0].id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get product variants", async () => {
        try {
            const response = await mailerlite.ecommerce.productVariants.get(shopId, productId);

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListProductVariantsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a product variant", async () => {
        try {
            const response = await mailerlite.ecommerce.productVariants.update(shopId, productId, variantId, { name: "Extra large", attributes: { size: "XL" } });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<ProductWithVariantsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete a product variant", async () => {
        try {
            const response = await mailerlite.ecommerce.productVariants.delete(shopId, productId, variantId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<ProductWithVariantsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
