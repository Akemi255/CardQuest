import React from 'react';

const AwaitingRequests = () => {
  return (
    <>
      {/* Solicitudes pendientes */}
      <div className='bg-slate-700 p-4 mt-4 rounded-lg shadow-md'>
        <h2 className="text-lg font-bold mb-4 text-white">Solicitudes Pendientes</h2>
        <div className="custom-scrollbar overflow-y-auto max-h-60">
          {/* Lista de solicitudes pendientes */}
          <ul className="divide-y divide-gray-300">
            <li className="py-2 flex items-center">
              <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-4">
                {/* Puedes agregar aquí la lógica para mostrar la imagen del avatar */}
                <p className="text-black">UA</p>
              </div>
              <div className="flex-grow">
                <p className="text-white font-bold">Usuario A</p>
                <div className="flex">
                  <button className="bg-green-500 text-white px-2 py-1 mr-2 rounded hover:bg-green-600 text-sm">Aceptar</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">Cancelar</button>
                </div>
              </div>
            </li>
            <li className="py-2 flex items-center">
              <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-4">
                {/* Puedes agregar aquí la lógica para mostrar la imagen del avatar */}
                <p className="text-black">UB</p>
              </div>
              <div className="flex-grow">
                <p className="text-white font-bold">Usuario B</p>
                <div className="flex">
                  <button className="bg-green-500 text-white px-2 py-1 mr-2 rounded hover:bg-green-600 text-sm">Aceptar</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">Cancelar</button>
                </div>
              </div>
            </li>
            <li className="py-2 flex items-center">
              <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-4">
                {/* Puedes agregar aquí la lógica para mostrar la imagen del avatar */}
                <p className="text-black">UC</p>
              </div>
              <div className="flex-grow">
                <p className="text-white font-bold">Usuario C</p>
                <div className="flex">
                  <button className="bg-green-500 text-white px-2 py-1 mr-2 rounded hover:bg-green-600 text-sm">Aceptar</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">Cancelar</button>
                </div>
              </div>
            </li>
            {/* Agrega más elementos según sea necesario */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AwaitingRequests;
