export interface Settings {
  id: string;

  storeName: string;
  supportEmail: string;
  phone: string;
  address: string;

  currency: string;
  taxRate: number;
  shippingCharge: number;
  freeShippingThreshold: number;

  logo: string;
  favicon: string;

  defaultOrderStatus: string;
}
