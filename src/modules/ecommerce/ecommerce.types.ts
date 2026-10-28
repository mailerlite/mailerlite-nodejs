import { AxiosResponse } from "axios";
import { GroupObject } from "../groups/groups.types.js";
import { Links, Meta, SubscriberObject } from "../../utils/types.js";

export interface EcommerceInterface {
    shops:      ShopsInterface;
    products:   ProductsInterface;
    variants:   VariantsInterface;
    categories: CategoriesInterface;
    customers:  CustomersInterface;
    orders:     OrdersInterface;
    carts:      CartsInterface;
    cartItems:  CartItemsInterface;
    imports:    ImportsInterface;
    getSettings: () => Promise<AxiosResponse<SettingsResponse>>;
}

export interface ShopsInterface {
    get:    (params?: ListParams)                               => Promise<AxiosResponse<ListResponse<ShopObject>>>;
    find:   (shop_id: string)                                   => Promise<AxiosResponse<SingleResponse<ShopObject>>>;
    create: (params: CreateShopParams)                          => Promise<AxiosResponse<SingleResponse<ShopObject>>>;
    update: (shop_id: string, params: UpdateShopParams)         => Promise<AxiosResponse<SingleResponse<ShopObject>>>;
    delete: (shop_id: string)                                   => Promise<AxiosResponse<null>>;
    getStats: (shop_id: string, params: ShopStatsParams)        => Promise<AxiosResponse<SingleResponse<ShopStats>>>;
}

export interface ProductsInterface {
    get:    (shop_id: string, params?: GetProductsParams)                    => Promise<AxiosResponse<ListResponse<ProductObject>>>;
    find:   (shop_id: string, product_id: string)                            => Promise<AxiosResponse<SingleResponse<ProductObject>>>;
    create: (shop_id: string, params: ProductParams)                         => Promise<AxiosResponse<SingleResponse<ProductObject>>>;
    update: (shop_id: string, product_id: string, params: ProductParams)     => Promise<AxiosResponse<SingleResponse<ProductObject>>>;
    delete: (shop_id: string, product_id: string)                            => Promise<AxiosResponse<null>>;
    changeStatus:     (shop_id: string, product_id: string, enabled: boolean) => Promise<AxiosResponse<SingleResponse<ProductObject>>>;
    assignCategories: (shop_id: string, product_id: string, category_ids: Array<string>, replace?: boolean) => Promise<AxiosResponse<SingleResponse<ProductObject>>>;
}

export interface VariantsInterface {
    get:    (shop_id: string, product_id: string)                                       => Promise<AxiosResponse<ListResponse<VariantObject>>>;
    sync:   (shop_id: string, product_id: string, variants: Array<VariantParams>)       => Promise<AxiosResponse<SingleResponse<ProductObject>>>;
    update: (shop_id: string, product_id: string, variant_id: string, params: VariantParams) => Promise<AxiosResponse<SingleResponse<ProductObject>>>;
    delete: (shop_id: string, product_id: string, variant_id: string)                   => Promise<AxiosResponse<SingleResponse<ProductObject>>>;
}

export interface CategoriesInterface {
    get:    (shop_id: string, params?: GetCategoriesParams)                  => Promise<AxiosResponse<ListResponse<CategoryObject>>>;
    find:   (shop_id: string, category_id: string)                           => Promise<AxiosResponse<SingleResponse<CategoryObject>>>;
    create: (shop_id: string, params: CategoryParams)                        => Promise<AxiosResponse<SingleResponse<CategoryObject>>>;
    update: (shop_id: string, category_id: string, params: CategoryParams)   => Promise<AxiosResponse<SingleResponse<CategoryObject>>>;
    delete: (shop_id: string, category_id: string)                           => Promise<AxiosResponse<null>>;
    getProducts:     (shop_id: string, category_id: string, params?: ListParams)    => Promise<AxiosResponse<ListResponse<ProductObject>>>;
    assignProduct:   (shop_id: string, category_id: string, product_id: string)     => Promise<AxiosResponse<SingleResponse<ProductObject>>>;
    unassignProduct: (shop_id: string, category_id: string, product_id: string)     => Promise<AxiosResponse<null>>;
}

export interface CustomersInterface {
    get:    (shop_id: string, params?: GetCustomersParams)                   => Promise<AxiosResponse<ListResponse<CustomerObject>>>;
    find:   (shop_id: string, customer_id: string)                           => Promise<AxiosResponse<SingleResponse<CustomerObject>>>;
    create: (shop_id: string, params: CustomerParams)                        => Promise<AxiosResponse<SingleResponse<CustomerObject>>>;
    update: (shop_id: string, customer_id: string, params: CustomerParams)   => Promise<AxiosResponse<SingleResponse<CustomerObject>>>;
    delete: (shop_id: string, customer_id: string)                           => Promise<AxiosResponse<null>>;
}

export interface OrdersInterface {
    get:    (shop_id: string, params?: GetOrdersParams)                      => Promise<AxiosResponse<ListResponse<OrderObject>>>;
    find:   (shop_id: string, order_id: string)                              => Promise<AxiosResponse<SingleResponse<OrderObject>>>;
    create: (shop_id: string, params: CreateOrderParams)                     => Promise<AxiosResponse<SingleResponse<OrderObject>>>;
    update: (shop_id: string, order_id: string, params: UpdateOrderParams)   => Promise<AxiosResponse<SingleResponse<OrderObject>>>;
    delete: (shop_id: string, order_id: string)                              => Promise<AxiosResponse<null>>;
}

export interface CartsInterface {
    get:    (shop_id: string, params?: ListParams)                           => Promise<AxiosResponse<ListResponse<CartObject>>>;
    find:   (shop_id: string, cart_id: string)                               => Promise<AxiosResponse<SingleResponse<CartObject>>>;
    update: (shop_id: string, cart_id: string, params: UpdateCartParams)     => Promise<AxiosResponse<SingleResponse<CartObject>>>;
}

export interface CartItemsInterface {
    get:    (shop_id: string, cart_id: string, params?: ListParams)                          => Promise<AxiosResponse<ListResponse<CartItemObject>>>;
    find:   (shop_id: string, cart_id: string, item_id: string)                              => Promise<AxiosResponse<SingleResponse<CartItemObject>>>;
    create: (shop_id: string, cart_id: string, params: CartItemParams)                       => Promise<AxiosResponse<SingleResponse<CartItemObject>>>;
    update: (shop_id: string, cart_id: string, item_id: string, params: CartItemParams)      => Promise<AxiosResponse<SingleResponse<CartItemObject>>>;
    delete: (shop_id: string, cart_id: string, item_id: string)                              => Promise<AxiosResponse<null>>;
}

export interface ImportsInterface {
    products:   (shop_id: string, products: Array<ProductParams>)      => Promise<AxiosResponse>;
    categories: (shop_id: string, categories: Array<CategoryParams>)   => Promise<AxiosResponse>;
    customers:  (shop_id: string, customers: Array<CustomerParams>)    => Promise<AxiosResponse>;
    orders:     (shop_id: string, orders: Array<CreateOrderParams>)    => Promise<AxiosResponse>;
}

export interface ListParams {
    limit?: number;
    page?:  number;
}

export interface GetProductsParams extends ListParams {
    filter?: {
        name?:                      string;
        type?:                      ProductType;
        enabled?:                   boolean;
        category?:                  string;
        exclude_from_automations?:  boolean;
    };
    sort?: string;
}

export interface GetCategoriesParams extends ListParams {
    filter?: {
        exclude_from_automations?:  boolean;
    };
}

export interface GetCustomersParams extends ListParams {
    filter?: {
        email?: string;
    };
    sort?: string;
}

export interface GetOrdersParams extends ListParams {
    filter?: {
        status?:        OrderStatus;
        customer?:      string;
        attributed?:    boolean;
        email_id?:      string;
    };
    sort?: string;
}

export interface ShopStatsParams {
    start_date: string;
    end_date:   string;
}

export interface EcommerceReportParams {
    shop_id: string;
}

export interface EcommerceReportOrdersParams extends EcommerceReportParams, ListParams {}

export interface AutomationEcommerceStatsParams {
    shop_id?:       string;
    start_date?:    string;
    end_date?:      string;
}

export interface AutomationEcommerceOrdersParams extends ListParams {
    time_frame:         'week' | 'month' | 'two_months' | 'three_months' | 'six_months' | 'year' | 'last_year' | 'all_time' | 'custom';
    time_frame_start?:  string;
    time_frame_end?:    string;
    ecommerce_shop_id?: string;
}

export type ProductType = 'one-time' | 'subscription' | 'booking';
export type OrderStatus = 'pending' | 'complete';

export interface CreateShopParams {
    name:           string;
    url:            string;
    currency:       string;
    platform?:      string;
    group_id?:      string;
    enable_popups?: boolean;
    enabled?:       boolean;
    access_data?:   string;
}

export interface UpdateShopParams extends Partial<CreateShopParams> {}

export interface ProductParams {
    name?:                      string;
    resource_id?:               string;
    price?:                     number;
    url?:                       string;
    image?:                     string;
    short_description?:         string;
    description?:               string;
    exclude_from_automations?:  boolean;
    enabled?:                   boolean;
    type?:                      ProductType;
    categories?:                Array<string>;
    variants?:                  Array<VariantParams>;
}

export interface VariantParams {
    name:           string;
    attributes:     Record<string, string>;
    price_type?:    'fixed' | 'increment';
    price?:         number;
    resource_id?:   string | null;
    image_url?:     string | null;
}

export interface CategoryParams {
    name?:                      string;
    resource_id?:               string;
    exclude_from_automations?:  boolean;
}

export interface CustomerParams {
    email?:             string;
    name?:              string;
    last_name?:         string;
    accepts_marketing?: boolean;
    total_spent?:       number;
    orders_count?:      number;
    create_subscriber?: boolean;
    resource_id?:       string;
    subscriber_fields?: Record<string, unknown>;
}

export interface CartItemParams {
    ecommerce_product_id?:          string;
    product_resource_id?:           string;
    ecommerce_product_variant_id?:  string | null;
    variant?:                       string;
    quantity?:                      number;
    price?:                         number;
    resource_id?:                   string;
}

export interface CreateOrderParams {
    customer:               CustomerParams;
    cart: {
        items:              Array<CartItemParams>;
        checkout_url?:      string;
        cart_total?:        number;
        resource_id?:       string;
    };
    status?:                OrderStatus;
    stage?:                 'cart' | 'checkout';
    total_price?:           number;
    resource_id?:           string;
    created_at?:            string;
    without_automations?:   boolean;
}

export interface UpdateOrderParams {
    status?:                OrderStatus;
    stage?:                 'cart' | 'checkout';
    total_price?:           number;
    without_automations?:   boolean;
}

export interface UpdateCartParams {
    checkout_url?:          string;
    cart_total?:            number;
    ecommerce_customer_id?: string;
    resource_id?:           string;
}

export interface ListResponse<T> {
    data:   Array<T>;
    links:  Links;
    meta:   Meta;
}

export interface SingleResponse<T> {
    data: T;
}

export interface ShopObject {
    id:                 string;
    name:               string;
    url:                string;
    currency:           string;
    currency_sign:      string;
    platform:           string;
    enabled:            boolean;
    enable_popups:      boolean;
    enable_resubscribe: boolean;
    group:              GroupObject | null;
    created_at:         string;
    updated_at:         string;
}

export interface ProductObject {
    id:                         string;
    name:                       string;
    resource_id:                string | null;
    price:                      number;
    currency:                   string | null;
    url:                        string | null;
    image:                      string | null;
    short_description:          string | null;
    description:                string | null;
    type:                       ProductType | null;
    enabled:                    boolean;
    exclude_from_automations:   boolean;
    categories:                 Array<CategoryObject>;
    variants:                   Array<VariantObject>;
    created_at:                 string;
}

export interface VariantObject {
    id:             string;
    name:           string;
    attributes:     Record<string, string>;
    price:          number | null;
    price_type:     'fixed' | 'increment' | null;
    resource_id:    string | null;
    image_url:      string | null;
}

export interface CategoryObject {
    id:                         string;
    resource_id:                string | null;
    name:                       string;
    exclude_from_automations:   boolean;
    created_at:                 string;
    updated_at:                 string;
}

export interface CustomerObject {
    id:                 string;
    resource_id:        string | null;
    email:              string;
    accepts_marketing:  boolean;
    total_spent:        number | null;
    orders_count:       number | null;
    subscriber:         SubscriberObject | null;
}

export interface CartItemObject {
    id:                             string;
    resource_id:                    string | null;
    product:                        ProductObject;
    ecommerce_product_variant_id:   string | null;
    variant:                        string | null;
    quantity:                       number;
    price:                          number;
}

export interface CartObject {
    id:             string;
    resource_id:    string | null;
    checkout_url:   string | null;
    cart_total:     number;
    items:          Array<CartItemObject>;
}

export interface OrderObject {
    id:             string;
    resource_id:    string | null;
    customer:       CustomerObject;
    cart:           CartObject;
    total:          number;
    status:         OrderStatus;
    stage:          'cart' | 'checkout' | null;
    created_at:     string;
    updated_at:     string;
    completed_at:   string | null;
    attribution?:   { email_id: string; type: 'campaign' | 'automation' } | null;
}

export interface EcommerceStats {
    orders_count:           number;
    revenue:                number;
    average_order_value:    number;
    conversion_rate?:       number;
}

export interface ShopStats {
    ecommerce:  EcommerceStats;
    series:     Array<Record<string, unknown>>;
}

export interface EcommerceStatsResponse {
    data: {
        ecommerce:              EcommerceStats;
        best_performing_email?: Record<string, unknown> | null;
    };
}

export interface EcommerceReportOrder {
    subscriber: {
        email:  string;
        id:     string;
    };
    total:      number;
    updated_at: string;
    order:      string | null;
}

export interface SettingsResponse {
    data: {
        ecommerce_tracking_in_campaigns:    boolean;
        ecommerce_tracking_in_automations:  boolean;
        ecommerce_attribution_window:       number;
    };
}
