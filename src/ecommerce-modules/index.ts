import type { Config }  from '../utils/types.js'

import Shop from './shops/shops.module.js';
import { ShopsInterface } from "./shops/shops.types.js";

import Product from './products/products.module.js';
import { ProductsInterface } from "./products/products.types.js";

import ProductVariant from './product-variants/product-variants.module.js';
import { ProductVariantsInterface } from "./product-variants/product-variants.types.js";

import Category from './categories/categories.module.js';
import { CategoriesInterface } from "./categories/categories.types.js";

import CategoryProduct from './categories-products/categories-products.module.js';
import { CategoriesProductsInterface } from "./categories-products/categories-products.types.js";

import Customer from './customers/customers.module.js';
import { CustomersInterface } from "./customers/customers.types.js";

import Order from './orders/orders.module.js';
import { OrdersInterface } from "./orders/orders.types.js";

import Cart from './carts/carts.module.js';
import { CartsInterface } from "./carts/carts.types.js";

import CartItem from './cart-items/cart-items.module.js';
import { CartItemsInterface } from "./cart-items/cart-items.types.js";

import Import from './import/import.module.js';
import { ImportInterface } from "./import/import.types.js";

import Setting from './settings/settings.module.js';
import { EcommerceSettingsInterface } from "./settings/settings.types.js";

export interface EcommerceInterface {
    shops:              ShopsInterface;
    products:           ProductsInterface;
    productVariants:    ProductVariantsInterface;
    categories:         CategoriesInterface;
    categoriesProducts: CategoriesProductsInterface;
    customers:          CustomersInterface;
    orders:             OrdersInterface;
    carts:              CartsInterface;
    cartItems:          CartItemsInterface;
    import:             ImportInterface;
    settings:           EcommerceSettingsInterface;
}

export default class Ecommerce implements EcommerceInterface {
    public shops: ShopsInterface;
    public products: ProductsInterface;
    public productVariants: ProductVariantsInterface;
    public categories: CategoriesInterface;
    public categoriesProducts: CategoriesProductsInterface;
    public customers: CustomersInterface;
    public orders: OrdersInterface;
    public carts: CartsInterface;
    public cartItems: CartItemsInterface;
    public import: ImportInterface;
    public settings: EcommerceSettingsInterface;

    constructor(config: Config) {
        this.shops = new Shop(config);
        this.products = new Product(config);
        this.productVariants = new ProductVariant(config);
        this.categories = new Category(config);
        this.categoriesProducts = new CategoryProduct(config);
        this.customers = new Customer(config);
        this.orders = new Order(config);
        this.carts = new Cart(config);
        this.cartItems = new CartItem(config);
        this.import = new Import(config);
        this.settings = new Setting(config);
    }
};

export * from "./shops/shops.types.js";
export * from "./products/products.types.js";
export * from "./product-variants/product-variants.types.js";
export * from "./categories/categories.types.js";
export * from "./categories-products/categories-products.types.js";
export * from "./customers/customers.types.js";
export * from "./orders/orders.types.js";
export * from "./carts/carts.types.js";
export * from "./cart-items/cart-items.types.js";
export * from "./import/import.types.js";
export * from "./settings/settings.types.js";
