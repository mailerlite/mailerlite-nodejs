import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    EmailsInterface,
    EmailWriteOptions,
    SingleEmailDocumentResponse,
    EmailHtmlResponse,
    SingleEmailBlockResponse,
    CreateEmailBlockParams,
    UpdateEmailBlockParams,
    EmailEtagParams,
    DeleteEmailBlockResponse,
    MoveEmailBlockParams,
    ValidateEmailBlockParams,
    EmailValidationResponse,
    UpdateEmailSettingsParams,
    UpdateEmailSettingsResponse,
    ValidateEmailSettingsParams,
    SaveEmailAsTemplateParams,
    SingleEmailTemplateResponse,
    GetEmailVersionsParams,
    ListEmailVersionsResponse,
    SingleEmailVersionResponse
} from './emails.types.js';

export default class Emails implements EmailsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get a simple-editor email (settings and top-level blocks). The response carries the `etag` needed for the next write.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     */
    public find(email_id: string): Promise<AxiosResponse<SingleEmailDocumentResponse>> {

        validateId(email_id);

        return request(`/api/emails/${email_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Get a preview of the email's HTML. A 503 is temporary, so retry.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     */
    public getHtml(email_id: string): Promise<AxiosResponse<EmailHtmlResponse>> {

        validateId(email_id);

        return request(`/api/emails/${email_id}/html`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Get a single block of an email, with its placement
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     * @block_id {String} - Block ID
     */
    public findBlock(email_id: string, block_id: string): Promise<AxiosResponse<SingleEmailBlockResponse>> {

        validateId(email_id);
        validateId(block_id);

        return request(`/api/emails/${email_id}/blocks/${block_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Insert a block into an email. Requires the latest `etag` in the body; use the returned `etag` for the next write.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     * @requestBody {Object} - Block data for create (incl. `etag`)
     * @options {Object} - Optional request options (`idempotencyKey`)
     */
    public createBlock(email_id: string, requestBody: CreateEmailBlockParams, options?: EmailWriteOptions): Promise<AxiosResponse<SingleEmailBlockResponse, CreateEmailBlockParams>> {

        validateId(email_id);

        return request(`/api/emails/${email_id}/blocks`, {
            method: "POST",
            body: requestBody,
            headers: idempotencyHeaders(options)
        }, this.config);
    }

    /**
     * @description Update a block's content. Replaces `editor_content` whole. Requires the latest `etag` in the body; use the returned `etag` for the next write.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     * @block_id {String} - Block ID
     * @requestBody {Object} - Block data for update (incl. `etag`)
     * @options {Object} - Optional request options (`idempotencyKey`)
     */
    public updateBlock(email_id: string, block_id: string, requestBody: UpdateEmailBlockParams, options?: EmailWriteOptions): Promise<AxiosResponse<SingleEmailBlockResponse, UpdateEmailBlockParams>> {

        validateId(email_id);
        validateId(block_id);

        return request(`/api/emails/${email_id}/blocks/${block_id}`, {
            method: "PATCH",
            body: requestBody,
            headers: idempotencyHeaders(options)
        }, this.config);
    }

    /**
     * @description Delete a block (and the blocks nested inside it). Requires the latest `etag` in the body; the response contains only the new `etag`.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     * @block_id {String} - Block ID
     * @requestBody {Object} - `{ etag }`
     * @options {Object} - Optional request options (`idempotencyKey`)
     */
    public deleteBlock(email_id: string, block_id: string, requestBody: EmailEtagParams, options?: EmailWriteOptions): Promise<AxiosResponse<DeleteEmailBlockResponse, EmailEtagParams>> {

        validateId(email_id);
        validateId(block_id);

        return request(`/api/emails/${email_id}/blocks/${block_id}`, {
            method: "DELETE",
            body: requestBody,
            headers: idempotencyHeaders(options)
        }, this.config);
    }

    /**
     * @description Move a block among its siblings. Requires the latest `etag` in the body; use the returned `etag` for the next write.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     * @block_id {String} - Block ID
     * @requestBody {Object} - Placement data (incl. `etag`)
     * @options {Object} - Optional request options (`idempotencyKey`)
     */
    public moveBlock(email_id: string, block_id: string, requestBody: MoveEmailBlockParams, options?: EmailWriteOptions): Promise<AxiosResponse<SingleEmailBlockResponse, MoveEmailBlockParams>> {

        validateId(email_id);
        validateId(block_id);

        return request(`/api/emails/${email_id}/blocks/${block_id}/move`, {
            method: "POST",
            body: requestBody,
            headers: idempotencyHeaders(options)
        }, this.config);
    }

    /**
     * @description Validate a block in isolation without writing it. Invalid content returns 200 with `valid: false`. No `etag` needed.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @requestBody {Object} - Block data to validate
     */
    public validateBlock(requestBody: ValidateEmailBlockParams): Promise<AxiosResponse<EmailValidationResponse, ValidateEmailBlockParams>> {
        return request(`/api/emails/blocks/validate`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update an email's settings (deep partial; only sent keys change). Requires the latest `etag` in the body; use the returned `etag` for the next write.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     * @requestBody {Object} - Settings data for update (incl. `etag`)
     * @options {Object} - Optional request options (`idempotencyKey`)
     */
    public updateSettings(email_id: string, requestBody: UpdateEmailSettingsParams, options?: EmailWriteOptions): Promise<AxiosResponse<UpdateEmailSettingsResponse, UpdateEmailSettingsParams>> {

        validateId(email_id);

        return request(`/api/emails/${email_id}/settings`, {
            method: "PATCH",
            body: requestBody,
            headers: idempotencyHeaders(options)
        }, this.config);
    }

    /**
     * @description Validate a settings change without writing it. Invalid values return 200 with `valid: false`. No `etag` needed.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     * @requestBody {Object} - Settings data to validate
     */
    public validateSettings(email_id: string, requestBody: ValidateEmailSettingsParams): Promise<AxiosResponse<EmailValidationResponse, ValidateEmailSettingsParams>> {

        validateId(email_id);

        return request(`/api/emails/${email_id}/settings/validate`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Save an email as a template. No `etag` needed.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     * @requestBody {Object} - Template data
     * @options {Object} - Optional request options (`idempotencyKey`)
     */
    public saveAsTemplate(email_id: string, requestBody: SaveEmailAsTemplateParams, options?: EmailWriteOptions): Promise<AxiosResponse<SingleEmailTemplateResponse, SaveEmailAsTemplateParams>> {

        validateId(email_id);

        return request(`/api/emails/${email_id}/templates`, {
            method: "POST",
            body: requestBody,
            headers: idempotencyHeaders(options)
        }, this.config);
    }

    /**
     * @description List an email's saved versions
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     * @params {Object} - List versions params
     */
    public getVersions(email_id: string, params?: GetEmailVersionsParams): Promise<AxiosResponse<ListEmailVersionsResponse>> {

        validateId(email_id);

        return request(`/api/emails/${email_id}/versions`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Save the email's current state as a version. Editing through the API does not create versions. No `etag` needed.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     * @options {Object} - Optional request options (`idempotencyKey`)
     */
    public createVersion(email_id: string, options?: EmailWriteOptions): Promise<AxiosResponse<SingleEmailVersionResponse>> {

        validateId(email_id);

        return request(`/api/emails/${email_id}/versions`, {
            method: "POST",
            headers: idempotencyHeaders(options)
        }, this.config);
    }

    /**
     * @description Restore an email to a saved version (the current state is saved as a version first). Requires the latest `etag` in the body; use the returned `etag` for the next write.
     *
     * // TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @email_id {String} - Email ID
     * @version_id {String} - Version ID
     * @requestBody {Object} - `{ etag }`
     * @options {Object} - Optional request options (`idempotencyKey`)
     */
    public restoreVersion(email_id: string, version_id: string, requestBody: EmailEtagParams, options?: EmailWriteOptions): Promise<AxiosResponse<SingleEmailDocumentResponse, EmailEtagParams>> {

        validateId(email_id);
        validateId(version_id);

        return request(`/api/emails/${email_id}/versions/${version_id}/restore`, {
            method: "POST",
            body: requestBody,
            headers: idempotencyHeaders(options)
        }, this.config);
    }
};

/**
 * Maps the write options to request headers. The `Idempotency-Key` header is only sent when a key is set
 * (an empty header value is a 400 on the API).
 */
function idempotencyHeaders(options?: EmailWriteOptions): Record<string, string> {
    return options?.idempotencyKey ? { "Idempotency-Key": options.idempotencyKey } : {};
}
