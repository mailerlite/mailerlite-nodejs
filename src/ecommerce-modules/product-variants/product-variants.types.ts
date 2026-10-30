import { AxiosResponse } from "axios";
import { EcommerceProductObject, EcommerceProductVariantObject, EcommerceProductVariantParams, Links, Meta } from "../../utils/types.js";

export interface ProductVariantsInterface {
    get:    (shop_id: string, product_id: string)                                                              => Promise<AxiosResponse<ListProductVariantsResponse>>;
    create: (shop_id: string, product_id: string, requestBody: CreateProductVariantsParams)                    => Promise<AxiosResponse<ProductWithVariantsResponse, CreateProductVariantsParams>>;
    update: (shop_id: string, product_id: string, variant_id: string, requestBody: UpdateProductVariantParams) => Promise<AxiosResponse<ProductWithVariantsResponse, UpdateProductVariantParams>>;
    delete: (shop_id: string, product_id: string, variant_id: string)                                          => Promise<AxiosResponse<ProductWithVariantsResponse>>;
}

export type CreateProductVariantsParams = Array<EcommerceProductVariantParams>;

export type UpdateProductVariantParams = EcommerceProductVariantParams;

export interface ListProductVariantsResponse {
    data:   Array<EcommerceProductVariantObject>;
    links:  Links;
    meta:   Meta;
}

export interface ProductWithVariantsResponse {
    data: EcommerceProductObject;
}
