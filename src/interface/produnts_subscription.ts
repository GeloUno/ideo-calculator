export interface ProductSubscription {
  tvSubscription: Subscription;
  internetSubscription: Subscription;
  phoneSubscription: Subscription;
}

interface Subscription {
  details: Detail[];
  isHardwareRequired: boolean;
}

interface Detail {
  year: number;
  priseSubscription: number;
}
