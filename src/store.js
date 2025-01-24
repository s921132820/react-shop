import { configureStore, createSlice } from '@reduxjs/toolkit';

let productStock = createSlice({
  name : 'productStock',
  initialState : [10, 5, 2]
})

let cartData = createSlice({
  name : 'cartData',
  initialState : [],
  reducers : {
    addCount(state, action) {
      const id = action.payload;
      const item = state.find((item)=> item.id === id);
      if (item) {
        item.count++;
      }
    },
    minusCount(state, action) {
      const id = action.payload;
      const item = state.find((item)=>item.id === id);
      if (item && item.count > 0) {
        item.count--;
      }
    },
    addCart(state, action) {
      const product = action.payload;
      const existItem = state.find((item) => item.id === product.id);

      if (existItem) {
        existItem.count += 1;
      } else {
        state.push({... product, count : 1});
      }
    },
    deleteCart(state, action) {
      const productId = action.payload;
      const updatedState = state.filter((item) => item.id !== productId);
      return updatedState;
    },
  }
})

let logginUser = createSlice({
  name : 'logginUser',
  initialState : 'test',
  // 수정
  reducers : {
    // state = 원래의 데이터를 의미
    changeUserName(state) {
      return state + '님'
    }
  }
})

// 리뷰 관리
const reviewData = createSlice ({
  name : 'reviewData',
  initialState : {
    reviews : [],
  },
  reducers : {
    setReviews(state, action) {
      state.reviews = action.payload;
    }
  }
})


// Export
export default configureStore({
  reducer : {
    productStock : productStock.reducer,
    cartData : cartData.reducer,
    logginUser : logginUser.reducer,
    reviewData : reviewData.reducer
  }
});

export let {changeUserName} = logginUser.actions;
export let {addCount} = cartData.actions;
export let {minusCount} = cartData.actions;
export let {addCart} = cartData.actions;
export let {deleteCart} = cartData.actions;
export let {sumProduct} = cartData.actions;
export let {setReviews} = reviewData.actions;
