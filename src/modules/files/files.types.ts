import { AxiosResponse } from "axios";
import { Links, Meta } from "../../utils/types.js";

export interface FilesInterface {
    get:    (params?: GetFilesParams)   => Promise<AxiosResponse<ListFilesResponse>>;
}

export interface GetFilesParams {
    /** @default 25 (1..100) */
    limit?: number;
    /** @default 1 */
    page?:  number;
    filter?: {
        /** Case-insensitive substring match on the name. A comma splits the value into OR terms. */
        name?:  string;
        type?:  FileType;
    };
    /** @default "-created_at" */
    sort?:  "created_at" | "name" | "size" | "-created_at" | "-name" | "-size";
}

export interface ListFilesResponse {
    data:   Array<FileObject>;
    links:  Links;
    meta:   Meta;
}

export type FileType = "image" | "pdf" | "epub";

export interface FileObject {
    id:         string;
    type:       FileType;
    name:       string;
    /** Public URL, usable directly as an image block's src or a button/link href. */
    url:        string;
    /** Size in bytes */
    size:       number;
    /** Images only; null for pdf/epub */
    width:      number | null;
    /** Images only; null for pdf/epub */
    height:     number | null;
    created_at: string;
}
