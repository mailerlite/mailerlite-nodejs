import { AxiosResponse } from "axios";
import { EcommerceCategoryObject, EcommerceCategoryParams, EcommerceCustomerParams, EcommerceOrderObject, EcommerceOrderParams, EcommerceProductObject, EcommerceProductParams } from "../../utils/types.js";

export interface ImportInterface {
    importCategories: (shop_id: string, requestBody: ImportCategoriesParams) => Promise<AxiosResponse<ImportCategoriesResponse, ImportCategoriesParams>>;
    importCustomers:  (shop_id: string, requestBody: ImportCustomersParams)  => Promise<AxiosResponse<ImportCustomersResponse, ImportCustomersParams>>;
    importProducts:   (shop_id: string, requestBody: ImportProductsParams)   => Promise<AxiosResponse<ImportProductsResponse, ImportProductsParams>>;
    importOrders:     (shop_id: string, requestBody: ImportOrdersParams)     => Promise<AxiosResponse<ImportOrdersResponse, ImportOrdersParams>>;
}

export type ImportCategoriesParams = Array<EcommerceCategoryParams>;

export type ImportCustomersParams = Array<EcommerceCustomerParams>;

export type ImportProductsParams = Array<EcommerceProductParams>;

export interface ImportOrdersParams {
    orders: Array<EcommerceOrderParams>;
}

export interface ImportCategoriesResponse {
    data: Array<EcommerceCategoryObject>;
}

export interface ImportCustomersResponse {
    data: Array<ImportedCustomerObject>;
}

export interface ImportProductsResponse {
    data: Array<EcommerceProductObject>;
}

export interface ImportOrdersResponse {
    data: Array<EcommerceOrderObject>;
}

export interface ImportedCustomerObject {
    resource_id:        string;
    email:              string;
    accepts_marketing:  boolean;
    create_subscriber:  boolean;
}
