import React, { useCallback } from 'react';
import { useState } from 'react';
import { Card, Col, Form } from 'react-bootstrap';
import uuid from 'short-uuid';
import {
  OfferSelected,
  produnctDetali,
} from '../interface/produnts_subscription';

interface ItemSelectOfferProductProps {
  item: produnctDetali;
  handleSelectOffer(offerSelected: OfferSelected): void;
}

function ItemSelectOfferProduct({
  item,
  handleSelectOffer,
}: ItemSelectOfferProductProps) {
  const [checkedSwitch, setCheckedSwitch] = useState<boolean>(
    item.checkSeleckted
  );

  const handlerChangeCheckedSwitch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const offer = {
        name: item.name,
        priseSubscription: item.price,
        isHardwareRequired: item.isHardwareRequired,
        year: item.year,
        selected: e.target.checked,
        product: item.product,
      };
      setCheckedSwitch((prev) => !prev);
      handleSelectOffer(offer);
    },
    [checkedSwitch]
  );

  return (
    <Col key={uuid.generate()}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title> Usługa</Card.Title>
          <Card.Text>{item.price} PLN</Card.Text>
          <Form.Check
            key={uuid.generate()}
            role="button"
            type="switch"
            id={`${item.name}-${item.price}`}
            label={item.name}
            onChange={(e) => handlerChangeCheckedSwitch(e)}
            checked={checkedSwitch}
          />
        </Card.Body>
      </Card>
    </Col>
  );
}

export default React.memo(ItemSelectOfferProduct);
