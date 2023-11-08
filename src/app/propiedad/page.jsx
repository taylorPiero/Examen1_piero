"use client";
import { useState, useEffect } from "react";
import axios from "axios";

async function loadPropiedad(){
    try {
        const response = await axios.get('api/propiedad');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('El error es que no recibe los datos: ', error);
        return [];
    }
}

function PropiedadList(){
    const[propiedad, setPropiedad] = useState([]);
    useEffect(()=>{
        const fetchPropiedad = async()=>{
            const propiedadData = await loadPropiedad();
            setPropiedad(propiedadData);
        };
        fetchPropiedad();
    }, []);

    const deletePropiedad = async (propiedadId) => {
        try {
          if (confirm('Are you sure you want to delete this product?')) {
            const res = await axios.delete(`/api/propiedad/${propiedadId}`);
            if (res.status === 204) {
              // Update the propiedad state after successful deletion
              setPropiedad((prevPropiedad) =>
              prevPropiedad.filter((propiedad) => propiedad.id !== propiedadId)
              );
            }
          }
        } catch (error) {
          console.error('Error deleting propiedad:', error);
        }
      };

    return(
        <>
        <h2 className=" text-2xl font-extrabold dark:text-black m-8">
            Propiedad{' '}
            <a href="/propiedad/new" className="bg-blue-500 hover:bg-blue-700 text-sm
            text-white font-bold py-2 px-4 rounded mt-5"> Nuevo</a>
        </h2>
        <div className='shadow-md rounded-md px-8 pt-6 pb-8 mb-4'>
            <table className='min-w-full text-left text-sm font-light'>
                <thead>
                    <tr className='border-b font-medium dark:border-neutral-500'>
                        <th>Options</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>direccion</th>
                        <th>caracteristicas</th>
                        <th>estado</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    { propiedad.map((propiedad, index)=>{
                        return(
                            <tr key ={index} className='border-b hover:bg-gray-100'>
                                <td className="whitespace-nowrap px-6 py-4"><button>Delete</button></td>
                                <td className="whitespace-nowrap px-6 py-4">{propiedad.id}</td>
                                <td className="whitespace-nowrap px-6 py-4">{propiedad.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{propiedad.direccion}</td>
                                <td className="whitespace-nowrap px-6 py-4">{propiedad.caracteristicas}</td>
                                <td className="whitespace-nowrap px-6 py-4">{propiedad.estado}</td>
                                <td className="whitespace-nowrap px-6 py-4">{propiedad.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default PropiedadList