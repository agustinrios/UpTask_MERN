import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alert from '../components/Alert';

const ConfirmAccount = () => {
  const params = useParams();
  const { token } = params;

  const [ alert, setAlert ] = useState({});
  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);

  const backUrl = import.meta.env.VITE_BACKEND_URL;
  
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `https://localhost:4000/api/usuarios/confirmar/${token}`
        const { data } = await axios.get(url)

        setAlert({
          msg: data.msg,
          error: false
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }
    }
    confirmarCuenta();
  }, [])

  
  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a crear tus
        <span className="text-slate-700"> proyectos</span>
      </h1>
      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alert alert={alert} /> }

        {cuentaConfirmada && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
      
    </>
  )
}

export default ConfirmAccount