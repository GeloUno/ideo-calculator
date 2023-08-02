import { Detail } from '../interface/produnts_subscription';
import { Card, Col, Row } from 'react-bootstrap';
import uuid from 'short-uuid';

interface SelectYearProps {
  details: Array<Detail>;
  handlerSelectYear(year: number): void;
}

function SelectYear({ details, handlerSelectYear }: SelectYearProps) {
  return (
    <div className="mt-5">
      <Row>
        {details.map((detail) => (
          <Col key={uuid.generate()}>
            <Card
              role="button"
              style={{ width: '18rem' }}
              onClick={() => {
                handlerSelectYear(detail.year);
              }}
            >
              <Card.Body>
                <Card.Title>Proszę wybrać rok</Card.Title>
                <Card.Text>{detail.year}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SelectYear;
