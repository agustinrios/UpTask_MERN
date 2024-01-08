import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './page/Login';
import Register from './page/Register';
import ForgotPassword from './page/ForgotPassword';
import NewPassword from './page/NewPassword';
import ConfirmAccount from './page/ConfirmAccount';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='new-password/:token' element={<NewPassword />} />
            <Route path='confirm/:id' element={<ConfirmAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
