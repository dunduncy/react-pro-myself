import { useEffect } from 'react'
// zustand
import { create } from 'zustand'
const URL = 'http://geek.itheima.net/v1_0/channels'
// 1. 拆分子模块 再组合起来
const createCounterStore = (set) => {
  return {
    // 状态数据
    count: 0,
    // 修改状态数据的方法
    inc: () => {
      set((state) => ({ count: state.count + 1 }))
    },
  }
}

const createChannelStore = (set) => {
  return {
    channelList: [],
    fetchGetList: async () => {
      const res = await fetch(URL)
      const jsonRes = await res.json()
      set({
        channelList: jsonRes.data.channels
      })
    }
  }
}
// 2. 组件使用
const useStore = create((...a) => {
  return {
    ...createCounterStore(...a),
    ...createChannelStore(...a)
  }
})
// 2. 绑定store到组件
// useStore => {count, inc}
function App() {
  const { count, inc, fetchGetList, channelList } = useStore()
  useEffect(() => {
    fetchGetList()
  }, [fetchGetList])
  return (
    <>
      <button onClick={inc}>{count}</button>
      <ul>
        {
          channelList.map(item => {
            return <li key={item.id}>{item.name}</li>
          })
        }
      </ul>
    </>
  )
}
export default App