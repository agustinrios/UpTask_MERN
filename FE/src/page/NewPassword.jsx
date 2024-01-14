import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alert from '../components/Alert';
import clientAxios from '../config/ClientAxios';

const NewPassword = () => {
  const params = useParams();
  console.log(params)
  const { token } = params;

  const [ password, setPassword ] = useState('');
  const [ alert, setAlert ] = useState({});
  const [ tokenValido, setTokenValido ] = useState(false);
  const [ passwordConfirm, setPasswordConfirm ] = useState(false);

  useEffect(() => {
    const confirmarToken = async () => {
      try {
        await clientAxios(`/usuarios/restaurar-password/${token}`)
        setTokenValido(true)

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }
    }
    confirmarToken();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([ password ].includes('')){
      setAlert({
        msg: 'Todos los campos son obligatorios',
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

    setPasswordConfirm(true);
    setAlert({})

    try {
      const url = `/usuarios/restaurar-password/${token}`;
      const { data } = await clientAxios.post(url, {
        "password": password,
      });

      setAlert({
        msg: data.msg,
        error: false
      });

      setPassword('')
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
        Restablece tu contraseña y no pierdas tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      {msg && <Alert alert={alert} /> }

      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password"
              >
                Nueva Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Nueva Contraseña"
                className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Enviar"
              className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded
              hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
        </form>
      )}

      {passwordConfirm && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Iniciar Sesión
        </Link>
      )}
    </>
  )
}

export default NewPassword