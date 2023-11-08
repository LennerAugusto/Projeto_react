import http from '../config/Banco';


export const listarDisciplina = async () => {
    return(
        http({
            method:'get',
            url:'/disciplina/listaselecionada',
        }).then((response)=>{
             return response.data;
        })
    )
}

export const incluirDisciplina = async(disciplina) => {
    return (
        http({
            method: 'post',
            url: '/disciplina/incluir',
            data: disciplina
        }).then((response) => response.data)
    )
}