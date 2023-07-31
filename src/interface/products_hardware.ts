export interface ProductHardware {
  priceRegular: number | null;
  priceInPromotion: number | null;
  priceInPackage: number | null;
  isRequiredSubscription: SubscriptionType[];
  name: string;
}

export enum SubscriptionType {
  TVSUBSCRIPTION = 'tvSubscription',
  INTERNETSUBSCRIPTION = 'internetSubscription',
  PHONESUBSCRIPTION = 'phoneSubscription',
}
