const Init = {
  id: 0,
  type: '',
  phone: '',
  money: 666
}
export default {
  state: Init,
  reducers: {
    increment(state, payload) {
      return { ...state, money: state.money + payload }
    }
  },
  effects: {
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment(payload)
    }
  }
}
