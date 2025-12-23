
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Encryption from './Components/Encryption/Encryption.jsx'
import History from './Components/History/History.jsx'
import Statistics from './Components/Statistics/Statistics.jsx'
import HybridSystem from './Components/HybridSystem/HybridSystem.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import { CryptoProvider } from './context/CryptoContext.jsx'


let routers = createBrowserRouter([{
  path:'' , element : <Layout/>,children:[
    {index: true , element: <Encryption/>},
    {path:'encryption' , element: <Encryption/>},
    {path:'history' , element: <History/>},
    {path:'statistics' , element: <Statistics/>},
    {path:'hybrid-system' , element: <HybridSystem/>},
    {path:'*' , element: <NotFound/>},
  ]
}])
function App() {

  return <>

    <CryptoProvider>
      <RouterProvider router={routers}></RouterProvider>
    </CryptoProvider>

  </>
}

export default App
