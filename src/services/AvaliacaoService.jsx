import http from '../config/Banco';

export const listarAvaliacao = async () => {
  return http({
    method: 'get',
    url: '/avaliacao/lista',
  }).then((response) => {
    return response.data;
  });
};

export const incluirAvaliacao  = async (avaliacao) => {
    return http({
      method: 'post',
      url: '/avaliacao/incluir',
      data: avaliacao ,
    }).then((response) => response.data);
};

export const ExcluirAvaliacao  = async (id) => {
    return http({
      method: 'delete',
      url: `/avaliacao/excluir/${id}`,
    }).then((response) => {
      return response.data;
    });
  };
  
  export const alterarAvaliacao  = async (id) => {
    return http({
      method: 'put',
      url: `/avaliacao/alterar/${id}`,
    }).then((response) => {
      return response.data;
    });
  };
  
