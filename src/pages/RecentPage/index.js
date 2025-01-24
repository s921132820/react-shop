import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

function RecentPage(props) {
  const navigate = useNavigate();
  const [recentProducts, setRecentProducts] = useState([]);
  const p = props.product; // App.js에서 전달한 product 배열

  useEffect(() => {
    // localStorage에서 최근 본 상품 아이디 리스트 가져오기
    const recentData = JSON.parse(localStorage.getItem("recent")) || [];
    if (recentData.length > 0) {
      // recentData에서 아이디에 해당하는 상품 정보를 찾아서 배열로 저장
      const recentProductDetails = recentData.map((id) => {
        return p.find((product) => product.id === id);
      });
      setRecentProducts(recentProductDetails); // 최근 본 상품 정보 상태에 저장
    }
  }, [p]);

  return (
    <div>
      <h2>최근 본 상품</h2>
      <Stack gap={3} direction="horizontal">
        {recentProducts.length > 0 ? (
          recentProducts.map((product) => (
            <Card style={{ width: '300px' }} key={product.id} onClick={() => navigate(`/detail/${product.id}`)}>
              <img
                src={process.env.PUBLIC_URL + `/images/shoes${product.id + 1}.jpg`}
                width="80%"
                alt={product.title}
              />
              <p>{product.title}</p>
              <p>{product.content}</p>
              <p>{product.price}</p>
            </Card>
          ))
        ) : (
          <p>최근 본 상품이 없습니다.</p>
        )}
      </Stack>
    </div>  
  );
}

export default RecentPage;