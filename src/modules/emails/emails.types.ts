import { AxiosResponse } from "axios";
import { Links, Meta } from "../../utils/types.js";

export interface EmailsInterface {
    find:               (email_id: string)                                                                                      => Promise<AxiosResponse<SingleEmailDocumentResponse>>;
    getHtml:            (email_id: string)                                                                                      => Promise<AxiosResponse<EmailHtmlResponse>>;
    findBlock:          (email_id: string, block_id: string)                                                                    => Promise<AxiosResponse<SingleEmailBlockResponse>>;
    createBlock:        (email_id: string, requestBody: CreateEmailBlockParams, options?: EmailWriteOptions)                   => Promise<AxiosResponse<SingleEmailBlockResponse, CreateEmailBlockParams>>;
    updateBlock:        (email_id: string, block_id: string, requestBody: UpdateEmailBlockParams, options?: EmailWriteOptions) => Promise<AxiosResponse<SingleEmailBlockResponse, UpdateEmailBlockParams>>;
    deleteBlock:        (email_id: string, block_id: string, requestBody: EmailEtagParams, options?: EmailWriteOptions)        => Promise<AxiosResponse<DeleteEmailBlockResponse, EmailEtagParams>>;
    moveBlock:          (email_id: string, block_id: string, requestBody: MoveEmailBlockParams, options?: EmailWriteOptions)   => Promise<AxiosResponse<SingleEmailBlockResponse, MoveEmailBlockParams>>;
    validateBlock:      (requestBody: ValidateEmailBlockParams)                                                                 => Promise<AxiosResponse<EmailValidationResponse, ValidateEmailBlockParams>>;
    updateSettings:     (email_id: string, requestBody: UpdateEmailSettingsParams, options?: EmailWriteOptions)                => Promise<AxiosResponse<UpdateEmailSettingsResponse, UpdateEmailSettingsParams>>;
    validateSettings:   (email_id: string, requestBody: ValidateEmailSettingsParams)                                           => Promise<AxiosResponse<EmailValidationResponse, ValidateEmailSettingsParams>>;
    saveAsTemplate:     (email_id: string, requestBody: SaveEmailAsTemplateParams, options?: EmailWriteOptions)                => Promise<AxiosResponse<SingleEmailTemplateResponse, SaveEmailAsTemplateParams>>;
    getVersions:        (email_id: string, params?: GetEmailVersionsParams)                                                     => Promise<AxiosResponse<ListEmailVersionsResponse>>;
    createVersion:      (email_id: string, options?: EmailWriteOptions)                                                         => Promise<AxiosResponse<SingleEmailVersionResponse>>;
    restoreVersion:     (email_id: string, version_id: string, requestBody: EmailEtagParams, options?: EmailWriteOptions)      => Promise<AxiosResponse<SingleEmailDocumentResponse, EmailEtagParams>>;
}

/**
 * Optional per-request options for the email write methods.
 */
export interface EmailWriteOptions {
    /**
     * Sent as the `Idempotency-Key` header (1–255 printable ASCII characters).
     * Repeating the same request with the same key within 24 hours returns the original
     * successful response (with the `Idempotent-Replayed: true` response header).
     * Only sent when set to a non-empty string.
     */
    idempotencyKey?: string;
}

/*
 * Editor content
 *
 * `editor_content` is the editor's own document (TipTap/ProseMirror JSON), forwarded as stored, so its
 * keys are camelCase (`textAlign`, `linkId`, `targetBlank`). A link *mark* stores its tracking ID as
 * lowercase `linkid`, while node attrs (button, image, social items) use `linkId`.
 * Typed loosely on purpose: the server validates content per block type and the schema follows the editor.
 */

export interface EmailEditorMark {
    /** e.g. "bold", "italic", "link" */
    type:       string;
    /** link: `{ href: string, linkid?: number, ... }` (lowercase `linkid` on marks) */
    attrs?:     Record<string, unknown>;
}

export interface EmailEditorNode {
    /** e.g. "text", "paragraph", "listItem" */
    type?:      string;
    text?:      string;
    attrs?:     Record<string, unknown>;
    marks?:     Array<EmailEditorMark>;
    content?:   Array<EmailEditorNode>;
}

/**
 * A block's document. `{}` for blocks that carry no data, such as a divider.
 */
export interface EmailEditorContent {
    attrs?:         Record<string, unknown>;
    content?:       Array<EmailEditorNode>;
    [key: string]:  unknown;
}

/*
 * Blocks
 */

/**
 * Every type a read can return. Unknown future types are passed through as-is.
 */
export type EmailBlockType =
    | "blockquote" | "bulleted_list" | "button" | "code" | "divider" | "heading"
    | "image" | "numbered_list" | "paragraph" | "social_icon" | "title" | "video";

/**
 * Everything except `title` can be inserted.
 */
export type InsertableEmailBlockType = Exclude<EmailBlockType, "title">;

export interface EmailBlockObject {
    id:                 string;
    type:               EmailBlockType | (string & {});
    editor_content:     EmailEditorContent;
    /** Present only when the block contains other blocks. */
    children?:          Array<EmailBlockObject>;
}

export interface EmailBlockPlacement {
    /** ID of the sibling directly before this block, or null when it is first. */
    after:      string | null;
    /** ID of the sibling directly after this block, or null when it is last. */
    before:     string | null;
}

/**
 * The single-block shape returned by findBlock/createBlock/updateBlock/moveBlock.
 */
export interface EmailBlockWithPlacementObject extends EmailBlockObject {
    placement:  EmailBlockPlacement;
}

export type EmailBlockPosition = "start" | "end" | "before" | "after";

export interface EmailBlockPlacementParams {
    position:   EmailBlockPosition;
    /** Required for `before`/`after`; ignored for `start`/`end`. */
    block_id?:  string;
}

/*
 * Settings (read shape)
 */

export type EmailBrandMode = "account" | "template" | "custom";

export interface EmailBrandSettings {
    mode:               EmailBrandMode | (string & {});
    /** CSS font stack, e.g. "Inter, sans-serif" */
    font_family:        string;
    /** Hex or "transparent"; inherited values are not case-normalised */
    background_color:   string;
    text_color:         string;
    border_color:       string;
}

export interface EmailFontSettings {
    /** e.g. "Inter, sans-serif" */
    font_family?:       string;
    /** "300" | "400" | "500" | "600" | "700" */
    font_weight?:       string;
    /** "100%" | "137%" | "150%" | "165%" | "200%" */
    line_height?:       string;
    /** "-0.05" | "-0.025" | "0" | "0.025" | "0.05" */
    letter_spacing?:    string;
}

export interface EmailTextStyle {
    color?:     string;
    /** Whole number as a string, e.g. "32" */
    size?:      string;
}

export interface EmailTypographySettings {
    link?:          { color?: string };
    heading?:       EmailFontSettings & { h1?: EmailTextStyle; h2?: EmailTextStyle; h3?: EmailTextStyle };
    paragraph?:     EmailFontSettings & { p1?: EmailTextStyle };
}

export interface EmailLayoutSettings {
    /** e.g. "default", "full" */
    width_mode?:    string;
    /** e.g. "center" */
    alignment?:     string;
}

export interface EmailButtonSettings {
    font_family?:       string;
    font_weight?:       string;
    letter_spacing?:    string;
    background_color?:  string;
    text_color?:        string;
    /** "0".."40" */
    border_radius?:     string;
}

/**
 * A footer text field: an editor document wrapped in `editor_content`.
 */
export interface EmailFooterText {
    editor_content: EmailEditorContent;
}

export interface EmailFooterSocialLink {
    url?:       string | null;
    /** Network, e.g. "facebook" */
    type?:      string | null;
    label?:     string | null;
    /** Click reports are keyed on this. Send it back unchanged when updating. */
    link_id?:   number | null;
}

export interface EmailFooterSettings {
    show_preferences?:  boolean;
    company_name?:      EmailFooterText;
    address?:           EmailFooterText;
    info_text?:         EmailFooterText;
    unsubscribe_text?:  string;
    /** Omitted when the plan has no preference centre */
    preferences_text?:  string;
    /** Always present, may be [] */
    social_links:       Array<EmailFooterSocialLink>;
}

/**
 * `brand` and `footer` are resolved (inherited values filled in).
 * `layout`, `typography` and `button` are the stored values as-is (`{}` when nothing is stored).
 */
export interface EmailSettingsObject {
    brand:          EmailBrandSettings;
    layout:         EmailLayoutSettings;
    typography:     EmailTypographySettings;
    button:         EmailButtonSettings;
    footer:         EmailFooterSettings;
}

/*
 * Email document, HTML, versions, templates
 */

export interface EmailDocumentObject {
    id:                 string;
    type:               string | null;
    /** Morph-map alias, plural */
    emailable_type:     "campaigns" | "automations" | (string & {}) | null;
    /** Owner ID (campaign or automation ID) */
    emailable_id:       string;
    settings:           EmailSettingsObject;
    /** Top-level blocks in order; no `placement` here */
    blocks:             Array<EmailBlockObject>;
}

export interface EmailHtmlObject {
    /** A preview: personalisation is literal tokens ({$name}), links carry linkid markers. Not sendable. */
    html:   string;
}

export interface EmailVersionObject {
    id:             string;
    created_at:     string; // "YYYY-MM-DD HH:mm:ss"
    /** True for the version the email is currently sitting on. */
    current:        boolean;
}

export interface EmailTemplateObject {
    id:             string;
    name:           string;
    /** Always "email" */
    type:           string;
    created_at:     string; // "YYYY-MM-DD HH:mm:ss"
}

/*
 * Requests and responses per endpoint
 */

/** GET /api/emails/{email} and POST /api/emails/{email}/versions/{version}/restore */
export interface SingleEmailDocumentResponse {
    data:   EmailDocumentObject;
    etag:   string;
}

/** GET /api/emails/{email}/html */
export interface EmailHtmlResponse {
    data:   EmailHtmlObject;
    etag:   string;
}

/** One block + the new etag (find, create, update and move block). */
export interface SingleEmailBlockResponse {
    data:   EmailBlockWithPlacementObject;
    etag:   string;
}

/** POST /api/emails/{email}/blocks */
export interface CreateEmailBlockParams {
    etag:               string;
    type:               InsertableEmailBlockType;
    /** Required, but may be {} (e.g. divider). */
    editor_content:     EmailEditorContent;
    /** Defaults to { position: "end" }. */
    placement?:         EmailBlockPlacementParams;
}

/** PATCH /api/emails/{email}/blocks/{block} */
export interface UpdateEmailBlockParams {
    etag:               string;
    /** Replaces the whole document (no merge). Read the block, change it, send it back. */
    editor_content:     EmailEditorContent;
}

/** Body of DELETE /api/emails/{email}/blocks/{block} and POST /api/emails/{email}/versions/{version}/restore */
export interface EmailEtagParams {
    etag:   string;
}

/** DELETE /api/emails/{email}/blocks/{block} returns only the new etag. */
export interface DeleteEmailBlockResponse {
    etag:   string;
}

/** POST /api/emails/{email}/blocks/{block}/move */
export interface MoveEmailBlockParams {
    etag:           string;
    placement:      EmailBlockPlacementParams;
}

/** POST /api/emails/blocks/validate (no email, no etag, no idempotency) */
export interface ValidateEmailBlockParams {
    /** An unknown type gives valid:false, not 422 */
    type:               string;
    editor_content:     EmailEditorContent;
    placement?:         EmailBlockPlacementParams;
}

/**
 * Response of both validate endpoints. NOT wrapped in `{ data }`.
 * Rule failures in the content come back as 200 with `valid: false`.
 */
export interface EmailValidationResponse {
    valid:      boolean;
    /** {} when valid. Keys and messages match what the real write would return in a 422. */
    errors:     Record<string, Array<string>>;
    /** The version of the rules the check ran against. */
    schema:     { version: string; hash: string };
    /** Only from settings/validate, and only when the write would strip an unsafe value. */
    rejected?:  EmailSettingsRejected;
}

/** PATCH /api/emails/{email}/settings — deep partial; only sent keys change. */
export interface UpdateEmailSettingsParams {
    etag:           string;
    brand?: {
        mode?:              EmailBrandMode;
        /** Write-only: a preset identifier from brand styles, e.g. "preset-retro". Reads back as mode "custom". */
        style?:             string;
        /** "" or null = unset (inherit from the account) */
        font_family?:       string | null;
        background_color?:  string | null;
        text_color?:        string | null;
        border_color?:      string | null;
    };
    layout?:        Partial<EmailLayoutSettings>;
    typography?:    EmailTypographySettings;
    button?:        Partial<EmailButtonSettings>;
    footer?: {
        show_preferences?:  boolean;
        unsubscribe_text?:  string | null;
        preferences_text?:  string | null;
        /** `{ content: [] }` or `{}` = unset */
        company_name?:      EmailFooterText;
        address?:           EmailFooterText;
        info_text?:         EmailFooterText;
        /** Replaces the whole list. Send every link to keep, in order, each with its link_id. */
        social_links?:      Array<EmailFooterSocialLinkParams>;
    };
}

/**
 * On write, url/type/label must be present (null is accepted); a missing one is a 422.
 */
export interface EmailFooterSocialLinkParams {
    url:        string | null;
    type:       string | null;
    label:      string | null;
    link_id?:   number | null;
}

export interface EmailSettingsRejected {
    message:    "Some attributes were rejected." | (string & {});
    /** Dot paths, e.g. "footer.social_links[0].url". */
    keys:       Array<string>;
}

export interface UpdateEmailSettingsResponse {
    /** The settings as they now apply, in the same shape as `settings` in the email document. */
    data:       EmailSettingsObject;
    etag:       string;
    /** Present only when an unsafe value was dropped. The write itself still succeeded. */
    rejected?:  EmailSettingsRejected;
}

/** POST /api/emails/{email}/settings/validate — same body as the settings update, without etag. */
export type ValidateEmailSettingsParams = Omit<UpdateEmailSettingsParams, "etag">;

/** POST /api/emails/{email}/templates */
export interface SaveEmailAsTemplateParams {
    /** Max 255 characters */
    name:   string;
}

export interface SingleEmailTemplateResponse {
    data:   EmailTemplateObject;
}

/** GET /api/emails/{email}/versions */
export interface GetEmailVersionsParams {
    /**
     * @default 25 (max 100)
     */
    limit?:     number;
    /**
     * @default 1
     */
    page?:      number;
}

export interface ListEmailVersionsResponse {
    data:   Array<EmailVersionObject>;
    links:  EmailVersionsLinks;
    meta:   EmailVersionsMeta;
}

/** `prev` is null on the first page, `next` on the last. */
export interface EmailVersionsLinks extends Omit<Links, "prev" | "next"> {
    prev:   string | null;
    next:   string | null;
}

export interface EmailVersionsMeta extends Omit<Meta, "from" | "to" | "links"> {
    /** null when the page is empty */
    from:   number | null;
    /** null when the page is empty */
    to:     number | null;
    links:  Array<EmailVersionsMetaLink>;
}

export interface EmailVersionsMetaLink {
    /** null for a disabled "Previous"/"Next" link and for the "..." separator */
    url:    string | null;
    label:  string;
    /** null for a disabled "Previous"/"Next" link; omitted for the "..." separator */
    page?:  number | null;
    active: boolean;
}

/** POST /api/emails/{email}/versions — 201 if a version was saved, 200 if nothing changed (the last one is returned). */
export interface SingleEmailVersionResponse {
    data:   EmailVersionObject;
}

/**
 * 409 body for a stale or malformed etag. Exported so callers can narrow `error.response.data`.
 * Other 409 bodies (write collision, campaign not a draft, idempotency key in progress) have no `code`,
 * so check `code === "version_conflict"`, not the status alone.
 */
export interface EmailVersionConflictError {
    message:    string;
    code:       "version_conflict";
    /** The email's current etag */
    etag:       string;
}
