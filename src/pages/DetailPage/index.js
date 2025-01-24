/* eslint no-restricted-globals: ["off"] */
import { useParams, useNavigate } from "react-router-dom";
import Discount from "./Discount";
import { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addCart, setReviews } from "../../store";

function DetailPage(props) {
  let [alert, setAlert] = useState(true);
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const reviewData = useSelector((state) => state.reviewData.reviews);

  let { id } = useParams();
  let shoesId = parseInt(id);
  let shoesImage = `/images/shoes${shoesId + 1}.jpg`
  let shoes = props.product.find((item) => item.id === shoesId);

  useEffect(()=>{
    let myTimer = setTimeout(()=>{
      setAlert(false)
    }, 2000)
    return () => {
      clearTimeout(myTimer)
    }
  }, [])
  
  useEffect(() => {
    axios
      .get("https://zzzmini.github.io/js/shoesReview.json")
      .then((response) => {
        const reviewList = response.data.filter(
          (review) => review.productId === shoesId
        );
        dispatcher(setReviews(reviewList)); // 전체 리뷰를 리덕스에 저장
      })
      .catch((error) => {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      });
  }, [dispatcher]);




  if (!shoes) {
    alert("찾는 상품이 없습니다.");
    history.back();
    return null;
  }
  
  let strPrice = props.product[id].price.toLocaleString('ko-kr');

  const handleOrder = () => {
    dispatcher(addCart(shoes));
    navigate('/cart');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6"></div>
        <img src={process.env.PUBLIC_URL + shoesImage} />
      

        {
          alert == true ? <Discount /> : null
        }
      
        <div className="col-md-6">
          <h4 className="pt-5">{props.product[id].title}</h4>
          <p>{props.product[id].content}</p>
          <p>{strPrice}원</p>
          <button className="btn btn-danger" onClick={handleOrder}>주문하기</button>
        </div>

        <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
        >
          <Tab eventKey="home" title="무료 배송 및 반품">
            <div>
            일반 배송 

              • 배송지역: 전국 (일부 지역 제외)
              • 배송비: 무료배송
              • 제품 수령일로부터 14일 이내 제품에 대해서만 무료 반품 서비스가 가능합니다.
              • 본사는 교환 서비스를 제공하지 않습니다.

              일반 배송 자세히 알아보기
              반품 자세히 알아보기

              오늘도착 서비스

              • 이용시간: 오전 10시 30분까지 결제 시, 당일 도착 (일요일, 공휴일 제외)
              • 서비스지역: 서울∙과천∙의왕∙군포∙수원∙성남∙안양시 전체, 용인시 수지구∙기흥구, 부천시 중동∙상동∙심곡동
              • 서비스비용: 5,000원

              자세히 알아보기
            </div>
          </Tab>
          <Tab eventKey="profile" title="리뷰(4.5 ★★★★☆)">
            <div>
              {reviewData.map((review) => (
                <div key={review.reviewId}>
                  <h4>{review.title}</h4>
                  <p>{review.review}</p>
                  <p>평점: {review.point}</p>
                </div>
              ))}
              {console.log(reviewData)}
            </div>
          </Tab>
          <Tab eventKey="contact" title="추가정보" disabled>
            Tab content for Contact
          </Tab>
        </Tabs>
      </div>  
    </div>
  )
}

export default DetailPage;