import { pathSegment } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    CategoriesInterface,
    CreateUpdateCategoryParams,
    GetCategoriesParams,
    ListCategoriesResponse,
    SingleCategoryResponse
} from './categories.types.js';

export default class Category implements CategoriesInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get categories
     *
     * @see https://developers.mailerlite.com/ecommerce/categories#get-categories
     *
     * @shop_id {String} - Shop ID
     * @params {Object} - Query parameters
     */
    public get(shop_id: string, params: GetCategoriesParams): Promise<AxiosResponse<ListCategoriesResponse>> {
        return request(`/api/ecommerce/shops/${pathSegment(shop_id)}/categories`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Fetch a category
     *
     * @see https://developers.mailerlite.com/ecommerce/categories#fetch-a-category
     *
     * @shop_id {String} - Shop ID
     * @category_id {String} - Category ID
     */
    public find(shop_id: string, category_id: string): Promise<AxiosResponse<SingleCategoryResponse>> {
        return request(`/api/ecommerce/shops/${pathSegment(shop_id)}/categories/${pathSegment(category_id)}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create a category
     *
     * @see https://developers.mailerlite.com/ecommerce/categories#createupdate-category
     *
     * @shop_id {String} - Shop ID
     * @requestBody {Object} - Request body
     */
    public create(shop_id: string, requestBody: CreateUpdateCategoryParams): Promise<AxiosResponse<SingleCategoryResponse, CreateUpdateCategoryParams>> {
        return request(`/api/ecommerce/shops/${pathSegment(shop_id)}/categories`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a category
     *
     * @see https://developers.mailerlite.com/ecommerce/categories#createupdate-category
     *
     * @shop_id {String} - Shop ID
     * @category_id {String} - Category ID
     * @requestBody {Object} - Request body
     */
    public update(shop_id: string, category_id: string, requestBody: CreateUpdateCategoryParams): Promise<AxiosResponse<SingleCategoryResponse, CreateUpdateCategoryParams>> {
        return request(`/api/ecommerce/shops/${pathSegment(shop_id)}/categories/${pathSegment(category_id)}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a category
     *
     * @see https://developers.mailerlite.com/ecommerce/categories#delete-a-category
     *
     * @shop_id {String} - Shop ID
     * @category_id {String} - Category ID
     */
    public delete(shop_id: string, category_id: string): Promise<AxiosResponse<SingleCategoryResponse>> {
        return request(`/api/ecommerce/shops/${pathSegment(shop_id)}/categories/${pathSegment(category_id)}`, {
            method: "DELETE"
        }, this.config);
    }
};
