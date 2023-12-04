import React from 'react';

const ReceivedRequests = () => {
  return (
    <>
      {/* Solicitudes recibidas */}
      <div className='bg-slate-700 p-4 rounded-lg shadow-md'>
        <h2 className="text-lg font-bold mb-4 text-white">Solicitudes Recibidas</h2>
        <div className="custom-scrollbar overflow-y-auto max-h-60">
          {/* Lista de solicitudes recibidas */}
          <ul className="divide-y divide-gray-300">
            <li className="py-2 flex items-center">
              <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-4">
                {/* Puedes agregar aquí la lógica para mostrar la imagen del avatar */}
                <p className="text-black">U1</p>
              </div>
              <div className="flex-grow">
                <p className="text-white font-bold">Usuario 1</p>
                <div className="flex">
                  <button className="bg-green-500 text-white px-2 py-1 mr-2 rounded hover:bg-green-600 text-sm">Aceptar</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">Cancelar</button>
                </div>
              </div>
            </li>
            <li className="py-2 flex items-center">
              <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-4">
                {/* Puedes agregar aquí la lógica para mostrar la imagen del avatar */}
                <p className="text-black">U2</p>
              </div>
              <div className="flex-grow">
                <p className="text-white font-bold">Usuario 2</p>
                <div className="flex">
                  <button className="bg-green-500 text-white px-2 py-1 mr-2 rounded hover:bg-green-600 text-sm">Aceptar</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">Cancelar</button>
                </div>
              </div>
            </li>
            <li className="py-2 flex items-center">
              <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-4">
                {/* Puedes agregar aquí la lógica para mostrar la imagen del avatar */}
                <p className="text-black">U3</p>
              </div>
              <div className="flex-grow">
                <p className="text-white font-bold">Usuario 3</p>
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

export default ReceivedRequests;
