import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    OrdersInterface,
    CreateOrderParams,
    GetOrdersParams,
    ListOrdersResponse,
    SingleOrderResponse,
    UpdateOrderParams
} from './orders.types.js';

export default class Order implements OrdersInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get orders
     *
     * @see https://developers.mailerlite.com/ecommerce/orders#get-orders
     *
     * @shop_id {String} - Shop ID
     * @params {Object} - Query parameters
     */
    public get(shop_id: string, params: GetOrdersParams): Promise<AxiosResponse<ListOrdersResponse>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/orders`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Fetch an order
     *
     * @see https://developers.mailerlite.com/ecommerce/orders#fetch-an-order
     *
     * @shop_id {String} - Shop ID
     * @order_id {String} - Order ID
     */
    public find(shop_id: string, order_id: string): Promise<AxiosResponse<SingleOrderResponse>> {

        validateId(shop_id);
        validateId(order_id);

        return request(`/api/ecommerce/shops/${shop_id}/orders/${order_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create an order
     *
     * @see https://developers.mailerlite.com/ecommerce/orders#createupdate-order
     *
     * @shop_id {String} - Shop ID
     * @requestBody {Object} - Request body
     */
    public create(shop_id: string, requestBody: CreateOrderParams): Promise<AxiosResponse<SingleOrderResponse, CreateOrderParams>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/orders`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update an order
     *
     * @see https://developers.mailerlite.com/ecommerce/orders#createupdate-order
     *
     * @shop_id {String} - Shop ID
     * @order_id {String} - Order ID
     * @requestBody {Object} - Request body
     */
    public update(shop_id: string, order_id: string, requestBody: UpdateOrderParams): Promise<AxiosResponse<SingleOrderResponse, UpdateOrderParams>> {

        validateId(shop_id);
        validateId(order_id);

        return request(`/api/ecommerce/shops/${shop_id}/orders/${order_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete an order
     *
     * @see https://developers.mailerlite.com/ecommerce/orders#delete-an-order
     *
     * @shop_id {String} - Shop ID
     * @order_id {String} - Order ID
     */
    public delete(shop_id: string, order_id: string): Promise<AxiosResponse<null>> {

        validateId(shop_id);
        validateId(order_id);

        return request(`/api/ecommerce/shops/${shop_id}/orders/${order_id}`, {
            method: "DELETE"
        }, this.config);
    }
};
