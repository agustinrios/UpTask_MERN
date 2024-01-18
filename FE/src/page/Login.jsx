import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import backendURL from '../config/ClientAxios';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [ alert, setAlert ] = useState({});
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const { auth, setAuth, cargando } = useAuth();

  console.log(auth)
  console.log(cargando)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([ email, password, ].includes('')){
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      const { data } = await axios.post(`${backendURL}/usuarios/login`, {
        "password": password,
        "email": email
      });

      setAlert({})
      localStorage.setItem('token', data.token)

      setAuth(data);

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded
          hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
        >
          ¿No tienes cuenta? Regístrate
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/Forgot-Password"
        >
          Olvide mi Contraseña
        </Link>
      </nav>
    </>
  )
}

export default Login
