import { AxiosResponse } from "axios";
import { EcommerceCategoryObject, EcommerceCategoryParams, NullableLinks, NullableMeta } from "../../utils/types.js";

export interface CategoriesInterface {
    get:    (shop_id: string, params: GetCategoriesParams)                                  => Promise<AxiosResponse<ListCategoriesResponse>>;
    find:   (shop_id: string, category_id: string)                                          => Promise<AxiosResponse<SingleCategoryResponse>>;
    create: (shop_id: string, requestBody: CreateUpdateCategoryParams)                      => Promise<AxiosResponse<SingleCategoryResponse, CreateUpdateCategoryParams>>;
    update: (shop_id: string, category_id: string, requestBody: CreateUpdateCategoryParams) => Promise<AxiosResponse<SingleCategoryResponse, CreateUpdateCategoryParams>>;
    delete: (shop_id: string, category_id: string)                                          => Promise<AxiosResponse<SingleCategoryResponse>>;
}

export interface GetCategoriesParams {
    limit?: number;
    page?:  number;
    filter?: {
        exclude_from_automations?: boolean;
    };
}

export type CreateUpdateCategoryParams = EcommerceCategoryParams;

export interface ListCategoriesResponse {
    data:   Array<EcommerceCategoryObject>;
    links:  NullableLinks;
    meta:   NullableMeta;
}

export interface SingleCategoryResponse {
    data: EcommerceCategoryObject;
}
