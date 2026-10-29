import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    ProductsInterface,
    ChangeProductStatusParams,
    CreateUpdateProductParams,
    GetProductsParams,
    ListProductsResponse,
    SingleProductResponse
} from './products.types.js';

export default class Product implements ProductsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get products
     *
     * @see https://developers.mailerlite.com/ecommerce/products#get-products
     *
     * @shop_id {String} - Shop ID
     * @params {Object} - Query parameters
     */
    public get(shop_id: string, params: GetProductsParams): Promise<AxiosResponse<ListProductsResponse>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/products`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Fetch a product
     *
     * @see https://developers.mailerlite.com/ecommerce/products#fetch-a-product
     *
     * @shop_id {String} - Shop ID
     * @product_id {String} - Product ID
     */
    public find(shop_id: string, product_id: string): Promise<AxiosResponse<SingleProductResponse>> {

        validateId(shop_id);
        validateId(product_id);

        return request(`/api/ecommerce/shops/${shop_id}/products/${product_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create a product
     *
     * @see https://developers.mailerlite.com/ecommerce/products#createupdate-product
     *
     * @shop_id {String} - Shop ID
     * @requestBody {Object} - Request body
     */
    public create(shop_id: string, requestBody: CreateUpdateProductParams): Promise<AxiosResponse<SingleProductResponse, CreateUpdateProductParams>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/products`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a product
     *
     * @see https://developers.mailerlite.com/ecommerce/products#createupdate-product
     *
     * @shop_id {String} - Shop ID
     * @product_id {String} - Product ID
     * @requestBody {Object} - Request body
     */
    public update(shop_id: string, product_id: string, requestBody: CreateUpdateProductParams): Promise<AxiosResponse<SingleProductResponse, CreateUpdateProductParams>> {

        validateId(shop_id);
        validateId(product_id);

        return request(`/api/ecommerce/shops/${shop_id}/products/${product_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a product
     *
     * @see https://developers.mailerlite.com/ecommerce/products#delete-a-product
     *
     * @shop_id {String} - Shop ID
     * @product_id {String} - Product ID
     */
    public delete(shop_id: string, product_id: string): Promise<AxiosResponse<null>> {

        validateId(shop_id);
        validateId(product_id);

        return request(`/api/ecommerce/shops/${shop_id}/products/${product_id}`, {
            method: "DELETE"
        }, this.config);
    }

    /**
     * @description Enable or disable a product
     *
     * @see https://developers.mailerlite.com/ecommerce/products#enable-or-disable-a-product
     *
     * @shop_id {String} - Shop ID
     * @product_id {String} - Product ID
     * @requestBody {Object} - Request body
     */
    public changeStatus(shop_id: string, product_id: string, requestBody: ChangeProductStatusParams): Promise<AxiosResponse<SingleProductResponse, ChangeProductStatusParams>> {

        validateId(shop_id);
        validateId(product_id);

        return request(`/api/ecommerce/shops/${shop_id}/products/${product_id}/change-status`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }
};
