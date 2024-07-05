import { lazy,React } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <BrowserRouter> 
        <Routes>
          <Route>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
