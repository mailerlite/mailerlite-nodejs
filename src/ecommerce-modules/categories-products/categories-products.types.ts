import { AxiosResponse } from "axios";
import { EcommerceProductObject, Links, Meta } from "../../utils/types.js";

export interface CategoriesProductsInterface {
    getProducts:      (shop_id: string, category_id: string, params: GetCategoryProductsParams)  => Promise<AxiosResponse<ListCategoryProductsResponse>>;
    assignProduct:    (shop_id: string, category_id: string, product_id: string)                 => Promise<AxiosResponse<CategoryProductResponse>>;
    assignCategories: (shop_id: string, product_id: string, requestBody: AssignCategoriesParams) => Promise<AxiosResponse<CategoryProductResponse, AssignCategoriesParams>>;
    unassignProduct:  (shop_id: string, category_id: string, product_id: string)                 => Promise<AxiosResponse<CategoryProductResponse>>;
}

export interface GetCategoryProductsParams {
    limit?: number;
    page?:  number;
}

export interface AssignCategoriesParams {
    categories: Array<string>;
    replace?:   boolean;
}

export interface ListCategoryProductsResponse {
    data:   Array<EcommerceProductObject>;
    links:  Links;
    meta:   Meta;
}

export interface CategoryProductResponse {
    data: EcommerceProductObject;
}
