import { Link, } from 'react-router-dom';

const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablece tu contraseña y no pierdas tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
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
          />
        </div>
        <input
          type="submit"
          value="Enviar"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded
          hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  )
}

export default NewPassword