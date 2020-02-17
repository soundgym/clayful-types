//  https://github.com/Clayful/clayful-js/tree/master/lib/models-js
declare module "clayful" {
    import * as axios from "axios";

    export interface IClayfulHeadersOptions {
        language?: string;
        currency?: string;
        timeZone?: string;
        client?: string;
        customer?: string;
        reCAPTCHA?: string;
        debugLanguage?: string;
        headers?: IClayfulHeaders;
    }

    export interface IClayfulHeaders {
        "Accept-Language"?: IClayfulHeadersOptions["language"];
        "Accept-Currency"?: IClayfulHeadersOptions["currency"];
        "Accept-Time-Zone"?: IClayfulHeadersOptions["timeZone"];
        Authorization?: IClayfulHeadersOptions["client"];
        "Authorization-Customer"?: IClayfulHeadersOptions["customer"];
        "reCAPTCHA-Response"?: IClayfulHeadersOptions["reCAPTCHA"];
        "Accept-Debug-Language"?: IClayfulHeadersOptions["debugLanguage"];
    }

    export interface IClayfulConfig {
        client?: string;
        customer?: string;
        debugLanguage?: "ko";
    }

    export interface IClayfulTimeFormat {
        //"2018-09-19T04:22:30.195Z";
        raw: string;
        //"2018년 9월 19일 수요일";
        formatted: string;
        //"3분 전";
        ago: string;
    }

    export interface IClayfulPriceFormat {
        raw: number;
        convertedRaw: number;
        formatted: string;
        converted: string;
    }

    export interface IClayfulCountFormat {
        count: {
            raw: number;
            formatted: string;
            converted: string;
        };
    }

    // https://www.notion.so/ac4b1c6e6d3f4364974cd93120bf2b9d#2312a542910e47f4a312f1478412335f
    export interface IClayfulRequestOptions<Query> extends IClayfulConfig {
        query?: Query;
        currency?: string;
        timeZone?: string;
        reCAPTCHA?: string;
        language?: string;
    }

    export interface IClayfulError extends Error {
        code: string;
        message: string;
        model: string;
        method: string;
        status: number;

        name: "ClayfulError";
        stack?: string;

        headers: any;
        validation: any;
        isClayful: true;
    }

    //https://dev.clayful.io/ko/node/apis/customer/create
    export namespace Customer {
        interface ICustomer {
            count: (
                options: IClayfulRequestOptions<object> | null,
                callback: (
                    err: IClayfulError,
                    result: axios.AxiosResponse<IClayfulCountFormat>,
                ) => void,
            ) => void;
            create: (
                payload: ICustomerPayload,
                options: IClayfulRequestOptions<object> | null,
                callback: (err: IClayfulError, result: axios.AxiosResponse<ICustomerItem>) => void,
            ) => void;
            delete: (
                customerId: string,
                options: IClayfulRequestOptions<object> | null,
                callback: (err: IClayfulError, result: axios.AxiosResponse<null>) => void,
            ) => void;
            get: (
                customerId: string,
                options: IClayfulRequestOptions<object> | null,
                callback: (err: IClayfulError, result: axios.AxiosResponse<ICustomerItem>) => void,
            ) => void;
            list: (
                options: IClayfulRequestOptions<object> | null,
                callback: (
                    err: IClayfulError,
                    result: axios.AxiosResponse<ICustomerItem[]>,
                ) => void,
            ) => void;
            update: (
                customerId: string,
                payload: ICustomerPayload,
                options: IClayfulRequestOptions<object> | null,
                callback: (err: IClayfulError, result: axios.AxiosResponse<ICustomerItem>) => void,
            ) => void;

            // App
            authenticate: (
                payload: IAuthPayload,
                options: IClayfulRequestOptions<object> | null,
                callback: (err: IClayfulError, result: axios.AxiosResponse<IAuthResponse>) => void,
            ) => void;
            isAuthenticated: (
                options: IClayfulRequestOptions<object> | null,
                callback: (
                    err: IClayfulError,
                    result: axios.AxiosResponse<{ authenticated: boolean }>,
                ) => void,
            ) => void;
            getMe: (
                options: IClayfulRequestOptions<object> | null,
                callback: (err: IClayfulError, result: axios.AxiosResponse<ICustomerItem>) => void,
            ) => void;
            deleteMe: (
                options: IClayfulRequestOptions<object> | null,
                callback: (err: IClayfulError, result: axios.AxiosResponse<null>) => void,
            ) => void;
            updateMe: (
                payload: ICustomerPayload,
                options: IClayfulRequestOptions<object> | null,
                callback: (err: IClayfulError, result: axios.AxiosResponse<ICustomerItem>) => void,
            ) => void;
            listCouponsForMe: (
                options: IClayfulRequestOptions<object> | null,
                callback: (
                    err: IClayfulError,
                    result: axios.AxiosResponse<IUserCouponItem[]>,
                ) => void,
            ) => void;
            countCouponsForMe: (
                options: IClayfulRequestOptions<object> | null,
                callback: (
                    err: IClayfulError,
                    result: axios.AxiosResponse<IClayfulCountFormat>,
                ) => void,
            ) => void;
        }

        interface IAuthResponse {
            customer: string;
            token: string;
            expiresIn: number;
        }

        interface IAuthPayload {
            userId?: String;
            email?: String;
            password?: String;
        }

        interface IUserCouponItem extends Coupon.ICouponItem {
            issuedAt: IClayfulTimeFormat;
        }

        interface ICustomerPayload {
            connect?: boolean;
            verified?: boolean;
            groups?: string[];
            userId: string | null;
            alias?: string | null;
            email?: string | null;
            password?: string | null;
            avatar?: string | null;
            name?: {
                first?: string | null;
                last?: string | null;
                full?: string | null;
            };
            address?: {
                primary?: {
                    name?: {
                        first?: string | null;
                        last?: string | null;
                        full?: string | null;
                    };
                    company?: string | null;
                    postcode?: string | null;
                    country?: string;
                    state?: string | null;
                    city?: string;
                    address1?: string;
                    address2?: string | null;
                    mobile?: string | null;
                    phone?: string | null;
                };
                secondaries?: {
                    name?: {
                        first?: string | null;
                        last?: string | null;
                        full?: string | null;
                    };
                    company?: string | null;
                    postcode?: string | null;
                    country?: string;
                    state?: string | null;
                    city?: string;
                    address1?: string;
                    address2?: string | null;
                    mobile?: string | null;
                    phone?: string | null;
                }[];
            };
            mobile?: string | null;
            phone?: string | null;
            gender?: string | "male" | "female" | null;
            birthdate?: string | null;
            country?: string | null;
            language?: string | null;
            currency?: string | null;
            timezone?: string | null;
            meta?: object;
            deactivated?: boolean;
        }

        interface ICustomerItem {
            _id: string;
            name: {
                first: string | null;
                last: string | null;
                full: string | null;
            };
            address: {
                primary: null;
                secondaries: any[];
            };
            connect: boolean;
            verified: boolean;
            groups: any[];
            userId: string;
            alias: string | null;
            email: string | null;
            avatar: null | {
                _id: string;
                url: string;
            };
            gender: string | null;
            birthdate: string | null;
            country: string | null;
            mobile: string | null;
            phone: string | null;
            language: string | null;
            currency: string | null;
            timezone: string | null;
            deactivatedAt: IClayfulTimeFormat | null;
            lastLoggedInAt: IClayfulTimeFormat | null;
            social: any[];
            meta: object;
            createdAt: IClayfulTimeFormat;
            updatedAt: IClayfulTimeFormat;
        }
    }

    //https://dev.clayful.io/ko/node/apis/product/list
    export namespace Product {
        interface IProduct {
            list: (
                options: IClayfulRequestOptions<object> | null,
                callback: (err: IClayfulError, result: axios.AxiosResponse<IProductItem[]>) => void,
            ) => void;
            count: (
                options: IClayfulRequestOptions<object> | null,
                callback: (
                    err: IClayfulError,
                    result: axios.AxiosResponse<IClayfulCountFormat>,
                ) => void,
            ) => void;
            get: (
                productId: string,
                options: IClayfulRequestOptions<object> | null,
                callback: (err: IClayfulError, result: axios.AxiosResponse<IProductItem>) => void,
            ) => void;
        }

        interface IPrice {
            original: {
                raw: number;
                convertedRaw: number;
                formatted: string;
                converted: string;
            };
            sale: {
                raw: number;
                convertedRaw: number;
                formatted: string;
                converted: string;
            };
        }

        interface IDiscountPrice {
            type: null;
            value: null;
            discounted: {
                raw: number;
                convertedRaw: number;
                formatted: string;
                converted: string;
            };
        }

        interface IProductItem {
            _id: string;
            name: string;
            summary: string;
            description: string;
            price: IPrice;
            discount: IDiscountPrice;
            shipping: {
                methods: [
                    {
                        _id: string;
                        name: string;
                        slug: string;
                    },
                ];
                calculation: string;
            };
            rating: {
                count: {
                    raw: number;
                    formatted: string;
                    converted: string;
                };
                sum: {
                    raw: number;
                    formatted: string;
                    converted: string;
                };
                average: {
                    raw: number;
                    formatted: string;
                    converted: string;
                };
            };
            bundled: boolean;
            available: boolean;
            thumbnail: {
                _id: string;
                url: string;
            };
            taxCategories: [];
            totalReview: {
                raw: number;
                formatted: string;
                converted: string;
            };
            brand?: {
                _id: string;
                name: string;
                slug: string;
            };
            collections: {
                path: {
                    _id: string;
                    name: string;
                    slug: string;
                }[];
            }[];
            catalogs: {
                title: string;
                description: string;
                image: null | {
                    _id: string;
                    url: string;
                };
            }[];

            options: {
                _id: string;
                name: string;
                priority: number;
                variations: {
                    value: string;
                    priority: number;
                    _id: string;
                }[];
            }[];

            variants: {
                price: IPrice;
                discount: IDiscountPrice;
                available: boolean;
                thumbnail: null | string;
                quantity: {
                    raw: number;
                    formatted: string;
                    converted: string;
                };
                sku: string;
                types: {
                    option: {
                        name: string;
                        priority: number;
                        _id: string;
                    };
                    variation: {
                        value: string;
                        priority: number;
                        _id: string;
                    };
                }[];
                weight: {
                    raw: number;
                    formatted: string;
                    converted: string;
                };
                width: {
                    raw: number;
                    formatted: string;
                    converted: string;
                };
                height: {
                    raw: number;
                    formatted: string;
                    converted: string;
                };
                depth: {
                    raw: number;
                    formatted: string;
                    converted: string;
                };
                _id: string;
            }[];

            bundles: [];
            meta: {};
            createdAt: IClayfulTimeFormat;
            updatedAt: IClayfulTimeFormat;
            type: string;
            slug: string;
        }
    }

    // https://dev.clayful.io/ko/node/apis/cart/get
    export namespace Cart {
        interface ICart {}
    }

    //https://dev.clayful.io/ko/node/apis/order/list
    export namespace Order {
        interface IOrder {}
    }

    //https://dev.clayful.io/ko/node/apis/coupon/list
    export namespace Coupon {
        interface ICoupon {}

        interface ICouponItem {
            _id: string;
            name: string;
            description: string;
            discount: {
                min: null;
                max: null;
                type: string;
                value: IClayfulCountFormat;
            };
            amount: {
                total: IClayfulCountFormat | null;
                used: IClayfulCountFormat;
                left: IClayfulCountFormat | null;
                issued: IClayfulCountFormat;
                unissued: IClayfulCountFormat | null;
            };
            category: {
                type: string;
            };
            price: {
                min: IClayfulPriceFormat;
                max: null;
            };
            subscription: {
                type: null;
                value: null;
            };
            active: boolean;
            only: boolean;
            expiresAt: IClayfulTimeFormat;
            type: string;
            meta: {};
            slug: string;
            createdAt: IClayfulTimeFormat;
            updatedAt: IClayfulTimeFormat;
        }
    }

    //https://dev.clayful.io/ko/node/apis/discount/list
    export namespace Discount {
        interface IDiscount {}
    }

    const Clayful: {
        config: (configs: IClayfulConfig) => void;
        Customer: Customer.ICustomer;
        Product: Product.IProduct;
        Cart: Cart.ICart;
        Order: Order.IOrder;
        Coupon: Coupon.ICoupon;
        Discount: Discount.IDiscount;
    };

    export default Clayful;
}
