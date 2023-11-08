import { NextResponse } from "next/server";
import { conn } from '@/libs/mysql';

export  async function GET(request, {params}){
    //obtener todos los recursos
    try {
        const result = await conn.query("SELECT * FROM propiedad WHERE id = ?", [
            params.id,
        ]);
        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "Propiedad no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
    
}

export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        if (!data.name) {
            return NextResponse.json(
                {
                    message: "Nombre es requerido",
                },
                {
                    status: 400,
                }
            );
        }
        const result = await conn.query("UPDATE propiedad SET ? WHERE id = ?", [
            data,
            params.id,
        ]);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Propiedad no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        const updatedReg = await conn.query(
            "SELECT * FROM Regs WHERE id = ?",
            [params.id]
        );
        return NextResponse.json(updatedReg[0]);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export  async function DELETE(request, { params }) {
    try {
        const result = await conn.query("DELETE FROM propiedad WHERE id = ?", [
            params.id,
        ]);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Propiedad no encontrado",
                },
                {
                    status: 404,
                }
            );
        }
        return new Response(null, {
            status: 204,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }

}

