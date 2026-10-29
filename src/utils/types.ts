import {GroupObject} from "../modules/groups/groups.types";

export interface Config {
    basePath: string;
    api_key: string;
}

export interface Stats {
    sent:               number;
    opens_count:        number;
    unique_opens_count: number;
    open_rate: {
        float:          number;
        string:         string;
    };
    clicks_count:       number;
    unique_clicks_count:number;
    click_rate: {
        float:          number;
        string:         string;
    };
    unsubscribes_count: number;
    unsubscribe_rate: {
        float:          number;
        string:         string;
    };
    spam_count:         number;
    spam_rate: {
        float:          number;
        string:         string;
    };
    hard_bounces_count: number;
    hard_bounce_rate: {
        float:          number;
        string:         string;
    };
    soft_bounces_count: number;
    soft_bounce_rate: {
        float:          number;
        string:         string;
    };
}

export interface Links {
    first:  string;
    last:   string;
    prev:   string;
    next:   string;
}

export interface Meta {
    current_page:   number;
    from:           number;
    last_page:      number;
    links:          Array<MetaLinks>;
    path:           string;
    per_page:       number;
    to:             number;
    total:          number;
}

export interface MetaLinks {
    url:    string;
    label:  string;
    active: boolean;
}

export interface SubscriberObject {
    id:               string;
    email:            string;
    status:           'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk' | (string & {});
    source:           'import' | 'api' | (string & {});
    sent:             number;
    opens_count:      number;
    clicks_count:     number;
    open_rate:        number;
    click_rate:       number;
    ip_address:       null | string;
    subscribed_at:    string;        // "YYYY-MM-DD HH:mm:ss"
    unsubscribed_at:  null | string; // "YYYY-MM-DD HH:mm:ss"
    created_at:       string;        // "YYYY-MM-DD HH:mm:ss"
    updated_at:       string;        // "YYYY-MM-DD HH:mm:ss"
    fields: {
        name:         null | string;
        last_name:    null | string;
        city:         null | string;
        company:      null | string;
        country:      null | string;
        phone:        null | string;
        state:        null | string;
        z_i_p:        null | string;
    };
    groups?:          Array<GroupObject>; // In some endpoints groups are excluded by default. They get added when `include` param is used in request
    opted_in_at:      null | string;
    optin_ip:         null | string;
}


export interface EcommerceStats {
    orders_count:           number;
    revenue:                number;
    average_order_value:    number;
    conversion_rate?:       number;
}

export interface EcommerceCategoryObject {
    id:                         string;
    resource_id:                null | string;
    name:                       string;
    exclude_from_automations:   boolean;
    created_at:                 string;
    updated_at:                 string;
}

export interface EcommerceProductVariantObject {
    id:             string;
    resource_id:    null | string;
    name:           string;
    attributes:     Record<string, string> | Array<{ name: string; value: string }>;
    price:          null | number;
    price_type:     null | 'fixed' | 'increment' | (string & {});
    image_url:      null | string;
}

export interface EcommerceProductObject {
    id:                         string;
    resource_id:                null | string;
    name:                       string;
    price:                      number;
    currency:                   null | string;
    url:                        null | string;
    image:                      null | string;
    short_description:          null | string;
    description:                null | string;
    type:                       null | 'one-time' | 'subscription' | 'booking' | (string & {});
    enabled:                    boolean;
    exclude_from_automations:   boolean;
    categories:                 Array<EcommerceCategoryObject>;
    variants:                   Array<EcommerceProductVariantObject>;
    created_at:                 string;
}

export interface EcommerceCustomerObject {
    id:                 string;
    resource_id:        null | string;
    email:              string;
    accepts_marketing:  boolean;
    total_spent:        null | number;
    orders_count:       null | number;
    subscriber:         null | SubscriberObject;
}

export interface EcommerceCartItemObject {
    id:                             string;
    resource_id:                    null | string;
    product:                        EcommerceProductObject;
    ecommerce_product_variant_id:   null | string;
    variant:                        null | string;
    quantity:                       number;
    price:                          number;
}

export interface EcommerceCartObject {
    id:             string;
    resource_id:    null | string;
    checkout_url:   null | string;
    cart_total:     number;
    items:          Array<EcommerceCartItemObject>;
}

export interface EcommerceOrderObject {
    id:             string;
    resource_id:    null | string;
    customer:       EcommerceCustomerObject;
    cart:           EcommerceCartObject;
    total:          number;
    status:         'pending' | 'complete' | (string & {});
    stage:          null | 'cart' | 'checkout' | (string & {});
    created_at:     string;
    updated_at:     string;
    completed_at:   null | string;
    attribution?:   null | {
        email_id:   string;
        type:       'campaign' | 'automation' | (string & {});
    };
}

export interface EcommerceReportOrderObject {
    subscriber: {
        email:  string;
        id:     string;
    };
    total:      number;
    updated_at: string;
    order:      null | string;
}

export interface EcommerceProductParams {
    name?:                      string;
    resource_id?:               string;
    price?:                     number;
    url?:                       string;
    image?:                     string;
    short_description?:         string;
    description?:               string;
    exclude_from_automations?:  boolean;
    enabled?:                   boolean;
    type?:                      'one-time' | 'subscription' | 'booking';
    categories?:                Array<string>;
    variants?:                  Array<EcommerceProductVariantParams>;
}

export interface EcommerceProductVariantParams {
    name:           string;
    attributes:     Record<string, string>;
    price_type?:    'fixed' | 'increment';
    price?:         number;
    resource_id?:   null | string;
    image_url?:     null | string;
}

export interface EcommerceCategoryParams {
    name?:                      string;
    resource_id?:               string;
    exclude_from_automations?:  boolean;
}

export interface EcommerceCustomerParams {
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

export interface EcommerceCartItemParams {
    ecommerce_product_id?:          string;
    product_resource_id?:           string;
    ecommerce_product_variant_id?:  null | string;
    variant?:                       string;
    quantity?:                      number;
    price?:                         number;
    resource_id?:                   string;
}

export interface EcommerceOrderParams {
    customer:               EcommerceCustomerParams;
    cart: {
        items:              Array<EcommerceCartItemParams>;
        checkout_url?:      string;
        cart_total?:        number;
        resource_id?:       string;
    };
    status?:                'pending' | 'complete';
    stage?:                 'cart' | 'checkout';
    total_price?:           number;
    resource_id?:           string;
    created_at?:            string;
    without_automations?:   boolean;
}

export interface EcommerceBestPerformingEmail {
    email_id:               string;
    id:                     string;
    subject:                string;
    screenshot_url:         null | string;
    sent_count:             number;
    orders_count:           number;
    revenue:                number;
    average_order_value:    number;
    created_at:             null | string;
}
