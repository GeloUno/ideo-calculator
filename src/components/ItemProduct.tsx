import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { Subscription } from '../interface/produnts_subscription';
import uuid from 'short-uuid';

interface ItemProductProps {
  subscription: Subscription;
}

function ItemProduct({ subscription }: ItemProductProps) {
  return (
    <div className="m-5 align-items-center">
      <Row>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{subscription.name}</Card.Title>

            {subscription.details.map((item) => (
              <Row key={uuid.generate()}>
                <div>
                  {item.year} - {item.priseSubscription}
                </div>
              </Row>
            ))}
          </Card.Body>
        </Card>
      </Row>
    </div>
  );
}

export default ItemProduct;
