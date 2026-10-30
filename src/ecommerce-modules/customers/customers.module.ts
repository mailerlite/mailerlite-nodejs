import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    CustomersInterface,
    CreateUpdateCustomerParams,
    GetCustomersParams,
    ListCustomersResponse,
    SingleCustomerResponse
} from './customers.types.js';

export default class Customer implements CustomersInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get customers
     *
     * @see https://developers.mailerlite.com/ecommerce/customers#get-customers
     *
     * @shop_id {String} - Shop ID
     * @params {Object} - Query parameters
     */
    public get(shop_id: string, params: GetCustomersParams): Promise<AxiosResponse<ListCustomersResponse>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/customers`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Fetch a customer
     *
     * @see https://developers.mailerlite.com/ecommerce/customers#fetch-a-customer
     *
     * @shop_id {String} - Shop ID
     * @customer_id {String} - Customer ID
     */
    public find(shop_id: string, customer_id: string): Promise<AxiosResponse<SingleCustomerResponse>> {

        validateId(shop_id);
        validateId(customer_id);

        return request(`/api/ecommerce/shops/${shop_id}/customers/${customer_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create a customer
     *
     * @see https://developers.mailerlite.com/ecommerce/customers#createupdate-customer
     *
     * @shop_id {String} - Shop ID
     * @requestBody {Object} - Request body
     */
    public create(shop_id: string, requestBody: CreateUpdateCustomerParams): Promise<AxiosResponse<SingleCustomerResponse, CreateUpdateCustomerParams>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/customers`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a customer
     *
     * @see https://developers.mailerlite.com/ecommerce/customers#createupdate-customer
     *
     * @shop_id {String} - Shop ID
     * @customer_id {String} - Customer ID
     * @requestBody {Object} - Request body
     */
    public update(shop_id: string, customer_id: string, requestBody: CreateUpdateCustomerParams): Promise<AxiosResponse<SingleCustomerResponse, CreateUpdateCustomerParams>> {

        validateId(shop_id);
        validateId(customer_id);

        return request(`/api/ecommerce/shops/${shop_id}/customers/${customer_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a customer
     *
     * @see https://developers.mailerlite.com/ecommerce/customers#delete-a-customer
     *
     * @shop_id {String} - Shop ID
     * @customer_id {String} - Customer ID
     */
    public delete(shop_id: string, customer_id: string): Promise<AxiosResponse<SingleCustomerResponse>> {

        validateId(shop_id);
        validateId(customer_id);

        return request(`/api/ecommerce/shops/${shop_id}/customers/${customer_id}`, {
            method: "DELETE"
        }, this.config);
    }
};
