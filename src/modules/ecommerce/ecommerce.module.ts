import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import {
    EcommerceInterface,
    ShopsInterface,
    ProductsInterface,
    VariantsInterface,
    CategoriesInterface,
    CustomersInterface,
    OrdersInterface,
    CartsInterface,
    CartItemsInterface,
    ImportsInterface,
    ListParams,
    ListResponse,
    SingleResponse,
    ShopObject,
    CreateShopParams,
    UpdateShopParams,
    ShopStatsParams,
    ShopStats,
    ProductObject,
    ProductParams,
    GetProductsParams,
    VariantObject,
    VariantParams,
    CategoryObject,
    CategoryParams,
    GetCategoriesParams,
    CustomerObject,
    CustomerParams,
    GetCustomersParams,
    OrderObject,
    CreateOrderParams,
    UpdateOrderParams,
    GetOrdersParams,
    CartObject,
    UpdateCartParams,
    CartItemObject,
    CartItemParams,
    SettingsResponse
} from "./ecommerce.types.js";

const shopPath = (shop_id: string) => {
    validateId(shop_id);

    return `/api/ecommerce/shops/${shop_id}`;
};

class Shops implements ShopsInterface {
    constructor(private config: Config) {}

    /**
     * @description List shops
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/shops
     */
    public get(params: ListParams = {}): Promise<AxiosResponse<ListResponse<ShopObject>>> {
        return request(`/api/ecommerce/shops`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get a shop
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/shops
     */
    public find(shop_id: string): Promise<AxiosResponse<SingleResponse<ShopObject>>> {
        return request(shopPath(shop_id), {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create a shop
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/shops
     */
    public create(requestBody: CreateShopParams): Promise<AxiosResponse<SingleResponse<ShopObject>>> {
        return request(`/api/ecommerce/shops`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a shop
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/shops
     */
    public update(shop_id: string, requestBody: UpdateShopParams): Promise<AxiosResponse<SingleResponse<ShopObject>>> {
        return request(shopPath(shop_id), {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a shop
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/shops
     */
    public delete(shop_id: string): Promise<AxiosResponse<null>> {
        return request(shopPath(shop_id), {
            method: "DELETE"
        }, this.config);
    }

    /**
     * @description Get a shop's attributed orders and revenue over a period of up to one year
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/shops
     */
    public getStats(shop_id: string, params: ShopStatsParams): Promise<AxiosResponse<SingleResponse<ShopStats>>> {
        return request(`${shopPath(shop_id)}/reports/stats`, {
            method: "GET",
            params: params
        }, this.config);
    }
}

class Products implements ProductsInterface {
    constructor(private config: Config) {}

    /**
     * @description List products
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/products
     */
    public get(shop_id: string, params: GetProductsParams = {}): Promise<AxiosResponse<ListResponse<ProductObject>>> {
        return request(`${shopPath(shop_id)}/products`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get a product
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/products
     */
    public find(shop_id: string, product_id: string): Promise<AxiosResponse<SingleResponse<ProductObject>>> {
        validateId(product_id);

        return request(`${shopPath(shop_id)}/products/${product_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create or update a product
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/products
     */
    public create(shop_id: string, requestBody: ProductParams): Promise<AxiosResponse<SingleResponse<ProductObject>>> {
        return request(`${shopPath(shop_id)}/products`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a product
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/products
     */
    public update(shop_id: string, product_id: string, requestBody: ProductParams): Promise<AxiosResponse<SingleResponse<ProductObject>>> {
        validateId(product_id);

        return request(`${shopPath(shop_id)}/products/${product_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a product
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/products
     */
    public delete(shop_id: string, product_id: string): Promise<AxiosResponse<null>> {
        validateId(product_id);

        return request(`${shopPath(shop_id)}/products/${product_id}`, {
            method: "DELETE"
        }, this.config);
    }

    /**
     * @description Enable or disable a product
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/products
     */
    public changeStatus(shop_id: string, product_id: string, enabled: boolean): Promise<AxiosResponse<SingleResponse<ProductObject>>> {
        validateId(product_id);

        return request(`${shopPath(shop_id)}/products/${product_id}/change-status`, {
            method: "PUT",
            body: { status: enabled }
        }, this.config);
    }

    /**
     * @description Assign categories to a product, optionally removing the ones not listed
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/products
     */
    public assignCategories(shop_id: string, product_id: string, category_ids: Array<string>, replace: boolean = false): Promise<AxiosResponse<SingleResponse<ProductObject>>> {
        validateId(product_id);

        return request(`${shopPath(shop_id)}/products/${product_id}/categories/multiple`, {
            method: "PUT",
            body: { categories: category_ids, replace: replace }
        }, this.config);
    }
}

class Variants implements VariantsInterface {
    constructor(private config: Config) {}

    /**
     * @description List a product's variants
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/product-variants
     */
    public get(shop_id: string, product_id: string): Promise<AxiosResponse<ListResponse<VariantObject>>> {
        validateId(product_id);

        return request(`${shopPath(shop_id)}/products/${product_id}/variants`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create or update a product's variants from a list
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/product-variants
     */
    public sync(shop_id: string, product_id: string, variants: Array<VariantParams>): Promise<AxiosResponse<SingleResponse<ProductObject>>> {
        validateId(product_id);

        return request(`${shopPath(shop_id)}/products/${product_id}/variants`, {
            method: "POST",
            body: variants
        }, this.config);
    }

    /**
     * @description Update a product variant
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/product-variants
     */
    public update(shop_id: string, product_id: string, variant_id: string, requestBody: VariantParams): Promise<AxiosResponse<SingleResponse<ProductObject>>> {
        validateId(product_id);
        validateId(variant_id);

        return request(`${shopPath(shop_id)}/products/${product_id}/variants/${variant_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a product variant
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/product-variants
     */
    public delete(shop_id: string, product_id: string, variant_id: string): Promise<AxiosResponse<SingleResponse<ProductObject>>> {
        validateId(product_id);
        validateId(variant_id);

        return request(`${shopPath(shop_id)}/products/${product_id}/variants/${variant_id}`, {
            method: "DELETE"
        }, this.config);
    }
}

class Categories implements CategoriesInterface {
    constructor(private config: Config) {}

    /**
     * @description List categories
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/categories
     */
    public get(shop_id: string, params: GetCategoriesParams = {}): Promise<AxiosResponse<ListResponse<CategoryObject>>> {
        return request(`${shopPath(shop_id)}/categories`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get a category
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/categories
     */
    public find(shop_id: string, category_id: string): Promise<AxiosResponse<SingleResponse<CategoryObject>>> {
        validateId(category_id);

        return request(`${shopPath(shop_id)}/categories/${category_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create or update a category
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/categories
     */
    public create(shop_id: string, requestBody: CategoryParams): Promise<AxiosResponse<SingleResponse<CategoryObject>>> {
        return request(`${shopPath(shop_id)}/categories`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a category
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/categories
     */
    public update(shop_id: string, category_id: string, requestBody: CategoryParams): Promise<AxiosResponse<SingleResponse<CategoryObject>>> {
        validateId(category_id);

        return request(`${shopPath(shop_id)}/categories/${category_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a category
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/categories
     */
    public delete(shop_id: string, category_id: string): Promise<AxiosResponse<null>> {
        validateId(category_id);

        return request(`${shopPath(shop_id)}/categories/${category_id}`, {
            method: "DELETE"
        }, this.config);
    }

    /**
     * @description List the products in a category
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/categories-products
     */
    public getProducts(shop_id: string, category_id: string, params: ListParams = {}): Promise<AxiosResponse<ListResponse<ProductObject>>> {
        validateId(category_id);

        return request(`${shopPath(shop_id)}/categories/${category_id}/products`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Assign a product to a category
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/categories-products
     */
    public assignProduct(shop_id: string, category_id: string, product_id: string): Promise<AxiosResponse<SingleResponse<ProductObject>>> {
        validateId(category_id);
        validateId(product_id);

        return request(`${shopPath(shop_id)}/categories/${category_id}/products/${product_id}`, {
            method: "PUT"
        }, this.config);
    }

    /**
     * @description Unassign a product from a category
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/categories-products
     */
    public unassignProduct(shop_id: string, category_id: string, product_id: string): Promise<AxiosResponse<null>> {
        validateId(category_id);
        validateId(product_id);

        return request(`${shopPath(shop_id)}/categories/${category_id}/products/${product_id}`, {
            method: "DELETE"
        }, this.config);
    }
}

class Customers implements CustomersInterface {
    constructor(private config: Config) {}

    /**
     * @description List customers
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/customers
     */
    public get(shop_id: string, params: GetCustomersParams = {}): Promise<AxiosResponse<ListResponse<CustomerObject>>> {
        return request(`${shopPath(shop_id)}/customers`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get a customer
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/customers
     */
    public find(shop_id: string, customer_id: string): Promise<AxiosResponse<SingleResponse<CustomerObject>>> {
        validateId(customer_id);

        return request(`${shopPath(shop_id)}/customers/${customer_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create or update a customer
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/customers
     */
    public create(shop_id: string, requestBody: CustomerParams): Promise<AxiosResponse<SingleResponse<CustomerObject>>> {
        return request(`${shopPath(shop_id)}/customers`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a customer
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/customers
     */
    public update(shop_id: string, customer_id: string, requestBody: CustomerParams): Promise<AxiosResponse<SingleResponse<CustomerObject>>> {
        validateId(customer_id);

        return request(`${shopPath(shop_id)}/customers/${customer_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a customer
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/customers
     */
    public delete(shop_id: string, customer_id: string): Promise<AxiosResponse<null>> {
        validateId(customer_id);

        return request(`${shopPath(shop_id)}/customers/${customer_id}`, {
            method: "DELETE"
        }, this.config);
    }
}

class Orders implements OrdersInterface {
    constructor(private config: Config) {}

    /**
     * @description List orders
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/orders
     */
    public get(shop_id: string, params: GetOrdersParams = {}): Promise<AxiosResponse<ListResponse<OrderObject>>> {
        return request(`${shopPath(shop_id)}/orders`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get an order
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/orders
     */
    public find(shop_id: string, order_id: string): Promise<AxiosResponse<SingleResponse<OrderObject>>> {
        validateId(order_id);

        return request(`${shopPath(shop_id)}/orders/${order_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create or update an order
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/orders
     */
    public create(shop_id: string, requestBody: CreateOrderParams): Promise<AxiosResponse<SingleResponse<OrderObject>>> {
        return request(`${shopPath(shop_id)}/orders`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update an order
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/orders
     */
    public update(shop_id: string, order_id: string, requestBody: UpdateOrderParams): Promise<AxiosResponse<SingleResponse<OrderObject>>> {
        validateId(order_id);

        return request(`${shopPath(shop_id)}/orders/${order_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete an order
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/orders
     */
    public delete(shop_id: string, order_id: string): Promise<AxiosResponse<null>> {
        validateId(order_id);

        return request(`${shopPath(shop_id)}/orders/${order_id}`, {
            method: "DELETE"
        }, this.config);
    }
}

class Carts implements CartsInterface {
    constructor(private config: Config) {}

    /**
     * @description List carts
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/cart
     */
    public get(shop_id: string, params: ListParams = {}): Promise<AxiosResponse<ListResponse<CartObject>>> {
        return request(`${shopPath(shop_id)}/carts`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get a cart
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/cart
     */
    public find(shop_id: string, cart_id: string): Promise<AxiosResponse<SingleResponse<CartObject>>> {
        validateId(cart_id);

        return request(`${shopPath(shop_id)}/carts/${cart_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Update a cart
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/cart
     */
    public update(shop_id: string, cart_id: string, requestBody: UpdateCartParams): Promise<AxiosResponse<SingleResponse<CartObject>>> {
        validateId(cart_id);

        return request(`${shopPath(shop_id)}/carts/${cart_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }
}

class CartItems implements CartItemsInterface {
    constructor(private config: Config) {}

    /**
     * @description List a cart's items
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/cart-items
     */
    public get(shop_id: string, cart_id: string, params: ListParams = {}): Promise<AxiosResponse<ListResponse<CartItemObject>>> {
        validateId(cart_id);

        return request(`${shopPath(shop_id)}/carts/${cart_id}/items`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get a cart item
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/cart-items
     */
    public find(shop_id: string, cart_id: string, item_id: string): Promise<AxiosResponse<SingleResponse<CartItemObject>>> {
        validateId(cart_id);
        validateId(item_id);

        return request(`${shopPath(shop_id)}/carts/${cart_id}/items/${item_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Add an item to a cart
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/cart-items
     */
    public create(shop_id: string, cart_id: string, requestBody: CartItemParams): Promise<AxiosResponse<SingleResponse<CartItemObject>>> {
        validateId(cart_id);

        return request(`${shopPath(shop_id)}/carts/${cart_id}/items`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a cart item
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/cart-items
     */
    public update(shop_id: string, cart_id: string, item_id: string, requestBody: CartItemParams): Promise<AxiosResponse<SingleResponse<CartItemObject>>> {
        validateId(cart_id);
        validateId(item_id);

        return request(`${shopPath(shop_id)}/carts/${cart_id}/items/${item_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a cart item
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/cart-items
     */
    public delete(shop_id: string, cart_id: string, item_id: string): Promise<AxiosResponse<null>> {
        validateId(cart_id);
        validateId(item_id);

        return request(`${shopPath(shop_id)}/carts/${cart_id}/items/${item_id}`, {
            method: "DELETE"
        }, this.config);
    }
}

class Imports implements ImportsInterface {
    constructor(private config: Config) {}

    /**
     * @description Import products
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/import
     */
    public products(shop_id: string, products: Array<ProductParams>): Promise<AxiosResponse> {
        return request(`${shopPath(shop_id)}/products/import`, {
            method: "POST",
            body: products
        }, this.config);
    }

    /**
     * @description Import categories
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/import
     */
    public categories(shop_id: string, categories: Array<CategoryParams>): Promise<AxiosResponse> {
        return request(`${shopPath(shop_id)}/categories/import`, {
            method: "POST",
            body: categories
        }, this.config);
    }

    /**
     * @description Import customers
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/import
     */
    public customers(shop_id: string, customers: Array<CustomerParams>): Promise<AxiosResponse> {
        return request(`${shopPath(shop_id)}/customers/import`, {
            method: "POST",
            body: customers
        }, this.config);
    }

    /**
     * @description Import orders
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/import
     */
    public orders(shop_id: string, orders: Array<CreateOrderParams>): Promise<AxiosResponse> {
        return request(`${shopPath(shop_id)}/orders/import`, {
            method: "POST",
            body: { orders: orders }
        }, this.config);
    }
}

export default class Ecommerce implements EcommerceInterface {
    private config: Config;
    public shops: ShopsInterface;
    public products: ProductsInterface;
    public variants: VariantsInterface;
    public categories: CategoriesInterface;
    public customers: CustomersInterface;
    public orders: OrdersInterface;
    public carts: CartsInterface;
    public cartItems: CartItemsInterface;
    public imports: ImportsInterface;

    constructor(config: Config) {
        this.config = config;
        this.shops = new Shops(config);
        this.products = new Products(config);
        this.variants = new Variants(config);
        this.categories = new Categories(config);
        this.customers = new Customers(config);
        this.orders = new Orders(config);
        this.carts = new Carts(config);
        this.cartItems = new CartItems(config);
        this.imports = new Imports(config);
    }

    /**
     * @description Get the e-commerce tracking settings
     *
     * @see https://developers.mailerlite.com/docs/ecommerce/settings
     */
    public getSettings(): Promise<AxiosResponse<SettingsResponse>> {
        return request(`/api/ecommerce/settings`, {
            method: "GET"
        }, this.config);
    }
};
