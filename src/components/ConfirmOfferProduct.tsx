import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { StepPage } from '../pages/StepperSelectProductPage';
import {
  OfferSelected,
  Subscription,
} from '../interface/produnts_subscription';
import { ProductsPackage } from '../interface/products_package';
import { ProductHardware } from '../interface/products_hardware';

interface ConfirmOfferProductProps {
  setStepPage: React.Dispatch<React.SetStateAction<StepPage>>;
  offerSelected: OfferSelected[];
  hardwareSelected: boolean;
  productsHardware: ProductHardware;
  productsPackage: ProductsPackage[];
  productsSubscription: Subscription[];
  year: number;
}

function getIsInPackageProduct(
  productSelected: string[],
  productsPackage: ProductsPackage[]
) {
  return productsPackage.map((productPackage) =>
    productPackage.products.every((prod) => productSelected.includes(prod))
  );
}
function getNotInPackageProduct(
  productSelected: string[],
  productsPackage: ProductsPackage[]
) {
  return productsPackage.map((productPackage) => {
    return productPackage.products.filter(
      (prod) => !productSelected.includes(prod)
    );
  });
}

function getSubscriptionNames(offerSelected: OfferSelected[]) {
  return offerSelected.map((offer) => offer.product);
}

function findOfferInPackage(
  offerSelected: OfferSelected[],
  productsPackage: ProductsPackage[],
  year: number,
  productsSubscription: Subscription[]
) {
  if (offerSelected.length === 1) {
    return null;
  }
  const productSelected = getSubscriptionNames(offerSelected);
  const isInPackage = getIsInPackageProduct(productSelected, productsPackage);
  if (isInPackage === undefined) {
    return undefined;
  }
  if (offerSelected.length === 2) {
    for (let index = 0; index < isInPackage.length; index++) {
      if (isInPackage[index] === true) {
        return productsPackage[index].priceByTheYear.find(
          (priceYear) => priceYear.year === year
        );
      }
    }
  }
  if (offerSelected.length === 3) {
    for (const productPackage of productsPackage) {
      const priceInPackage = productPackage.priceByTheYear.filter(
        (priceYear) => priceYear.year === year
      );

      const notIncludedInPackage = getNotInPackageProduct(
        productPackage.products,
        productsPackage
      );
      notIncludedInPackage.forEach((notIncluded) => {
        const foundSubscriptionDetail = productsSubscription.find((product) =>
          notIncluded.includes(product.product)
        );

        if (foundSubscriptionDetail === undefined) {
          return undefined;
        }
        const priceNoIncludet = foundSubscriptionDetail.details.find(
          (sub) => sub.year === year
        );
        if (priceNoIncludet === undefined) {
          return undefined;
        }
      });

      return priceInPackage[0];
    }
  }
}

function ConfirmOfferProduct({
  setStepPage,
  offerSelected,
  hardwareSelected,
  productsPackage,
  productsHardware,
  year,
  productsSubscription,
}: ConfirmOfferProductProps) {
  let finalPrice = 0;
  let promoPrice = findOfferInPackage(
    offerSelected,
    productsPackage,
    year,
    productsSubscription
  );

  for (const offer of offerSelected) {
    finalPrice += offer.priseSubscription;
  }
  if (hardwareSelected && productsHardware.priceRegular !== null) {
    finalPrice += productsHardware.priceRegular;
  }

  return (
    <div className="m-5 d-flex flex-column justify-content-center align-items-center">
      <Row>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Cena regularna</Card.Title>
          </Card.Body>
          <Card.Text>Cena finalna {finalPrice} PLN</Card.Text>
        </Card>
      </Row>
      {!!promoPrice && (
        <Row>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Cena w promocji {promoPrice?.year}</Card.Title>
            </Card.Body>
            <Card.Text>Cena finalna {promoPrice.price} PLN</Card.Text>
          </Card>
        </Row>
      )}
      <Col>
        <Button
          onClick={() => {
            setStepPage((prev) => (hardwareSelected ? prev - 1 : prev - 2));
          }}
          title="Wstecz"
          className="m-5"
        >
          Wstecz
        </Button>
      </Col>
    </div>
  );
}

export default ConfirmOfferProduct;
