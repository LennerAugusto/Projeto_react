import http from '../config/Banco';

export const listarProfessores = async () => {
  return http({
    method: 'get',
    url: '/professor/lista',
  }).then((response) => {
    return response.data;
  });
};

export const incluirProfessor = async (professor) => {
  return http({
    method: 'post',
    url: '/professor/incluir',
    data: professor,
  }).then((response) => response.data);
};

export const lerIdProfessor = async (id) => {
  return http({
    method: 'get',
    url: `/professor/alterar/${id}`,
  }).then((response) => {
    return response.data;
  });
};

export const ExcluirProfessor = async (id) => {
  return http({
    method: 'delete',
    url: `/professor/excluir/${id}`,
  }).then((response) => {
    return response.data;
  });
};

export const alterarProfessor = async (id) => {
  return http({
    method: 'put',
    url: `/professor/alterar/${id}`,
  }).then((response) => {
    return response.data;
  });
};
