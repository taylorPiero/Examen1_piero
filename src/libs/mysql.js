import mysql from 'serverless-mysql';
export const conn= mysql({
    config:{
        host:'localhost',
        user:'root',
        password:'root',
        port:'33065',
        database:'“dbexamen01',
        temezone:'America/Lima'

    }
})