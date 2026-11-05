import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    ProductVariantsInterface,
    CreateProductVariantsParams,
    ListProductVariantsResponse,
    ProductWithVariantsResponse,
    UpdateProductVariantParams
} from './product-variants.types.js';

export default class ProductVariant implements ProductVariantsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get product variants
     *
     * @see https://developers.mailerlite.com/ecommerce/product-variants#get-product-variants
     *
     * @shop_id {String} - Shop ID
     * @product_id {String} - Product ID
     */
    public get(shop_id: string, product_id: string): Promise<AxiosResponse<ListProductVariantsResponse>> {

        validateId(shop_id);
        validateId(product_id);

        return request(`/api/ecommerce/shops/${shop_id}/products/${product_id}/variants`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create product variants
     *
     * @see https://developers.mailerlite.com/ecommerce/product-variants#create-product-variants
     *
     * @shop_id {String} - Shop ID
     * @product_id {String} - Product ID
     * @requestBody {Object} - Request body
     */
    public create(shop_id: string, product_id: string, requestBody: CreateProductVariantsParams): Promise<AxiosResponse<ProductWithVariantsResponse, CreateProductVariantsParams>> {

        validateId(shop_id);
        validateId(product_id);

        return request(`/api/ecommerce/shops/${shop_id}/products/${product_id}/variants`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a product variant
     *
     * @see https://developers.mailerlite.com/ecommerce/product-variants#update-a-product-variant
     *
     * @shop_id {String} - Shop ID
     * @product_id {String} - Product ID
     * @variant_id {String} - Variant ID
     * @requestBody {Object} - Request body
     */
    public update(shop_id: string, product_id: string, variant_id: string, requestBody: UpdateProductVariantParams): Promise<AxiosResponse<ProductWithVariantsResponse, UpdateProductVariantParams>> {

        validateId(shop_id);
        validateId(product_id);
        validateId(variant_id);

        return request(`/api/ecommerce/shops/${shop_id}/products/${product_id}/variants/${variant_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a product variant
     *
     * @see https://developers.mailerlite.com/ecommerce/product-variants#delete-a-product-variant
     *
     * @shop_id {String} - Shop ID
     * @product_id {String} - Product ID
     * @variant_id {String} - Variant ID
     */
    public delete(shop_id: string, product_id: string, variant_id: string): Promise<AxiosResponse<ProductWithVariantsResponse>> {

        validateId(shop_id);
        validateId(product_id);
        validateId(variant_id);

        return request(`/api/ecommerce/shops/${shop_id}/products/${product_id}/variants/${variant_id}`, {
            method: "DELETE"
        }, this.config);
    }
};
