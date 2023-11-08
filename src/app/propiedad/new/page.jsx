"use client"
import React from 'react'
import { useState } from 'react';
import axios from "axios";

function PropiedadForm() {
  const [propiedad, setPropiedad] = useState({
    
    name: "",
    direccion:"",
    caracteristicas: "",
    estado:"",
    price: ""
 
  });

  const handleChange = (e) => {
    //console.log(e.target.value, e.target.name);
    setPropiedad({
      ...propiedad,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(propiedad);
    const res = await axios.post('/api/propiedad', propiedad);
    if (res.status ==200){
      alert ("Registro exitoso");
      location.href ="/propiedad";
    }else{
      alert("Error en el registro");
    }

  }

    return(
        <div className='m-8'>
            <h2 className="text-2xl font-extrabold text-gray-400 hover:text-gray-800"> Propiedad</h2>
            <form onSubmit={handleSubmit} className='px-8 pt-6 pb-8 mb-4 roumded-md shadow-md  bg-gray-50 ' >
                <label className='block mb-2 text-sm font-medium  text-gray-900' htmlFor="Name">Name</label>
                <input type="text" name="name" onChange={handleChange} className='bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' placeholder="Nombre" />

                <label className ='block mb-2 text-sm font-medium  text-gray-900' htmlFor="Name">Direccion</label>
                <input type="text" name="name" onChange= {handleChange} className= 'bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                placeholder="Direccion" />
                
                <label className ='block mb-2 text-sm font-medium  text-gray-900' htmlFor="Name">Caracteristica</label>
                <input type="text" name="name" onChange= {handleChange} className= 'bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                placeholder="Caracteristicas" />

                <label className ='block mb-2 text-sm font-medium  text-gray-900' htmlFor="Name">Estado</label>
                <input type="text" name="name" onChange= {handleChange} className= 'bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                placeholder="Estado" />
                
                <label className ='block mb-2 text-sm font-medium  text-gray-900' htmlFor="Name">Price</label>
                <input type="text" name="name" onChange= {handleChange} className= 'bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                placeholder="Precio" />
                
                <button className='bg-blue-500 hover:bg-blue-700 text-sm text-white
                font-bold py-2 px-4 rounded mt-5'> Guardar</button>
            </form> 
                
         </div>
    )
}

export default PropiedadForm