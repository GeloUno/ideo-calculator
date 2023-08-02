export interface ProductHardware {
  priceRegular: number | null;
  priceInPromotion: number | null;
  priceInPackage: number | null;
  isRequiredSubscription: string[];
  name: string;
}
