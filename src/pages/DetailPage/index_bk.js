/* eslint no-restricted-globals: ["off"] */
import { useParams } from "react-router-dom";
import Discount from "./Discount";
import { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';

function Detail(props) {
  const [review, setReview] = useState([]);
  // useEffect 구조
  // useEffect(()=>{
  // second
  // }, 몇초 - first)
  // ,[] - third})
  // 

  //2초 후에 alert state를 false로 변경
  useEffect(()=>{
    let myTimer = setTimeout(()=>{
      setAlert(false)
    }, 2000)
    return () => {
      clearTimeout(myTimer)
    }
  }, [])
  
  let [alert, setAlert] = useState(true);
  // let [count, setCount] = useState(0);

  // useEffect(()=>{
  //   // 호출 시 실행되는 곳
  //   console.log('랜더링 될 때마다 실행')
  //   // 종료 시(사라질 때, 재랜더링 될 때) 실행 되는 곳
  //   return() => {
  //     console.log('종료 시 실행')
  //   }
  // },[count])
  // 없을 때  -- 매번 실행
  // []  -- 딱 한번만 실행
  // [state] -- 스테이트가 바뀔 때마다 실행


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

  const reviewData = () => {
    axios
    .get("https://zzzmini.github.io/js/shoesReview.json")
    .then((response) => {
      setReview(response.data); // 데이터를 상태에 저장
      console.log(response.data);
    })
    .catch((error) => {
      console.error("데이터를 가져오는 데 실패했습니다:", error);
    });
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
          {/* <button onlick={() => {
            setCount(count +1)
          }}>초기화{count}</button> */}
          <button className="btn btn-danger">주문하기</button>
        </div>

        <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
        >
          <Tab eventKey="home" title="무료 배송 및 반품">
            <div>{reviewData}</div>
          </Tab>
          <Tab eventKey="profile" title="리뷰(4.5 ★★★★☆)">
            <div>{review.ti}</div>
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