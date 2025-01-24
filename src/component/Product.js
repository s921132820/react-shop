import React from "react";
import { useNavigate } from "react-router-dom";

function Product(props) {
  const navigate = useNavigate();
  let i = props.index;
  let p = props.product;
  
  return (
    <div onClick={() => {navigate(`/detail/${p[i].id}`)
    // 최근 본 상품 번호를 localStorage에 배열로 저장
    // 중복을 허용하지 않도록
    // localStorage 정보 읽어옴
    let recentData = JSON.parse(localStorage.getItem("recent"));
    console.log(recentData);

    let nowData = [];
    //현재 열어본 상품의 아이디를 저장a
    nowData.push(i);
    // Set으로 중복된 값 제거
    // Set 예시 : [0, 0, 1, 0, 2] ==> [0, 1, 2]
    nowData = [... new Set(nowData)]

    if(recentData != null) {
      nowData = [... recentData]
    } 
    nowData.push(i);
      // 스토리지에 있는거 읽어서 중복 제거 후 다시 저장
      nowData = [... new Set(nowData)];
      localStorage.setItem("recent", JSON.stringify(nowData))
    }}>

        <img src={process.env.PUBLIC_URL + `/images/shoes${p[i].id+1}.jpg`} width='80%'></img>
        <h4>{p[i].title}</h4>
        <p>{p[i].content}</p>
        <p>{p[i].price}</p>
    </div>
  );
}

export default Product;