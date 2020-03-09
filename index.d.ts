//  https://github.com/Clayful/clayful-js/tree/master/lib/models-js
declare module "clayful" {
  import { AxiosResponse } from "axios";

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

  export interface IClayfulCustomField {
    [key: string]: any;
  }

  export interface IClayfulAddress {
    name: ICustomerName;
    state: string;
    city: string;
    country: "KR";
    address1: string;
    address2?: string;
    mobile: string;
    postcode: string;
    phone?: string;
    company?: string;
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

  export interface IClayfulTaxedPriceFormat {
    original: IClayfulPriceFormat;
    sale: IClayfulPriceFormat;
    withTax: IClayfulPriceFormat;
    withoutTax: IClayfulPriceFormat;
  }

  export interface IClayfulCountFormat {
    count: IClayfulNumberFormat;
  }

  export interface IClayfulNumberFormat {
    raw: number;
    formatted: string;
    converted: string;
  }

  // https://www.notion.so/ac4b1c6e6d3f4364974cd93120bf2b9d#2312a542910e47f4a312f1478412335f
  type IClayfulRequestOptions<T> = IClayfulRequestWithQuery<T> | null;
  export interface IClayfulRequestWithQuery<Query> extends IClayfulConfig {
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

  export interface ICustomerName {
    first?: string;
    last?: string;
    full?: string;
  }

  //https://dev.clayful.io/ko/node/apis/customer/create
  export namespace Customer {
    interface ICustomer {
      /** 고객 수를 세어옵니다. **/
      count: (
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<IClayfulCountFormat>) => void
      ) => void;

      /** 새로운 고객을 가입시킵니다. **/
      create: (
        payload: ICustomerPayload,
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<ICustomerItem>) => void
      ) => void;

      /** 고객 한명을 삭제합니다. **/
      delete: (
        customerId: string,
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<null>) => void
      ) => void;

      /** 고객 한명을 가져옵니다. **/
      get: (
        customerId: string,
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<ICustomerItem>) => void
      ) => void;

      /** 고객 목록을 가져옵니다. **/
      list: (
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<ICustomerItem[]>) => void
      ) => void;

      /** 고객을 수정합니다. **/
      update: (
        customerId: string,
        payload: ICustomerPayload,
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<ICustomerItem>) => void
      ) => void;

      /** 고객을 로그인 시킵니다. **/
      authenticate: (
        payload: IAuthPayload,
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<IAuthResponse>) => void
      ) => void;

      /** 고객의 로그인 여부를 확인합니다. **/
      isAuthenticated: (
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<{ authenticated: boolean }>) => void
      ) => void;

      /** 내 정보를 가져옵니다. **/
      getMe: (
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<ICustomerItem>) => void
      ) => void;

      /** 내 정보를 삭제하고, 서비스를 탈퇴합니다. **/
      deleteMe: (
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<null>) => void
      ) => void;

      /** 내 정보를 업데이트 합니다. **/
      updateMe: (
        payload: ICustomerMePayload,
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<ICustomerItem>) => void
      ) => void;

      /** 내 쿠폰 목록을 조회합니다. **/
      listCouponsForMe: (
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<IUserCouponItem[]>) => void
      ) => void;

      /** 내 쿠폰 수를 세어옵니다. **/
      countCouponsForMe: (
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<IClayfulCountFormat>) => void
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
      userId?: string;
      alias?: string;
      email?: string;
      password?: string;
      avatar?: string;
      name?: ICustomerName;
      address?: {
        primary?: IClayfulAddress;
        secondaries?: IClayfulAddress[];
      };
      mobile?: string;
      phone?: string;
      gender?: string | "male" | "female";
      birthdate?: string;
      country?: string;
      language?: string;
      currency?: string;
      timezone?: string;
      meta?: object;
      deactivated?: boolean;
    }

    interface ICustomerMePayload {
      alias?: string;
      avatar?: string;
      name: ICustomerName;
      /** primary 혹은 secondaries 둘 중 하나는 필수 */
      address: {
        primary?: {
          name: ICustomerName;
          company?: string;
          postcode?: string;
          country: string;
          state?: string;
          city: string;
          address1: string;
          address2?: string;
          mobile?: string;
          phone?: string;
        };
        secondaries?: {
          name: ICustomerName;
          company?: string;
          postcode?: string;
          country: string;
          state?: string;
          city: string;
          address1: string;
          address2?: string;
          mobile?: string;
          phone?: string;
        }[];
      };
      mobile?: string;
      phone?: string;
      gender?: string | "male" | "female";
      birthdate?: Date;
      country?: string;
      language?: string;
      currency?: string;
      timezone?: string;
      meta: Object;
    }

    interface ICustomerItem {
      _id: string;
      name: ICustomerName;
      address: {
        primary: null | IClayfulAddress;
        secondaries: IClayfulAddress[];
      };
      connect: boolean;
      verified: boolean;
      groups: any[];
      userId: string;
      alias: null | string;
      email: null | string;
      avatar: null | {
        _id: string;
        url: string;
      };
      gender: null | string;
      birthdate: null | string;
      country: null | string;
      mobile: null | string;
      phone: null | string;
      language: null | string;
      currency: null | string;
      timezone: null | string;
      deactivatedAt: null | IClayfulTimeFormat;
      lastLoggedInAt: null | IClayfulTimeFormat;
      social: any[];
      meta: IClayfulCustomField;
      createdAt: IClayfulTimeFormat;
      updatedAt: IClayfulTimeFormat;
    }
  }

  //https://dev.clayful.io/ko/node/apis/product/list
  export namespace Product {
    interface IProduct {
      /** 상품 목록을 가져옵니다. */
      list: (
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<IProductItem[]>) => void
      ) => void;

      /** 상의 수를 세어옵니다. */
      count: (
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<IClayfulCountFormat>) => void
      ) => void;

      /** 상품 하나를 가져옵니다. */
      get: (
        productId: string,
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, result: AxiosResponse<IProductItem>) => void
      ) => void;
    }

    type ProductType = "tangible" | "downloadable" | "ticket" | "custom";

    interface IProductPrice {
      original: IClayfulPriceFormat;
      sale: IClayfulPriceFormat;
    }

    interface IDiscountPrice {
      type: null | any;
      value: null | any;
      discounted: IClayfulPriceFormat;
    }

    interface IProductItem {
      _id: string;
      type: ProductType;
      name: string;
      summary: string;
      description: string;

      variants: IProductVariant[];
      bundles: IProductBundle[];
      meta: IClayfulCustomField;
      slug: string;

      price: IProductPrice;
      discount: IDiscountPrice;
      shipping: {
        methods: [
          {
            _id: string;
            name: string;
            slug: string;
          }
        ];
        calculation: string;
      };
      rating: {
        count: IClayfulNumberFormat;
        sum: IClayfulNumberFormat;
        average: IClayfulNumberFormat;
      };
      bundled: boolean;
      available: boolean;
      thumbnail: {
        _id: string;
        url: string;
      };
      taxCategories: any[];
      totalReview: {
        raw: number;
        formatted: string;
        converted: string;
      };
      brand: null | {
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
      createdAt: IClayfulTimeFormat;
      updatedAt: IClayfulTimeFormat;
    }

    interface IProductBundle {
      name: string;
      required: boolean;
      items: {
        product: {
          _id: string;
          type: "tangible";
          slug: string;
          name: string;
          bundled: true;
          available: boolean;
          price: IProductPrice;
          discount: IDiscountPrice;
          shipping: {
            methods: { _id: string; name: string; slug: string }[];
            calculation: "bundled" | string;
          };
          thumbnail?: {
            _id: string;
            url: string;
          };
        };
        variant: IProductVariant;
      }[];
    }

    interface IProductVariant {
      _id: string;
      sku: string;
      thumbnail: null | string;
      quantity: null | number;
      types: IProductVariantType[];
      available: boolean;
      price: IProductPrice;
      discount: IDiscountPrice;
      weight?: IClayfulNumberFormat;
      width?: IClayfulNumberFormat;
      height?: IClayfulNumberFormat;
      depth?: IClayfulNumberFormat;
    }

    interface IProductVariantType {
      option: {
        _id: string;
        priority: number;
        name: string;
      };
      variation: {
        _id: string;
        priority: number;
        value: string;
      };
    }
  }

  // https://dev.clayful.io/ko/node/apis/cart/get
  export namespace Cart {
    interface ICart {
      /** 내 카트에 상품을 추가합니다. **/
      addItemForMe: (
        payload: ICartEditPayload,
        options: IClayfulRequestOptions<null>,
        callback: (err: IClayfulError, response: AxiosResponse<ICardEditResponse>) => void
      ) => void;

      /** 내 카트에 상품을 업데이트합니다. **/
      updateItemForMe: (
        cartItemId: string,
        payload: ICartEditPayload,
        options: IClayfulRequestOptions<null>,
        callback: (err: IClayfulError, response: AxiosResponse<ICardEditResponse>) => void
      ) => void;

      /** 내 카트에 상품을 삭제합니다. **/
      deleteItemForMe: (
        cartItemId: string,
        options: IClayfulRequestOptions<null>,
        callback: (err: IClayfulError, response: AxiosResponse<null>) => void
      ) => void;

      /** 내 카트를 초기화 합니다. **/
      emptyForMe: (
        options: IClayfulRequestOptions<null>,
        callback: (err: IClayfulError, response: AxiosResponse<null>) => void
      ) => void;

      /** 내 카트를 계산하고 가져옵니다. **/
      getForMe: (
        payload: ICartGetPayload,
        options: IClayfulRequestOptions<{ items: string }>,
        callback: (err: IClayfulError, response: AxiosResponse<ICartItem>) => void
      ) => void;

      /** 내 카트에 담긴 상품을 주문합니다. **/
      checkoutForMe: (
        type: "order" | "subscription",
        payload: ICartCheckOutPayload,
        options: IClayfulRequestOptions<{ items: string }>,
        callback: (err: IClayfulError, response: AxiosResponse<{ order: Order.IOrderItem }>) => void
      ) => void;
    }

    interface ICartItem {
      items: ICartItemProduct[];
      status: string;
      address: {
        shipping: IClayfulAddress;
        billing: IClayfulAddress;
      };
      total: {
        price: {
          original: IClayfulPriceFormat;
          sale: IClayfulPriceFormat;
          withTax: IClayfulPriceFormat;
          withoutTax: IClayfulPriceFormat;
        };
        discounted: IClayfulPriceFormat;
        taxed: IClayfulPriceFormat;
        amount: IClayfulPriceFormat;
        items: {
          price: {
            original: IClayfulPriceFormat;
            sale: IClayfulPriceFormat;
            withTax: IClayfulPriceFormat;
            withoutTax: IClayfulPriceFormat;
          };
          discounted: IClayfulPriceFormat;
          taxed: IClayfulPriceFormat;
        };
        shipping: {
          fee: {
            original: IClayfulPriceFormat;
            sale: IClayfulPriceFormat;
            withTax: IClayfulPriceFormat;
            withoutTax: IClayfulPriceFormat;
          };
          discounted: IClayfulPriceFormat;
          taxed: IClayfulPriceFormat;
        };
      };

      shipments: {
        type: "bundled" | string;
        items: object[];
        shippingPolicy: {
          _id: string;
        };
        rule: object;
        quantity: IClayfulNumberFormat;
        free: boolean;
        discounts: any[];
        discounted: IClayfulPriceFormat;
        taxes: any[];
        taxed: IClayfulPriceFormat;
        fee: object;
      }[];

      tax: {
        included: boolean;
        country: object;
        region: null | any;
      };
      currency: object;
      language: object;
      errors: any[];
    }

    interface ICartItemProduct {
      _id: string;
      product: {
        _id: string;
        slug: string;
        thumbnail: {
          _id: string;
          url: string;
        };
        name: string;
      };
      shippingMethod: {
        _id: string;
        slug: string;
        name: string;
      };
      variant: Product.IProductVariant;
      quantity: IClayfulNumberFormat;
      bundleItems: ICartBundleItemInfo[];
      addedAt: IClayfulTimeFormat;
      status: string;
      errors: any[];
      brand: {
        _id: string;
        slug: string;
        name: string;
      };
      collections: {
        path: {
          _id: string;
          slug: string;
          name: string;
        }[];
      }[];
      discounts: {
        coupon: {
          _id: string;
          slug: string;
          name: string;
          type: string;
          discount: {
            min: null;
            max: null;
            type: string;
            value: IClayfulNumberFormat;
          };
        };
        type: string;
        value: IClayfulNumberFormat;
        overridden: null;
        discounted: IClayfulPriceFormat;
        before: IClayfulPriceFormat;
        after: IClayfulPriceFormat;
      }[];

      discounted: IClayfulPriceFormat;

      taxes: {
        name: string;
        rate: IClayfulNumberFormat;
        taxed: IClayfulPriceFormat;
      }[];

      taxed: IClayfulPriceFormat;
      taxCategory: null;
      price: {
        original: IClayfulPriceFormat;
        sale: IClayfulPriceFormat;
        withTax: IClayfulPriceFormat;
        withoutTax: IClayfulPriceFormat;
      };
      total: {
        price: {
          original: IClayfulPriceFormat;
          sale: IClayfulPriceFormat;
          withTax: IClayfulPriceFormat;
          withoutTax: IClayfulPriceFormat;
        };
        discounted: IClayfulPriceFormat;
        taxed: IClayfulPriceFormat;
      };
    }

    interface ICartEditPayload {
      product: string;
      variant: string;
      quantity: number;
      shippingMethod: null | string;
      bundleItems: ICartBundleItemInfo[];
    }

    interface ICartBundleItemInfo {
      product: string;
      variant: string;
      quantity: number;
      shippingMethod: null | string;
    }

    interface ICardEditResponse {
      shippingMethod: string;
      bundleItems: ICartBundleItemInfo[];
      addedAt: string;
      product: string;
      variant: string;
      quantity: number;
      _id: string;
    }

    interface ICartGetPayload {
      address: {
        shipping: IClayfulAddress;
        billing: IClayfulAddress;
      };
      discount?: {
        cart: Omit<IDiscountInfo, "item">;
        items: IDiscountInfo[];
        shipping: IDiscountInfo[];
      };
      subscription?: {
        plan: string;
        startsAt: Date;
        timezone: string;
      };
    }

    interface ICartCheckOutPayload {
      items?: ICartEditPayload[];
      currency: string;
      paymentMethod: string;
      paymentMethods?: string[];
      subscription?: {
        plan: string;
        startsAt: Date;
        timezone: string;
      };
      tags: string[];
      address: {
        shipping: IClayfulAddress;
        billing: IClayfulAddress;
      };
      request: null | string;
      meta: IClayfulCustomField;
      discount?: {
        cart?: Omit<IDiscountInfo, "item">;
        items?: IDiscountInfo[];
        shipping?: IDiscountInfo[];
      };
      /** 비회원 결제용 **/
      customer?: {
        name: {
          full: string;
          first?: string;
          last?: string;
        };
        email?: string | null;
        mobile: string;
        phone?: string | null;
      };
    }

    interface IDiscountInfo {
      item: string;
      coupon?: string;
      discounts?: string[];
    }
  }

  //https://dev.clayful.io/ko/node/apis/order/list
  export namespace Order {
    interface IOrder {
      /** 주문을 삭제합니다. **/
      delete: (
        orderId: string,
        options: IClayfulRequestOptions<null>,
        callback: (err: IClayfulError, response: AxiosResponse<null>) => void
      ) => void;

      /** 내 주문 내역 목록을 요청합니다. */
      listForMe: (
        options: IClayfulRequestOptions<object>,
        callback: (err: IClayfulError, response: AxiosResponse<IOrderItem[]>) => void
      ) => void;

      /** 내 주문 하나를 요청합니다. */
      getForMe: (
        orderId: string,
        options: IClayfulRequestOptions<{
          raw: boolean;
          fields: string;
          embed: string;
          displayLanguage: string | "primary" | "order";
        }>,
        callback: (err: IClayfulError, response: AxiosResponse<IOrderItem>) => void
      ) => void;

      /** 내 주문 내역의 요청사항을 수정합니다. */
      updateForMe: (
        id: string,
        payload: IOrderUpdatePayload,
        options: IClayfulRequestOptions<null>,
        callback: (err: IClayfulError, response: AxiosResponse<IOrderItem>) => void
      ) => void;

      /** 내 주문을 취소합니다. (placed -> cancelled) **/
      cancelForMe: (
        id: string,
        payload: { reason: string },
        callback: (err: IClayfulError, response: AxiosResponse<object>) => void
      ) => void;

      /** 내 주문의 환불을 요청합니다. (paid -> under-refunded -> refunded) **/
      requestRefundForMe: (
        id: string,
        payload: IOrderRefundRequestPayload,
        options: IClayfulRequestOptions<null>,
        callback: (err: IClayfulError, response: AxiosResponse<object>) => void
      ) => void;

      /** 내 주문의 환불 요청을 취소합니다. (under-refunded -> paid) **/
      cancelRefundForMe: (
        orderId: string,
        refundId: string,
        payload: { reason: string },
        callback: (err: IClayfulError, response: AxiosResponse<object>) => void
      ) => void;

      /** 내 주문을 수령 완료상태로 체크합니다. (Order.receivedAt) **/
      markAsReceivedForMe: (
        orderId: string,
        options: IClayfulRequestOptions<null>,
        callback: (err: IClayfulError, response: AxiosResponse<object>) => void
      ) => void;

      /** 내 주문 내역을 동기화합니다. (아임포트 결제 내역을 주문 상태에 반영합니다.) **/
      updateTransactionsForMe: (
        id: string,
        options: IClayfulRequestOptions<null>,
        callback: (
          err: IClayfulError,
          response: AxiosResponse<{
            status: OrderStatus;
            transactions: {
              paid: number;
              cancelled: number;
              refunded: number;
              vbanks: any[];
              createdAt: string;
              updatedAt: string;
              paymentMethod: string;
            }[];
          }>
        ) => void
      ) => void;
    }
    interface IOrderRefundRequestPayload {
      reason: null | string;
      items: { item: string; quantity: number }[];
      shipments: string[];
    }

    interface IOrderUpdatePayload {
      request: null | string;
      meta: IClayfulCustomField;
    }

    type OrderStatus =
      | "placed"
      | "cancelled"
      | "paid"
      | "under-paid"
      | "over-paid"
      | "refunded"
      | "partially-refunded"
      | "under-refunded"
      | "over-refunded";

    interface IOrderItem {
      _id: string;
      status: OrderStatus;

      tags: any[];
      receivedAt: null | any;
      syncTriedAt: null | any;
      cancellation: null | any;
      request: string;
      synced: boolean;
      done: boolean;
      language: "ko";

      // 구매자 정보
      customer: Customer.ICustomerItem;

      // 배송지
      address: {
        shipping: IClayfulAddress;
        billing: IClayfulAddress;
      };

      // 통화정보
      currency: {
        base: {
          code: string;
          precision: number;
        };
        payment: {
          code: string;
          precision: number;
        };
        rate: number;
      };

      // 세금정보
      tax: {
        region: null | string;
        included: boolean;
        country: string;
      };

      // 주문한 금액 총 내역
      total: {
        price: IClayfulTaxedPriceFormat;
        items: {
          price: IClayfulTaxedPriceFormat;
          discounted: IClayfulPriceFormat;
          taxed: IClayfulPriceFormat;
        };
        shipping: {
          fee: IClayfulTaxedPriceFormat;
          discounted: IClayfulPriceFormat;
          taxed: IClayfulPriceFormat;
        };
        discounted: IClayfulPriceFormat;
        taxed: IClayfulPriceFormat;
        amount: IClayfulPriceFormat | number;
        taxes: {
          key: string;
          taxed: IClayfulPriceFormat;
        }[];
        paid: IClayfulPriceFormat;
        cancelled: IClayfulPriceFormat;
        refunded: IClayfulPriceFormat;
      };

      // 주문한 상품 정보
      items: {
        total: {
          price: IClayfulTaxedPriceFormat;
          discounted: IClayfulPriceFormat;
          taxed: IClayfulPriceFormat;
        };
        price: IClayfulTaxedPriceFormat;
        brand: null | string;
        shippingMethod: string;
        taxCategory: null | any;
        bundleItems: (Pick<
          Product.IProductItem,
          | "price"
          | "brand"
          | "shippingMethod"
          | "textCategory"
          | "quantity"
          | "variant"
          | "product"
          | "_id"
          | "type"
          | "collections"
          | "discounts"
          | "discounted"
          | "taxes"
          | "taxed"
        > & { required: boolean })[];
        collections: {
          path: string[];
        }[];

        discounts: {
          overridden: null | any;
          coupon: string;
          type: "percentage" | string;
          value: number;
          discounted: number;
          before: number;
          after: number;
        }[];

        taxes: {
          name: string;
          rate: number;
          taxed: number;
        }[];

        product: Pick<Product.IProductItem, "_id" | "name" | "thumbnail">;
        variant: Omit<Product.IProductVariant, "quantity" | "available">;
        quantity: IClayfulNumberFormat;
        _id: string;
        type: Product.ProductType;
        discounted: IClayfulPriceFormat;
        taxed: IClayfulPriceFormat;
      }[];

      // 주문한 상품의 배송 정보
      shipments: {
        rule: {
          free: {
            priceOver: null;
          };
          criteria: {
            price: number;
            weight: number;
          };
          weightOver: number;
          fee: number;
        };
        fee: IClayfulTaxedPriceFormat;
        items: string[];
        discounts: any[];
        taxes: {
          name: string;
          rate: number;
          taxed: number;
        }[];
        type: string;
        shippingPolicy: string;
        quantity: IClayfulNumberFormat;
        free: boolean;
        discounted: number;
        taxed: number;
        _id: string;
      }[];

      // 배송 이행 내역
      fulfillments: {
        tracking: {
          company: null | string;
          uid: null | string;
          url: null | string;
        };
        items: {
          item: string;
          quantity: IClayfulNumberFormat;
        }[];
        createdAt: string;
        updatedAt: string;
        _id: string;
        status: "pending" | "shipped" | "arrived";
      }[];

      // 환불 내역
      refunds: {
        total: {
          price: Pick<IClayfulTaxedPriceFormat, "withTax" | "withoutTax">;
          items: {
            price: Pick<IClayfulTaxedPriceFormat, "withTax" | "withoutTax">;
            taxed: number;
          };
          shipping: {
            fee: Pick<IClayfulTaxedPriceFormat, "withTax" | "withoutTax">;
            taxed: number;
          };
          taxed: number;
          taxes: {
            key: string;
            taxed: number;
          }[];
        };
        reason: null | string;
        // 환불 요청 -> 환불 취소 내역
        cancellation: null | {
          by: "customer" | "store";
          reason: string;
          cancelledAt: string;
        };
        items: {
          price: Pick<IClayfulTaxedPriceFormat, "withTax" | "withoutTax">;
          taxed: number;
          taxes: {
            taxed: number;
            name: string;
          }[];
          item: string;
          quantity: IClayfulNumberFormat;
        }[];
        shipments: [];
        createdAt: string;
        updatedAt: string;
        status: "requested" | "accepted" | "cancelled";
        _id: string;
      }[];

      transactions: {
        paid: number;
        cancelled: number;
        refunded: number;
        vbanks: any[];
        createdAt: string;
        updatedAt: string;
        paymentMethod: string;
      }[];
      meta: IClayfulCustomField;
      createdAt: IClayfulTimeFormat;
      updatedAt: IClayfulTimeFormat;
    }
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
        total: null | IClayfulCountFormat;
        used: IClayfulCountFormat;
        left: null | IClayfulCountFormat;
        issued: IClayfulCountFormat;
        unissued: null | IClayfulCountFormat;
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
      meta: IClayfulCustomField;
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
    // Coupon: Coupon.ICoupon;
    // Discount: Discount.IDiscount;
  };

  export default Clayful;
}
