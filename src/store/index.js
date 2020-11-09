import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的列表
    list: [],
    // 文本框
    inputValue: '',
    // 显示的状态
    viewKey: 'all'
  },
  mutations: {
    // 初始化数据
    initList (state, step) {
      state.list = step
    },
    // 输入框数据改变
    inputChange (state, step) {
      state.inputValue = step
    },
    // 添加数据
    addList (state) {
      const obj = {
        id: state.list.length,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
    },
    // 删除数据
    deleteData (state, step) {
      // 筛选出删除的索引
      const id = state.list.findIndex(item => item.id === step)
      // 根据索引删除数据
      if (id !== -1) {
        state.list.splice(id, 1)
      }
    },
    // 修改选中状态
    changeChecked (state, step) {
      // 筛选出改变的索引
      const id = state.list.findIndex(item => item.id === step[1])
      // 根据索引删除数据
      if (id !== -1) {
        state.list[id].done = step[0].target.checked
      }
    },
    // 清楚已完成的数据
    clean (state) {
      state.list = state.list.filter(item => item.done === false)
    },
    // 修改key
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  modules: {
  },
  getters: {
    // 未完成的长度
    unDoneLength (state) {
      return state.list.filter(item => item.done === false).length
    },
    // 根据不同的情况进行数据返回封装
    infoList (state) {
      // 查看全部
      if (state.viewKey === 'all') {
        return state.list
      }
      // 查看未完成的数据
      if (state.viewKey === 'undone') {
        return state.list.filter(item => item.done === false)
      }
      // 查看已完成的数据
      if (state.viewKey === 'done') {
        return state.list.filter(item => item.done === true)
      }
    }
  }
})
