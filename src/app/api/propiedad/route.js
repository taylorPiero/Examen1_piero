import { NextResponse } from "next/server";
import { conn } from '@/libs/mysql';

export async function GET(){
    
    try {
        const results=await conn.query("SELECT * FROM propiedad");
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            {message:error.message},
            {status:500}
        );
    }

}

export  async function POST(request){
    //crear un nuevo recurso
    try {
        const {name,direccion,caracteristicas,estado,price} = await request.json();
        const result = await conn.query("INSERT INTO propiedad SET ?",{
            name,
            direccion,
            caracteristicas,
            estado,
            price
        });
        return NextResponse.json({
            name,
            direccion,
            caracteristicas,
            estado,
            price,
            id:result.insertId
        });
    } catch (error) {
        return NextResponse.json(
            {message:error.message},
            {status:500}
        )
    }

}