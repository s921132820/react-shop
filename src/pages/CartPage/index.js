import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, minusCount, deleteCart, sumProduct } from "../../store"
import { changeGroup } from '../../store';
import { useEffect } from 'react';

function CartPage() {


  let productStock = useSelector((state)=>{
    return state.productStock;
  })

  let cartData = useSelector((state)=>{
    return state.cartData;
  })

  console.log(cartData);
  
  // 스토어에 있는 변경함수 호출하는 택배기사를 생성
  let dispatcher = useDispatch();

  let logginUser = useSelector((state)=>{
    return state.logginUser;
  })

  // 총합계금액
  const totalPrice = () => {
    return cartData.reduce((total, item) => total + item.price * item.count, 0);
  };

  return(
    <div>
      <p>{logginUser} 님의 장바구니</p>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>
              상품명
              <span>▲</span>
              <span>▼</span>
            </th>
            <th>단가</th>
            <th>금액</th>
            <th>수량</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {
            cartData.map((x) => {
              return (
                <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.title}</td>
                <th>{x.price}</th>
                <th>{x.price * x.count}</th>
                <td>{x.count}
                  <span onClick={()=>{dispatcher(addCount(x.id))}}>➕</span>
                  <span onClick={()=>{dispatcher(minusCount(x.id))}}>➖</span></td>
                <td onClick={()=>dispatcher(deleteCart(x.id))}>❌</td>
              </tr>
              )
            })
          }
          <tr>
            <td colSpan={4}>총 금액</td>
            <td colSpan={2}>{totalPrice()}원</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default CartPage;


// 수량 업다운 단추
// 삭제 단추