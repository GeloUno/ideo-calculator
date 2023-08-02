import { Col } from 'react-bootstrap';
import productsSubscription from '../data/products_subscription.json';
import ItemProduct from '../components/ItemProduct';
import uuid from 'short-uuid';
function ProductListPage() {
  return (
    <Col>
      {productsSubscription.length === 0 && <div>no data</div>}
      {productsSubscription.length !== 0 &&
        productsSubscription.map((product) => (
          <ItemProduct
            subscription={product}
            key={uuid.generate()}
          ></ItemProduct>
        ))}
    </Col>
  );
}

export default ProductListPage;
