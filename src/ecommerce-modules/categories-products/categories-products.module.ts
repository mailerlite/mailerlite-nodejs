import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    CategoriesProductsInterface,
    AssignCategoriesParams,
    CategoryProductResponse,
    GetCategoryProductsParams,
    ListCategoryProductsResponse
} from './categories-products.types.js';

export default class CategoryProduct implements CategoriesProductsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get the products of a category
     *
     * @see https://developers.mailerlite.com/ecommerce/categories-products#get-the-products-of-a-category
     *
     * @shop_id {String} - Shop ID
     * @category_id {String} - Category ID
     * @params {Object} - Query parameters
     */
    public getProducts(shop_id: string, category_id: string, params: GetCategoryProductsParams): Promise<AxiosResponse<ListCategoryProductsResponse>> {

        validateId(shop_id);
        validateId(category_id);

        return request(`/api/ecommerce/shops/${shop_id}/categories/${category_id}/products`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Assign a product to a category
     *
     * @see https://developers.mailerlite.com/ecommerce/categories-products#assign-a-product-to-a-category
     *
     * @shop_id {String} - Shop ID
     * @category_id {String} - Category ID
     * @product_id {String} - Product ID
     */
    public assignProduct(shop_id: string, category_id: string, product_id: string): Promise<AxiosResponse<CategoryProductResponse>> {

        validateId(shop_id);
        validateId(category_id);
        validateId(product_id);

        return request(`/api/ecommerce/shops/${shop_id}/categories/${category_id}/products/${product_id}`, {
            method: "PUT"
        }, this.config);
    }

    /**
     * @description Assign multiple categories to a product
     *
     * @see https://developers.mailerlite.com/ecommerce/categories-products#assign-multiple-categories-to-a-product
     *
     * @shop_id {String} - Shop ID
     * @product_id {String} - Product ID
     * @requestBody {Object} - Request body
     */
    public assignCategories(shop_id: string, product_id: string, requestBody: AssignCategoriesParams): Promise<AxiosResponse<CategoryProductResponse, AssignCategoriesParams>> {

        validateId(shop_id);
        validateId(product_id);

        return request(`/api/ecommerce/shops/${shop_id}/products/${product_id}/categories/multiple`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Unassign a product from a category
     *
     * @see https://developers.mailerlite.com/ecommerce/categories-products#unassign-a-product-from-a-category
     *
     * @shop_id {String} - Shop ID
     * @category_id {String} - Category ID
     * @product_id {String} - Product ID
     */
    public unassignProduct(shop_id: string, category_id: string, product_id: string): Promise<AxiosResponse<null>> {

        validateId(shop_id);
        validateId(category_id);
        validateId(product_id);

        return request(`/api/ecommerce/shops/${shop_id}/categories/${category_id}/products/${product_id}`, {
            method: "DELETE"
        }, this.config);
    }
};
