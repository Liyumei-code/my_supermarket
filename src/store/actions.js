import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'
export default {
  // addCart9(context,payload) 下面是此句的解构模式
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // console.log(context);

      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新商品')
      }
    })
  }
}