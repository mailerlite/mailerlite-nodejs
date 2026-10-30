import { describe, it, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import "dotenv/config";
import axios from "axios";
import MailerLite from '../../index';
import {
    SingleEmailDocumentResponse,
    EmailHtmlResponse,
    SingleEmailBlockResponse,
    CreateEmailBlockParams,
    UpdateEmailBlockParams,
    MoveEmailBlockParams,
    EmailEtagParams,
    DeleteEmailBlockResponse,
    UpdateEmailSettingsParams,
    UpdateEmailSettingsResponse,
    SingleEmailVersionResponse,
    GetEmailVersionsParams,
    ListEmailVersionsResponse,
    SaveEmailAsTemplateParams,
    SingleEmailTemplateResponse,
    ValidateEmailBlockParams,
    ValidateEmailSettingsParams,
    EmailValidationResponse,
    EmailVersionConflictError,
} from "./emails.types";

import { getRandomInt, handleCatchedError } from "../../utils/helpers";

if (!process.env.API_KEY)
    throw "No MailerLite API key found in environment variables";
if (!process.env.VERIFIED_EMAIL)
    throw "No MailerLite verified email found in environment variables";

const MAILERLITE_VERIFIED_EMAIL = process.env.VERIFIED_EMAIL as string;

const mailerlite = new MailerLite({
    api_key: process.env.API_KEY as string,
    base_path: "http://localhost:9090",
});

// The email under test is the blank email of a simple editor campaign created below, so no
// pre-existing ID is needed. Both IDs come from tapes on replay, so they are identical on every run.
let campaignId: string | undefined;
let emailId: string;

beforeAll(async () => {
    try {
        const response = await mailerlite.campaigns.create({
            name: `Test emails module nodejs ${getRandomInt()}`,
            type: "regular",
            emails: [{
                subject: "Dummy subject",
                from_name: "Dummy Testerson",
                from: MAILERLITE_VERIFIED_EMAIL,
                editor: "simple",
            }],
        });

        campaignId = response.data.data.id;
        emailId = response.data.data.emails[0].id;
    } catch (error) {
        handleCatchedError(error);
    }
});

afterAll(async () => {
    if (campaignId) {
        await mailerlite.campaigns.delete(campaignId);
    }
});

/*
 * Tapes under /api/emails/ are matched on method + URL + a deep-equal JSON body (see bodyMatcher in
 * setup-teardown-hooks.ts), so two calls with the same method + URL need different bodies, otherwise
 * they replay the same tape. IDs and etags read from responses replay identically.
 * The campaign creation above is matched on its editor and name (digits ignored).
 */

describe("Emails", () => {

    // One etag covers the whole email: every write takes the latest one and returns the next.
    let etag: string;
    let createdBlockId: string;
    // A second block, only used for the stale-etag test.
    let staleTestBlockId: string;
    let createdVersionId: string;

    it("Find an email", async () => {
        try {
            const response = await mailerlite.emails.find(emailId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).toBe(emailId);
            expect(typeof response.data.etag).toBe("string");
            expect(Array.isArray(response.data.data.blocks)).toBeTruthy();
            expect(response.data.data.settings).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleEmailDocumentResponse>();

            etag = response.data.etag;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Create a block", async () => {
        const params: CreateEmailBlockParams = {
            etag,
            type: "paragraph",
            // Assumes a paragraph block's document holds its text nodes directly in `content`.
            editor_content: {
                content: [{ type: "text", text: "SDK test paragraph" }],
            },
            placement: { position: "end" },
        };

        try {
            const response = await mailerlite.emails.createBlock(emailId, params, {
                idempotencyKey: `sdk-test-create-block-${getRandomInt()}`,
            });

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).toBeTruthy();
            expect(response.data.data.type).toBe("paragraph");
            expect(response.data.data.placement).toBeDefined();
            // Inserted at the end, so nothing comes after it.
            expect(response.data.data.placement.before).toBeNull();
            expect(typeof response.data.etag).toBe("string");
            expectTypeOf(response.data).toEqualTypeOf<SingleEmailBlockResponse>();

            createdBlockId = response.data.data.id;
            etag = response.data.etag;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Find a block", async () => {
        try {
            const response = await mailerlite.emails.findBlock(emailId, createdBlockId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).toBe(createdBlockId);
            expect(response.data.data.editor_content).toBeDefined();
            expect(response.data.data.placement).toBeDefined();
            expect(typeof response.data.etag).toBe("string");
            expectTypeOf(response.data).toEqualTypeOf<SingleEmailBlockResponse>();
            // A read does not change the etag, so keep the one from the last write.
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update a block", async () => {
        const params: UpdateEmailBlockParams = {
            etag,
            editor_content: {
                content: [{ type: "text", text: "SDK test paragraph updated" }],
            },
        };

        try {
            const response = await mailerlite.emails.updateBlock(emailId, createdBlockId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).toBe(createdBlockId);
            expect(response.data.data.editor_content).toBeDefined();
            expect(response.data.data.placement).toBeDefined();
            expect(typeof response.data.etag).toBe("string");
            expectTypeOf(response.data).toEqualTypeOf<SingleEmailBlockResponse>();

            etag = response.data.etag;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Move a block", async () => {
        const params: MoveEmailBlockParams = {
            etag,
            placement: { position: "start" },
        };

        try {
            const response = await mailerlite.emails.moveBlock(emailId, createdBlockId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).toBe(createdBlockId);
            expect(response.data.data.placement).toBeDefined();
            // Moved to the start, so nothing comes before it.
            expect(response.data.data.placement.after).toBeNull();
            expect(typeof response.data.etag).toBe("string");
            expectTypeOf(response.data).toEqualTypeOf<SingleEmailBlockResponse>();

            etag = response.data.etag;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Create a second block", async () => {
        // Only here for the stale-etag test at the end. Its text differs from the first block's, so
        // this POST (same method + URL) has its own tape.
        const params: CreateEmailBlockParams = {
            etag,
            type: "paragraph",
            editor_content: {
                content: [{ type: "text", text: "SDK test paragraph for stale etag" }],
            },
            placement: { position: "end" },
        };

        try {
            const response = await mailerlite.emails.createBlock(emailId, params, {
                idempotencyKey: `sdk-test-create-second-block-${getRandomInt()}`,
            });

            expect(response).not.toBeNull();
            expect(response.data.data.id).toBeTruthy();
            expect(response.data.data.id).not.toBe(createdBlockId);
            expect(typeof response.data.etag).toBe("string");
            expectTypeOf(response.data).toEqualTypeOf<SingleEmailBlockResponse>();

            staleTestBlockId = response.data.data.id;
            etag = response.data.etag;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Update email settings", async () => {
        const params: UpdateEmailSettingsParams = {
            etag,
            brand: { background_color: "#ffffff" },
        };

        try {
            const response = await mailerlite.emails.updateSettings(emailId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.brand).toBeDefined();
            expect(response.data.data.footer).toBeDefined();
            expect(typeof response.data.etag).toBe("string");
            expectTypeOf(response.data).toEqualTypeOf<UpdateEmailSettingsResponse>();

            etag = response.data.etag;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Create a version", async () => {
        try {
            // Takes no etag and returns none. Assumes saving a version does not bump the email's
            // etag; if it does, the restore below gets a 409 and must re-read the email first.
            const response = await mailerlite.emails.createVersion(emailId);

            expect(response).not.toBeNull();
            // 201 when a version was saved, 200 when nothing changed since the last one.
            expect([200, 201]).toContain(response.status);
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).toBeTruthy();
            expect(typeof response.data.data.current).toBe("boolean");
            expectTypeOf(response.data).toEqualTypeOf<SingleEmailVersionResponse>();

            createdVersionId = response.data.data.id;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("List versions", async () => {
        const params: GetEmailVersionsParams = {
            limit: 10,
            page: 1,
        };

        try {
            const response = await mailerlite.emails.getVersions(emailId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data.data)).toBeTruthy();
            expect(response.data.links).toBeDefined();
            expect(response.data.meta).toBeDefined();
            // Assumes versions are listed newest first, so the one just saved is on the first page.
            expect(response.data.data.some((version) => version.id === createdVersionId)).toBeTruthy();
            expectTypeOf(response.data).toEqualTypeOf<ListEmailVersionsResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Restore a version", async () => {
        const params: EmailEtagParams = { etag };

        try {
            // Restores the version saved above, which already contains both created blocks, so they
            // survive (blocks come back under their original IDs) and the first can be deleted next.
            // Assumes restoring the version the email is currently on is allowed (the API saves the
            // current state as a new version first) rather than refused as a no-op.
            const response = await mailerlite.emails.restoreVersion(emailId, createdVersionId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).toBe(emailId);
            expect(response.data.data.blocks.some((block) => block.id === createdBlockId)).toBeTruthy();
            expect(response.data.data.blocks.some((block) => block.id === staleTestBlockId)).toBeTruthy();
            expect(typeof response.data.etag).toBe("string");
            expectTypeOf(response.data).toEqualTypeOf<SingleEmailDocumentResponse>();

            etag = response.data.etag;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Delete a block", async () => {
        const params: EmailEtagParams = { etag };

        try {
            const response = await mailerlite.emails.deleteBlock(emailId, createdBlockId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            // DELETE returns only the new etag, no `data`.
            expect(typeof response.data.etag).toBe("string");
            expectTypeOf(response.data).toEqualTypeOf<DeleteEmailBlockResponse>();

            etag = response.data.etag;
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Get email HTML", async () => {
        try {
            const response = await mailerlite.emails.getHtml(emailId);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(typeof response.data.data.html).toBe("string");
            expect(response.data.data.html.length).toBeGreaterThan(0);
            expect(typeof response.data.etag).toBe("string");
            expectTypeOf(response.data).toEqualTypeOf<EmailHtmlResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Save an email as a template", async () => {
        const params: SaveEmailAsTemplateParams = {
            name: "SDK test template",
        };

        try {
            const response = await mailerlite.emails.saveAsTemplate(emailId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).toBeTruthy();
            expect(response.data.data.name).toBe(params.name);
            expectTypeOf(response.data).toEqualTypeOf<SingleEmailTemplateResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it("Reject a block update with a stale etag", async () => {
        // Targets the second block, not the one from the happy-path update, so the PATCH URL (and tape) is unique.
        const params: UpdateEmailBlockParams = {
            etag: "1", // stale: the email has been written many times since
            editor_content: {
                content: [{ type: "text", text: "SDK test paragraph for stale etag" }],
            },
        };

        let caught: unknown;
        try {
            await mailerlite.emails.updateBlock(emailId, staleTestBlockId, params);
        } catch (error) {
            caught = error;
        }

        // Caught here rather than via handleCatchedError, which rethrows only the body and drops the status.
        expect(axios.isAxiosError(caught)).toBeTruthy();
        if (!axios.isAxiosError<EmailVersionConflictError>(caught)) return;

        expect(caught.response?.status).toBe(409);
        const body = caught.response?.data as EmailVersionConflictError;
        expect(body.code).toBe("version_conflict");
        expect(typeof body.etag).toBe("string");
        expect(typeof body.message).toBe("string");
    });
});

describe("Emails ID validation", () => {

    // Throws before any request, so no tapes are involved.
    it("Reject IDs that are not only digits", () => {
        expect(() => mailerlite.emails.find(`${emailId}/html`)).toThrow("ID must contain only digits");
        expect(() => mailerlite.emails.findBlock(emailId, "1/../../123")).toThrow("ID must contain only digits");
        expect(() => mailerlite.emails.restoreVersion(emailId, "1%2F2", { etag: "1" })).toThrow("ID must contain only digits");
    });
});

describe("Emails validation", () => {

    // Only one validateBlock test: the tape is matched on the exact body, so another case would need its own
    // recording of POST /api/emails/blocks/validate. The invalid case is the more useful one.
    it.concurrent("Validate an invalid block", async () => {
        const params: ValidateEmailBlockParams = {
            type: "paragraph",
            editor_content: {
                content: [{
                    type: "text",
                    text: "Unsafe link",
                    marks: [{ type: "link", attrs: { href: "javascript:alert(1)" } }],
                }],
            },
        };

        try {
            const response = await mailerlite.emails.validateBlock(params);

            expect(response).not.toBeNull();
            // Rule failures come back as 200 with `valid: false`, not a 422.
            expect(response.status).toBe(200);
            expect(response.data.valid).toBe(false);
            expect(Object.keys(response.data.errors).length).toBeGreaterThan(0);
            expect(response.data.schema).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<EmailValidationResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });

    it.concurrent("Validate email settings", async () => {
        const params: ValidateEmailSettingsParams = {
            brand: { background_color: "#ffffff" },
        };

        try {
            const response = await mailerlite.emails.validateSettings(emailId, params);

            expect(response).not.toBeNull();
            // Not wrapped in `data`.
            expect(response.data).toBeDefined();
            expect(response.data.valid).toBe(true);
            expect(response.data.errors).toBeDefined();
            expect(response.data.schema).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<EmailValidationResponse>();
        } catch (error) {
            handleCatchedError(error);
        }
    });
});
