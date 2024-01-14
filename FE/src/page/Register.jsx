import { useState } from 'react';
import { Link, } from 'react-router-dom';
import Alert from '../components/Alert';
import clientAxios from '../config/ClientAxios';

const Register = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repetPassword, setRepetPassword ] = useState('');
  const [ alert, setAlert ] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([name, email, password, repetPassword].includes('')){
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password != repetPassword){
      setAlert({
        msg: 'Las contraseñas no coincden',
        error: true
      })
      return
    }

    if(password.length < 8){
      setAlert({
        msg: 'La contraseña necesita minimo 8 caracteres',
        error: true
      })
      return
    }

    setAlert({})
    //Crear el usuario en la api
    try {
      const { data } = await clientAxios.post(`/usuarios`, {
        "nombre": name,
        "password": password,
        "email": email
      });

      setAlert({
        msg: data.msg,
        error: false
      });

      setName('')
      setEmail('')
      setPassword('')
      setRepetPassword('')
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
        Crea una cuenta y administra tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      {msg && <Alert alert={alert} /> }

      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre"
            className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
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
            placeholder="Contraseña de Registro"
            className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >
           Repetir Contraseña
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repetir Contraseña"
            className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
            value={repetPassword}
            onChange={e => setRepetPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded
          hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
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

export default Register