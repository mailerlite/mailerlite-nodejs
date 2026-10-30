import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    CartItemsInterface,
    CreateUpdateCartItemParams,
    GetCartItemsParams,
    ListCartItemsResponse,
    SingleCartItemResponse
} from './cart-items.types.js';

export default class CartItem implements CartItemsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get the items of a cart
     *
     * @see https://developers.mailerlite.com/ecommerce/cart-items#get-the-items-of-a-cart
     *
     * @shop_id {String} - Shop ID
     * @cart_id {String} - Cart ID
     * @params {Object} - Query parameters
     */
    public get(shop_id: string, cart_id: string, params: GetCartItemsParams): Promise<AxiosResponse<ListCartItemsResponse>> {

        validateId(shop_id);
        validateId(cart_id);

        return request(`/api/ecommerce/shops/${shop_id}/carts/${cart_id}/items`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Fetch a cart item
     *
     * @see https://developers.mailerlite.com/ecommerce/cart-items#fetch-a-cart-item
     *
     * @shop_id {String} - Shop ID
     * @cart_id {String} - Cart ID
     * @item_id {String} - Cart item ID
     */
    public find(shop_id: string, cart_id: string, item_id: string): Promise<AxiosResponse<SingleCartItemResponse>> {

        validateId(shop_id);
        validateId(cart_id);
        validateId(item_id);

        return request(`/api/ecommerce/shops/${shop_id}/carts/${cart_id}/items/${item_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Add a cart item
     *
     * @see https://developers.mailerlite.com/ecommerce/cart-items#addupdate-a-cart-item
     *
     * @shop_id {String} - Shop ID
     * @cart_id {String} - Cart ID
     * @requestBody {Object} - Request body
     */
    public create(shop_id: string, cart_id: string, requestBody: CreateUpdateCartItemParams): Promise<AxiosResponse<SingleCartItemResponse, CreateUpdateCartItemParams>> {

        validateId(shop_id);
        validateId(cart_id);

        return request(`/api/ecommerce/shops/${shop_id}/carts/${cart_id}/items`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a cart item
     *
     * @see https://developers.mailerlite.com/ecommerce/cart-items#addupdate-a-cart-item
     *
     * @shop_id {String} - Shop ID
     * @cart_id {String} - Cart ID
     * @item_id {String} - Cart item ID
     * @requestBody {Object} - Request body
     */
    public update(shop_id: string, cart_id: string, item_id: string, requestBody: CreateUpdateCartItemParams): Promise<AxiosResponse<SingleCartItemResponse, CreateUpdateCartItemParams>> {

        validateId(shop_id);
        validateId(cart_id);
        validateId(item_id);

        return request(`/api/ecommerce/shops/${shop_id}/carts/${cart_id}/items/${item_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a cart item
     *
     * @see https://developers.mailerlite.com/ecommerce/cart-items#delete-a-cart-item
     *
     * @shop_id {String} - Shop ID
     * @cart_id {String} - Cart ID
     * @item_id {String} - Cart item ID
     */
    public delete(shop_id: string, cart_id: string, item_id: string): Promise<AxiosResponse<SingleCartItemResponse>> {

        validateId(shop_id);
        validateId(cart_id);
        validateId(item_id);

        return request(`/api/ecommerce/shops/${shop_id}/carts/${cart_id}/items/${item_id}`, {
            method: "DELETE"
        }, this.config);
    }
};
