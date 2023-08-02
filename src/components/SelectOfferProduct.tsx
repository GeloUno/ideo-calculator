import productsSubscription from '../data/products_subscription.json';
import { Button, Col, Row } from 'react-bootstrap';
import uuid from 'short-uuid';
import ItemSelectOfferProduct from './ItemSelectOfferProduct';
import { OfferSelected } from '../interface/produnts_subscription';
import { StepPage } from '../pages/StepperSelectProductPage';
import React from 'react';

interface SelectOfferProductProps {
  year: number;
  handleSelectOffer(offerSelected: OfferSelected): void;
  setStepPage: React.Dispatch<React.SetStateAction<StepPage>>;
  offerSelected: OfferSelected[];
  handlerOfferSelectedReset(): void;
}

function SelectOfferProduct({
  year,
  handleSelectOffer,
  setStepPage,
  offerSelected,
  handlerOfferSelectedReset,
}: SelectOfferProductProps) {
  const produnctDetail = productsSubscription.map((item) => ({
    product: item.product,
    name: item.name,
    price: item.details.find((detail) => detail.year === year)!,
    isHardwareRequired: item.isHardwareRequired,
    checkSeleckted:
      offerSelected.find((offer) => offer.product === item.product)?.selected ||
      false,
  }));

  const needHardware = offerSelected.some(
    (offer) => offer.selected === offer.isHardwareRequired
  );

  return (
    <div className="mt-5 align-items-center">
      <Row>
        {produnctDetail.map((item) => (
          <ItemSelectOfferProduct
            item={{
              year,
              name: item.name,
              isHardwareRequired: item.isHardwareRequired,
              price: item.price.priseSubscription,
              product: item.product,
              checkSeleckted: item.checkSeleckted,
            }}
            key={uuid.generate()}
            handleSelectOffer={handleSelectOffer}
          />
        ))}
      </Row>
      <Col>
        <Button
          onClick={() => {
            setStepPage((prev) => prev - 1);
            handlerOfferSelectedReset();
          }}
          title="Wstecz"
          className="m-5"
        >
          Wstecz
        </Button>
        <Button
          onClick={() =>
            setStepPage((prev) => (needHardware ? prev + 1 : prev + 2))
          }
          title="Dalej"
          className="m-5"
          disabled={offerSelected.length === 0}
        >
          Dalej
        </Button>
      </Col>
    </div>
  );
}

export default React.memo(SelectOfferProduct);
