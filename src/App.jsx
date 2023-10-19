import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom/dist';
import Resultado from './modals/Resultado';
import { useSnapshot } from 'valtio';
import state from './store';

function App() {
  const [count, setCount] = useState(0)
  useSnapshot(state)
  return (
    <div className='body'>
      <Header />
      <div>
        <Sidebar />
        <Resultado isOpen={state.message} />
        <Outlet />
      </div>
    </div>
  )
}

export default App
