import { describe, it, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import "dotenv/config";
import MailerLite from '../../index';
import {
    ListCustomersResponse,
    SingleCustomerResponse
} from "./customers.types";
import {handleCatchedError} from "../../utils/helpers";

const MAILERLITE_API_KEY = process.env.API_KEY as string;

if (!MAILERLITE_API_KEY)
    throw "No MailerLite API key found in environment variables";

const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: "http://localhost:9090",
});

describe("E-commerce customers", () => {

    let shopId: string;

    beforeAll(async () => {
        const response = await mailerlite.ecommerce.shops.create({
            name: "Test shop nodejs customers",
            url: "https://shop.example.com",
            currency: "EUR"
        });
        shopId = response.data.data.id;
    });

    afterAll(async () => {
        await mailerlite.ecommerce.shops.delete(shopId);
    });

    let customerId: string;
    const email = "customer-customers@example.com";

    it("Create a customer", async () => {
        try {
            const response = await mailerlite.ecommerce.customers.create(shopId, { email: email, create_subscriber: false });

            expect(response).not.toBeNull();
            expect(response.data.data.id).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCustomerResponse>()

            customerId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get customers", async () => {
        try {
            const response = await mailerlite.ecommerce.customers.get(shopId, { filter: { email: email } });

            expect(response).not.toBeNull();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListCustomersResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Fetch a customer", async () => {
        try {
            const response = await mailerlite.ecommerce.customers.find(shopId, customerId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCustomerResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a customer", async () => {
        try {
            const response = await mailerlite.ecommerce.customers.update(shopId, customerId, { accepts_marketing: true });

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCustomerResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete a customer", async () => {
        try {
            const response = await mailerlite.ecommerce.customers.delete(shopId, customerId);

            expect(response).not.toBeNull();
            expect(response.data.data).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleCustomerResponse>()
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
