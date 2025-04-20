// Type definitions for sslcommerz-lts
// Project: https://github.com/sslcommerz/SSLCommerz-NodeJS
// Definitions by: Custom TypeScript Declaration

declare module 'sslcommerz-lts' {
    export interface SSLCommerzInitData {
      total_amount: number;
      currency: string;
      tran_id: string;
      success_url: string;
      fail_url: string;
      cancel_url: string;
      ipn_url?: string;
      shipping_method?: string;
      product_name: string;
      product_category: string;
      product_profile: string;
      cus_name: string;
      cus_email: string;
      cus_add1: string;
      cus_add2?: string;
      cus_city: string;
      cus_state: string;
      cus_postcode: string;
      cus_country: string;
      cus_phone: string;
      cus_fax?: string;
      ship_name?: string;
      ship_add1?: string;
      ship_add2?: string;
      ship_city?: string;
      ship_state?: string;
      ship_postcode?: number | string;
      ship_country?: string;
      [key: string]: any; // Allow for additional properties
    }
  
    export interface SSLCommerzInitResponse {
      status: string;
      failedreason?: string;
      sessionkey?: string;
      gw?: {
        visa: string;
        master: string;
        amex: string;
        othercards: string;
        internetbanking: string;
        mobilebanking: string;
      };
      redirectGatewayURL?: string;
      redirectGatewayURLFailed?: string;
      GatewayPageURL: string;
      storeBanner?: string;
      storeLogo?: string;
      [key: string]: any; // Allow for additional properties
    }
  
    export interface SSLCommerzValidateResponse {
      status: string;
      tran_date: string;
      tran_id: string;
      val_id: string;
      amount: string;
      store_amount: string;
      currency: string;
      bank_tran_id: string;
      card_type: string;
      card_no: string;
      card_issuer: string;
      card_brand: string;
      card_issuer_country: string;
      card_issuer_country_code: string;
      currency_type: string;
      currency_amount: string;
      risk_level: string;
      risk_title: string;
      [key: string]: any; // Allow for additional properties
    }
  
    export default class SSLCommerzPayment {
      constructor(store_id: string, store_passwd: string, is_live?: boolean);
      init(data: SSLCommerzInitData): Promise<SSLCommerzInitResponse>;
      validate(val_id: string): Promise<SSLCommerzValidateResponse>;
      verifyPayment(val_id: string): Promise<SSLCommerzValidateResponse>;
      orderValidate(val_id: string, amount: number, currency: string, tran_id: string): Promise<SSLCommerzValidateResponse>;
      transactionQueryByTransactionId(tran_id: string): Promise<any>;
      transactionQueryBySessionId(sessionkey: string): Promise<any>;
      initiateRefund(val_id: string, amount: number, refund_amount: number, refund_remarks: string): Promise<any>;
      refundQuery(refund_ref_id: string): Promise<any>;
    }
  }