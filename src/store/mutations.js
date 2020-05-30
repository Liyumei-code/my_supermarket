import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default{
  // mutataions唯一目的是为了修改state中的状态
    // 所以尽可能只做一件事情
    [ADD_COUNTER](state,payload){
      payload.count++;
    },
    [ADD_TO_CART](state,payload){
      // 需要先在模型中添加此值，否则无法正确赋值
      payload.checked=false
      state.cartList.push(payload)
    }
}