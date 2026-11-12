import { pathSegment } from '../../utils/helpers.js';
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
        return request(`/api/ecommerce/shops/${pathSegment(shop_id)}/categories/${pathSegment(category_id)}/products`, {
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
        return request(`/api/ecommerce/shops/${pathSegment(shop_id)}/categories/${pathSegment(category_id)}/products/${pathSegment(product_id)}`, {
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
        return request(`/api/ecommerce/shops/${pathSegment(shop_id)}/products/${pathSegment(product_id)}/categories/multiple`, {
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
    public unassignProduct(shop_id: string, category_id: string, product_id: string): Promise<AxiosResponse<CategoryProductResponse>> {
        return request(`/api/ecommerce/shops/${pathSegment(shop_id)}/categories/${pathSegment(category_id)}/products/${pathSegment(product_id)}`, {
            method: "DELETE"
        }, this.config);
    }
};
