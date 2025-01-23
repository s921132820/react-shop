/* eslint no-restricted-globals: ["off"] */
import { useParams } from "react-router-dom";
import Discount from "./Discount";
import { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';

function Detail(props) {
  const [review, setReview] = useState([]);
  let [alert, setAlert] = useState(true);

  //2초 후에 alert state를 false로 변경
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
        let imsi = [];
        imsi = [... response.data];
        setReview([... imsi]); // 전체 리뷰 데이터 저장
      })
      .catch((error) => {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }); // 데이터 가져오기
  }, []);


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
      

        {
          alert == true ? <Discount /> : null
        }
      
        <div className="col-md-6">
          <h4 className="pt-5">{props.product[id].title}</h4>
          <p>{props.product[id].content}</p>
          <p>{strPrice}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>

        <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
        >
          <Tab eventKey="home" title="무료 배송 및 반품">
            <div></div>
          </Tab>
          <Tab eventKey="profile" title="리뷰(4.5 ★★★★☆)">
            <div>
              {review.map((reviewItem) => (
                <li key={reviewItem.reviewId}>
                  <h5>{reviewItem.title}</h5>
                  <p>{reviewItem.review}</p>
                  <p>평점: {reviewItem.point}</p>
                </li>
              ))}
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

export default Detail;