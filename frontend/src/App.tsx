import {Route, Routes} from 'react-router-dom'
import {Home} from './views/Home/Home.tsx'
import {Layout} from "./layouts/Layout.tsx";
import {AddForm} from "./views/AddForm/AddForm.tsx";
import {Toaster} from "sonner";

export const App = () => {
  return (
    <>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Layout><Home/></Layout>}>
        </Route>
        <Route path='/add' element={<Layout><AddForm/></Layout>}>
        </Route>
      </Routes>
    </>
  )
}
