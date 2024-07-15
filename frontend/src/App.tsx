import {Route, Routes} from 'react-router-dom'
import {Home} from './views/Home/Home.tsx'
import {Layout} from "./layouts/Layout.tsx";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><Home/></Layout>}>
        </Route>
        <Route path='/add'>
        </Route>
      </Routes>
    </>
  )
}
