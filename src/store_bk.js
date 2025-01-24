import { configureStore, createSlice } from '@reduxjs/toolkit';

// slice 정의
// createSlice == useState

let imsiData = createSlice({
  name : 'imsiData',
  initialState : {
    name : '장원영',
    groupName : '아이브',
    age : 20
  },
  reducers : {
    changeGroup(state) {
      state.groupName = 'ive'
    },

    // state는 원래 값, x은 저쪽에서 전달받은 값
    // padload : 화물, 택배
    changeAge(state, action) {
      state.age = state.age + action.payload
    }
  }
})

let userName = createSlice({
  name : 'user', // slice 이름 (상태를 구분하는 식별자)
  initialState : ['kim','lee','park'] // 초기 상태
})

let productStock = createSlice({
  name : 'productStock',
  initialState : [10, 5, 2]
})

let cartData = createSlice({
  name : 'cartData',
  initialState : [
    // { id : 0, title: 'white and black', price:10000, count : 0},
    // { id : 1, title: 'red knit', price:20000, count : 0},
    // { id : 1, title: 'grey yordan', price:13000, count : 0},
  ],
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
    }
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

export default configureStore({
  reducer : {
    userName : userName.reducer,
    productStock : productStock.reducer,
    cartData : cartData.reducer,
    logginUser : logginUser.reducer,
    imsiData : imsiData.reducer,
  }
})

export let {changeUserName} = logginUser.actions;
export let {changeGroup} = imsiData.actions;
export let {changeAge} = imsiData.actions;
export let {addCount} = cartData.actions;
export let {minusCount} = cartData.actions;

