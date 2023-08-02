import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import uuid from 'short-uuid';
import { StepPage } from '../pages/StepperSelectProductPage';
import { ProductHardware } from '../interface/products_hardware';

interface SelectHardwareProps {
  hardwareSelected: boolean;
  setHardwareSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setStepPage: React.Dispatch<React.SetStateAction<StepPage>>;
  productsHardware: ProductHardware;
  handlerOfferSelectedReset(): void;
}

function SelectHardware({
  hardwareSelected,
  setHardwareSelected,
  setStepPage,
  productsHardware,
  handlerOfferSelectedReset,
}: SelectHardwareProps) {
  return (
    <div className="m-5 d-flex flex-column justify-content-center align-items-center">
      <Row>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{productsHardware.name}</Card.Title>
          </Card.Body>
          <Form.Check
            key={uuid.generate()}
            role="button"
            type="switch"
            id={`decoder4K`}
            label={`${productsHardware.priceRegular} PLN`}
            onChange={() => {
              setHardwareSelected((prev) => !prev);
            }}
            checked={hardwareSelected}
          />
        </Card>
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
          onClick={() => setStepPage((prev) => prev + 1)}
          title="Dalej"
          className="m-5"
        >
          Dalej
        </Button>
      </Col>
    </div>
  );
}

export default SelectHardware;
