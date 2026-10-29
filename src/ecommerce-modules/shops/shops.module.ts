import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    ShopsInterface,
    CreateShopParams,
    GetShopStatsParams,
    GetShopsParams,
    ListShopsResponse,
    ShopStatsResponse,
    SingleShopResponse,
    UpdateShopParams
} from './shops.types.js';

export default class Shop implements ShopsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List e-commerce shops
     *
     * @see https://developers.mailerlite.com/ecommerce/shops#list-e-commerce-shops
     *
     * @params {Object} - Query parameters
     */
    public get(params: GetShopsParams): Promise<AxiosResponse<ListShopsResponse>> {

        return request(`/api/ecommerce/shops`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Fetch a shop
     *
     * @see https://developers.mailerlite.com/ecommerce/shops#fetch-a-shop
     *
     * @shop_id {String} - Shop ID
     */
    public find(shop_id: string): Promise<AxiosResponse<SingleShopResponse>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create a shop
     *
     * @see https://developers.mailerlite.com/ecommerce/shops#createupdate-shop
     *
     * @requestBody {Object} - Request body
     */
    public create(requestBody: CreateShopParams): Promise<AxiosResponse<SingleShopResponse, CreateShopParams>> {

        return request(`/api/ecommerce/shops`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a shop
     *
     * @see https://developers.mailerlite.com/ecommerce/shops#createupdate-shop
     *
     * @shop_id {String} - Shop ID
     * @requestBody {Object} - Request body
     */
    public update(shop_id: string, requestBody: UpdateShopParams): Promise<AxiosResponse<SingleShopResponse, UpdateShopParams>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a shop
     *
     * @see https://developers.mailerlite.com/ecommerce/shops#delete-a-shop
     *
     * @shop_id {String} - Shop ID
     */
    public delete(shop_id: string): Promise<AxiosResponse<null>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}`, {
            method: "DELETE"
        }, this.config);
    }

    /**
     * @description Fetch shop e-commerce stats
     *
     * @see https://developers.mailerlite.com/ecommerce/shops#fetch-shop-e-commerce-stats
     *
     * @shop_id {String} - Shop ID
     * @params {Object} - Query parameters
     */
    public getStats(shop_id: string, params: GetShopStatsParams): Promise<AxiosResponse<ShopStatsResponse>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/reports/stats`, {
            method: "GET",
            params: params
        }, this.config);
    }
};
