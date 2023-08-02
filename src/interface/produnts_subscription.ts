export interface ProductSubscription {
  subscription: Subscription[];
}

export interface Subscription {
  details: Detail[];
  isHardwareRequired: boolean;
  name: string;
  product: string;
}

export interface Detail {
  year: number;
  priseSubscription: number;
}
export interface OfferSelected extends Detail, Omit<Subscription, 'details'> {
  selected: boolean;
}

export interface produnctDetali {
  name: string;
  price: number;
  isHardwareRequired: boolean;
  year: number;
  product: string;
  checkSeleckted: boolean;
}
