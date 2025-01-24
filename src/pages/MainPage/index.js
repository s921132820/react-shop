// import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import data from './data/shoes-data';
import Product from "../../component/Product";
import { useState } from 'react';

function MainPage({product, setProduct}) {
  // let product = props.product;
  
  return (
    <Container>
    <Row className="justify-content-md-center">
        {
          product.map((p, index) => {
            return(
              <Col>
                <Product product={product} index={index} />
              </Col>
            )
          })
        }
    </Row>
    {/* <button onClick={moreData}>데이터 가져오기</button> */}
  </Container>
  )
}

export default MainPage;