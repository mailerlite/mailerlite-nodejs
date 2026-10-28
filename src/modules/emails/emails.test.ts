import { describe, it, expect, expectTypeOf } from "vitest";
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
    EmailBlockObject,
} from "./emails.types";

import { getRandomInt, handleCatchedError } from "../../utils/helpers";

if (!process.env.API_KEY)
    throw "No MailerLite API key found in environment variables";

// A draft campaign email built with the simple editor on the recording account.
// Its ID is part of every recorded URL, so replay only works with the recorded value.
const INLINE_EMAIL_ID = process.env.INLINE_EMAIL_ID || "202022897780262459";

const mailerlite = new MailerLite({
    api_key: process.env.API_KEY as string,
    base_path: "http://localhost:9090",
});

/*
 * Tapes are matched on method + URL only (the body is ignored), so every call in this file
 * uses a unique method + URL. IDs and etags read from responses replay identically.
 */

describe("Emails", () => {

    // One etag covers the whole email: every write takes the latest one and returns the next.
    let etag: string;
    let createdBlockId: string;
    let createdVersionId: string;
    // A pre-existing block (not the title, not the created one), used for the stale-etag test.
    let otherBlock: EmailBlockObject | undefined;

    it("Find an email", async () => {
        try {
            const response = await mailerlite.emails.find(INLINE_EMAIL_ID);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).toBe(INLINE_EMAIL_ID);
            expect(typeof response.data.etag).toBe("string");
            expect(Array.isArray(response.data.data.blocks)).toBeTruthy();
            expect(response.data.data.settings).toBeDefined();
            expectTypeOf(response.data).toEqualTypeOf<SingleEmailDocumentResponse>();

            etag = response.data.etag;
            // Assumes the fixture email has at least one non-title block (e.g. a paragraph).
            otherBlock = response.data.data.blocks.find((block) => block.type !== "title");
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
            const response = await mailerlite.emails.createBlock(INLINE_EMAIL_ID, params, {
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
            const response = await mailerlite.emails.findBlock(INLINE_EMAIL_ID, createdBlockId);

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
            const response = await mailerlite.emails.updateBlock(INLINE_EMAIL_ID, createdBlockId, params);

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
            const response = await mailerlite.emails.moveBlock(INLINE_EMAIL_ID, createdBlockId, params);

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

    it("Update email settings", async () => {
        const params: UpdateEmailSettingsParams = {
            etag,
            brand: { background_color: "#ffffff" },
        };

        try {
            const response = await mailerlite.emails.updateSettings(INLINE_EMAIL_ID, params);

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
            const response = await mailerlite.emails.createVersion(INLINE_EMAIL_ID);

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
            const response = await mailerlite.emails.getVersions(INLINE_EMAIL_ID, params);

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
            // Restores the version saved above, which already contains the created block, so that
            // block survives (blocks come back under their original IDs) and can be deleted next.
            // Assumes restoring the version the email is currently on is allowed (the API saves the
            // current state as a new version first) rather than refused as a no-op.
            const response = await mailerlite.emails.restoreVersion(INLINE_EMAIL_ID, createdVersionId, params);

            expect(response).not.toBeNull();
            expect(response.data).toBeDefined();
            expect(response.data.data).toBeDefined();
            expect(response.data.data.id).toBe(INLINE_EMAIL_ID);
            expect(response.data.data.blocks.some((block) => block.id === createdBlockId)).toBeTruthy();
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
            const response = await mailerlite.emails.deleteBlock(INLINE_EMAIL_ID, createdBlockId, params);

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
            const response = await mailerlite.emails.getHtml(INLINE_EMAIL_ID);

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
            const response = await mailerlite.emails.saveAsTemplate(INLINE_EMAIL_ID, params);

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
        // Targets a different block than the happy-path update so the PATCH URL (and tape) is unique.
        expect(otherBlock, "The fixture email needs a non-title block").toBeDefined();
        const block = otherBlock as EmailBlockObject;
        expect(block.id).not.toBe(createdBlockId);

        const params: UpdateEmailBlockParams = {
            etag: "1", // stale: the email has been written many times since
            editor_content: block.editor_content,
        };

        let caught: unknown;
        try {
            await mailerlite.emails.updateBlock(INLINE_EMAIL_ID, block.id, params);
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

describe("Emails validation", () => {

    // Only one validateBlock test: tapes match on method + URL and ignore the body, so a second
    // POST /api/emails/blocks/validate would replay this response. The invalid case is the more useful one.
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
            const response = await mailerlite.emails.validateSettings(INLINE_EMAIL_ID, params);

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
