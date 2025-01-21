/* eslint no-restricted-globals: ["off"] */
import { useParams } from "react-router-dom";

function Detail(props) {
  let { id } = useParams();
  let shoesId = parseInt(id);
  let shoesImage = `/images/shoes${shoesId + 1}.jpg`
  let shoes = props.product.find((item) => item.id === shoesId);

  if (!shoes) {
    alert("찾는 상품이 없습니다.");
    history.back();
    return null;
  }
  
  let strPrice = props.product[id].price.toLocaleString('ko-kr');
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6"></div>
        <img src={process.env.PUBLIC_URL + shoesImage} />
      </div>
      <div className="col-md-6">
        <h4 className="pt-5">{props.product[id].title}</h4>
        <p>{props.product[id].content}</p>
        <p>{strPrice}원</p>
        <button className="btn btn-danger">주문하기</button>
      </div>
    </div>
  )
}

export default Detail;