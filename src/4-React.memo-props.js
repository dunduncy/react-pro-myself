// React.memo props 比较机制

// 1. 传递一个简单类型的prop prop变化时组件重新渲染

// 2. 传递一个引用类型的prop 比较的是新值和旧值的引用是否相等 当父组件的函数重新执行时，实际上形成的时新的数组引用

// 3. 保证引用稳定 -> useMemo 组件渲染的过程中缓存一个值
import { memo, useState,useMemo } from 'react'

const MemoSon = memo(function Son({list}) {
  console.log('我是子组件，我重新渲染了')
  return <div>this is son {list}</div>
})

function App() {
  const [count,setCount] = useState(0)
  // const num = 100
  const list = useMemo(() => {
   return [1,2,3]
  }, [])
  return (
    <div className='App'>
      <MemoSon list = {list}/>
      <button onClick={()=>setCount(count + 1)}>change count</button>
    </div>
  )
}

export default App