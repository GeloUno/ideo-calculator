export interface ProductsPackage {
  products: string[];
  name: string;
  priceByTheYear: PriceByTheYear[];
}

interface PriceByTheYear {
  year: number;
  price: number;
}
