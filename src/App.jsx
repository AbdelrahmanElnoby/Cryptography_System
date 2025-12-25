
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Encryption from './Components/Encryption/Encryption.jsx'
import History from './Components/History/History.jsx'
import Statistics from './Components/Statistics/Statistics.jsx'
import HybridSystem from './Components/HybridSystem/HybridSystem.jsx'
import About from './Components/About/About.jsx'
import Guide from './Components/Guide/Guide.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import { CryptoProvider } from './context/CryptoContext.jsx'
import { ScrollProvider } from './context/ScrollContext.jsx'


let routers = createBrowserRouter([{
  path:'' , element : <Layout/>,children:[
    {index: true , element: <Home/>},
    {path:'home' , element: <Home/>},
    {path:'encryption' , element: <Encryption/>},
    {path:'history' , element: <History/>},
    {path:'statistics' , element: <Statistics/>},
    {path:'hybrid-system' , element: <HybridSystem/>},
    {path:'about' , element: <About/>},
    {path:'guide' , element: <Guide/>},
    {path:'*' , element: <NotFound/>},
  ]
}])
function App() {

  return <>

    <CryptoProvider>
      <ScrollProvider>
        <RouterProvider router={routers}></RouterProvider>
      </ScrollProvider>
    </CryptoProvider>

  </>
}

export default App
