import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    ImportInterface,
    ImportCategoriesParams,
    ImportCategoriesResponse,
    ImportCustomersParams,
    ImportCustomersResponse,
    ImportOrdersParams,
    ImportOrdersResponse,
    ImportProductsParams,
    ImportProductsResponse
} from './import.types.js';

export default class Import implements ImportInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Categories import
     *
     * @see https://developers.mailerlite.com/ecommerce/import#categories-import
     *
     * @shop_id {String} - Shop ID
     * @requestBody {Object} - Request body
     */
    public importCategories(shop_id: string, requestBody: ImportCategoriesParams): Promise<AxiosResponse<ImportCategoriesResponse, ImportCategoriesParams>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/categories/import`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Customers import
     *
     * @see https://developers.mailerlite.com/ecommerce/import#customers-import
     *
     * @shop_id {String} - Shop ID
     * @requestBody {Object} - Request body
     */
    public importCustomers(shop_id: string, requestBody: ImportCustomersParams): Promise<AxiosResponse<ImportCustomersResponse, ImportCustomersParams>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/customers/import`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Products import
     *
     * @see https://developers.mailerlite.com/ecommerce/import#products-import
     *
     * @shop_id {String} - Shop ID
     * @requestBody {Object} - Request body
     */
    public importProducts(shop_id: string, requestBody: ImportProductsParams): Promise<AxiosResponse<ImportProductsResponse, ImportProductsParams>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/products/import`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Orders import
     *
     * @see https://developers.mailerlite.com/ecommerce/import#orders-import
     *
     * @shop_id {String} - Shop ID
     * @requestBody {Object} - Request body
     */
    public importOrders(shop_id: string, requestBody: ImportOrdersParams): Promise<AxiosResponse<ImportOrdersResponse, ImportOrdersParams>> {

        validateId(shop_id);

        return request(`/api/ecommerce/shops/${shop_id}/orders/import`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }
};
