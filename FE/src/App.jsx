import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import RutaProtegida from './layouts/RutaProtegida';
import Login from './page/Login';
import Register from './page/Register';
import ForgotPassword from './page/ForgotPassword';
import NewPassword from './page/NewPassword';
import ConfirmAccount from './page/ConfirmAccount';
import Proyectos from './page/Proyectos';
import { AuthProvider } from './context/AuthProvider';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='new-password/:token' element={<NewPassword />} />
              <Route path='confirm/:token' element={<ConfirmAccount />} />
            </Route>
          </Routes>

          <Routes path='/proyectos' element={<RutaProtegida />}>
            <Route index element={<Proyectos />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
