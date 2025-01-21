import React from "react";
import { useNavigate } from "react-router-dom";

function Product(props) {
  const navigate = useNavigate();
  let i = props.index;
  let p = props.product;
  return (
    <div onClick={() => navigate(`/detail/${p[i].id}`)}>
        <img src={process.env.PUBLIC_URL + `/images/shoes${p[i].id+1}.jpg`} width='80%'></img>
        <h4>{p[i].title}</h4>
        <p>{p[i].content}</p>
        <p>{p[i].price}</p>
    </div>
  );
}

export default Product;