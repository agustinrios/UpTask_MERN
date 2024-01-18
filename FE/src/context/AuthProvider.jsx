import { useState, useEffect, createContext } from "react";
import backendURL from '../config/ClientAxios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [ auth, setAuth ] = useState({});
  const [ cargando, setCargando ] = useState('true');

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await axios.get(`${backendURL}/usuarios/perfil`, config)

        setAuth(data)
      } catch (error) {
        
      } finally {
        setCargando(false)
      }
    }

    autenticarUsuario();
  }, [])
  

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext;
