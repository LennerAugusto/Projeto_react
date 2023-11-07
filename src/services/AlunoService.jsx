import http from '../config/Banco';

export const listarAluno = async () => {
  return http({
    method: 'get',
    url: '/aluno/lista',
  }).then((response) => {
    return response.data;
  });
};

export const incluirAluno  = async (aluno ) => {
  return http({
    method: 'post',
    url: '/aluno/incluir',
    data: aluno ,
  }).then((response) => response.data);
};

export const lerIdAluno  = async (id) => {
  return http({
    method: 'get',
    url: `/aluno/alterar/${id}`,
  }).then((response) => {
    return response.data;
  });
};

export const ExcluirAluno  = async (id) => {
  return http({
    method: 'delete',
    url: `/aluno/excluir/${id}`,
  }).then((response) => {
    return response.data;
  });
};

export const alterarAluno  = async (id) => {
  return http({
    method: 'put',
    url: `/Aluno/alterar/${id}`,
  }).then((response) => {
    return response.data;
  });
};
