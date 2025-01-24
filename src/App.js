import './App.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import data from './data/shoes-data';
import { useEffect, useState } from 'react';
import Product from "./component/Product";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from "./pages/DetailPage";
import AboutPage from './pages/AboutPage';
import EventPage from './pages/AboutPage/EventPage'
import CartPage from './pages/CartPage';
import RecentPage from './pages/RecentPage';
import axios from 'axios';

function App() {
  // localStorage에 초기 설정
  // useEffect(()=>{
  //   localStorage.setItem('recent',JSON.stringify([]))
  // }, [])

  const [product, setProduct] = useState(data);
  const [page, setPage] = useState(1);
  let navigate = useNavigate();

  // localStorage
  let outData = localStorage.getItem('data');
  console.log(JSON.parse(outData));
  localStorage.setItem('data', JSON.stringify(product))

  const moreData = () => {
    axios.get('https://s921132820.github.io/js/shoes_data.json')
      .then((result) => {
        const allData = result.data; // 전체 데이터
        const startIndex = (page - 1) * 3; // 현재 페이지의 시작 인덱스
        const nextData = allData.slice(startIndex, startIndex + 3); // 3개씩 가져오기

        if (nextData.length > 0) {
          setProduct([...product, ...nextData]); // 기존 데이터에 추가
          setPage(page + 1); // 다음 페이지로 이동
        } else {
          console.log("더 이상 데이터가 없습니다.");
        }
      })
      .catch(() => {
        console.log("데이터 가져오기에 실패했습니다.");
      });
  };


  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>
              navigate("/")
            }>
              Home
            </Nav.Link>
            <Nav.Link onClick={()=>
              navigate("/recent")
            }>
              최근 본 상품
            </Nav.Link>
            <Nav.Link onClick={()=>
              navigate("/cart")
              } >
                Cart
            </Nav.Link>
            <Nav.Link onClick={()=>
              navigate("/about")
              } >
                About
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar> 
      <div className="main-bg"></div>

      {/* 라우터 처리 */}
      <Routes>
        <Route path="/main" element={<div><MainPage product={product} /></div>}>
        
        </Route>
        <Route index element={<MainPage product={product} />}></Route>

        <Route path="/detail/:id" element={<div>
          <DetailPage
          product = {product}
          />
          </div>} 
          />
        <Route path="/recent" element={<div><RecentPage product={product} /></div>} />
        <Route path="/cart" element={<div><CartPage /></div>} />
        <Route path="/about" element={<div><AboutPage /></div>}>
          <Route path="member" element={<div>직원소개 페이지</div>}></Route>
          <Route path="location" element={<div>길안내 페이지</div>}></Route>
        </Route>
        <Route path="/event" element={<div><EventPage /></div>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>
        <Route path="*" element={
          <div>
            <h4>Page Not Found 404 Error.</h4>
          </div>}>
        </Route>
      </Routes>


    </div>
  );
}

export default App;