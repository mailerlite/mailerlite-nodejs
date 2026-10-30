import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    CartsInterface,
    GetCartsParams,
    ListCartsResponse,
    SingleCartResponse,
    UpdateCartParams
} from './carts.types.js';

export default class Cart implements CartsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get carts
     *
     * @see https://developers.mailerlite.com/ecommerce/cart#get-carts
     *
     * @shop_id {String} - Shop ID
     * @params {Object} - Query parameters
     */
    public get(shop_id: string, params: GetCartsParams): Promise<AxiosResponse<ListCartsResponse>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/carts`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Fetch a cart
     *
     * @see https://developers.mailerlite.com/ecommerce/cart#fetch-a-cart
     *
     * @shop_id {String} - Shop ID
     * @cart_id {String} - Cart ID
     */
    public find(shop_id: string, cart_id: string): Promise<AxiosResponse<SingleCartResponse>> {

        validateId(shop_id);
        validateId(cart_id);

        return request(`/api/ecommerce/shops/${shop_id}/carts/${cart_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Update a cart
     *
     * @see https://developers.mailerlite.com/ecommerce/cart#update-a-cart
     *
     * @shop_id {String} - Shop ID
     * @cart_id {String} - Cart ID
     * @requestBody {Object} - Request body
     */
    public update(shop_id: string, cart_id: string, requestBody: UpdateCartParams): Promise<AxiosResponse<SingleCartResponse, UpdateCartParams>> {

        validateId(shop_id);
        validateId(cart_id);

        return request(`/api/ecommerce/shops/${shop_id}/carts/${cart_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }
};
