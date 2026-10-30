import { describe, it, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    ImportCategoriesResponse,
    ImportCustomersResponse,
    ImportProductsResponse,
    ImportOrdersResponse
} from "./import.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("E-commerce import", () => {

    let shopId: string;

    beforeAll(async () => {
        const response = await mailerlite.ecommerce.shops.create({
            name: "Test shop nodejs import",
            url: "https://shop.example.com",
            currency: "EUR"
        });
        shopId = response.data.data.id;
    });

    afterAll(async () => {
        await mailerlite.ecommerce.shops.delete(shopId);
    });

    it("Categories import", async () => {
        try {
            const response = await mailerlite.ecommerce.import.importCategories(shopId, [{ name: "Test category nodejs import" }]);

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ImportCategoriesResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Customers import", async () => {
        try {
            const response = await mailerlite.ecommerce.import.importCustomers(shopId, [{ email: "customer-import@example.com" }]);

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ImportCustomersResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Products import", async () => {
        try {
            const response = await mailerlite.ecommerce.import.importProducts(shopId, [{ name: "Test product nodejs import", price: 19.99 }]);

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ImportProductsResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Orders import", async () => {
        try {
            const products = await mailerlite.ecommerce.import.importProducts(shopId, [{ name: "Test product nodejs import orders", price: 19.99 }]);
            const response = await mailerlite.ecommerce.import.importOrders(shopId, {
                orders: [{
                    customer: { email: "customer-import@example.com", create_subscriber: false },
                    cart: { items: [{ ecommerce_product_id: products.data.data[0].id, quantity: 1 }] }
                }]
            });

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ImportOrdersResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
