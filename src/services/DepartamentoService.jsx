
import http from '../config/Banco';


export const listarDepartamento = async () => {
    return(
        http({
            method:'get',
            url:'/departamento/listagem',
        }).then((response)=>{
             return response.data;
        })
    )
}