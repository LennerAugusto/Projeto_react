import http from '../config/Banco';


export const listarCidade = async () => {
    return(
        http({
            method:'get',
            url:'/cidade/listaselecionada',
        }).then((response)=>{
             return response.data;
        })
    )
}

export const incluirCidade = async(cidade) => {
    return (
        http({
            method: 'post',
            url: '/cidade/incluir',
            data: cidade
        }).then((response) => response.data)
    )
}

