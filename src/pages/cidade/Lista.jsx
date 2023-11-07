import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import ShowMensagem from '../../components/mensagem/ShowMensagem';
import { listarCidade } from '../../services/CidadeService';

function Lista() {
  const [titulo, setTitulo] = useState('Lista de Cidades');
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    const getDataCidade = async () => {
      const response = await listarCidade();
      console.log(response);
      setCidades(response);
    };
    getDataCidade();
  }, []);

  return (
    <Fragment>
      <div className="app-content">
        <ShowMensagem
          titulo="Cadastro de Cidades"
          iconTitulo={<FaIcons.FaListAlt />}
          iconReturn={AiIcons.AiFillDashboard}
          url="/home"
          tituloUrl="Dashboard"
        />
        <div className="row">
          <div className="col-md-12">
            <div className="listagem">
              <div className="row justify-content-center">
                <form>
                  <div className="row mb-3">
                    <label htmlFor="filtro" className="col-sm-1 col-form-label">
                      Filtro:
                    </label>
                    <div className="col-xs-11 col-sm-11 col-md-6 col-log-6">
                      <input type="text" id="filtro" name="keyword" className="form-control" />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 col-log-4">
                      <button type="submit" className="btn btn-primary form-control">
                        Pesquisar
                      </button>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
                </div>
                <div id="no_more_table">
                  <table
                    id="tableCidade"
                    className="table table-striped table-bordered table-hover table-collapse cf">
                    <thead className="cf">
                      <tr className="p-3 mb-2 bg-success text-white">
                        <th>Id</th>
                        <th>Código Cidade</th>
                        <th>Nome</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cidades &&
                        cidades.map((cidade) => (
                          <tr key={cidade.idCidade}>
                            <td data-label="Id">{cidade.idCidade}</td>
                            <td data-label="Código">{cidade.codCidade}</td>
                            <td data-label="Nome">{cidade.nomeCidade}</td>
                            <td data-label="Ação">
                              <Link
                                id="btnUpdate"
                                type="button"
                                className="btn btn-info btn-sm"
                                title="Alterar dados do cidade selecionado"
                                to={`/cidade/alterar/${cidade.idCidade}`}>
                                <i className="fa fa-pencil"></i>
                              </Link>
                              <Link
                                id="btnExcluir"
                                type="button"
                                className="btn btn-danger btn-sm "
                                title="Excluir dados do cidade selecionado"
                                to={`/cidade/excluir/${cidade.idCidade}`}>
                                <i className="fa fa-trash"></i>
                              </Link>
                              <Link
                                id="btnConsultar"
                                className="btn btn-success btn-sm"
                                type="button"
                                title="Consultar dados do cidade selecionado"
                                to={`/cidade/consultar-por-id/${cidade.idCidade}`}>
                                <i className="fa fa-search-plus"></i>
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                      <Link className="page-link" to="#" aria-disabled="true">
                        Previous
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        Next
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div>
                <Link to="/cidade/incluir" type="button" className="btn btn-primary btn-lg">
                  Novo Cidade
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Lista;
