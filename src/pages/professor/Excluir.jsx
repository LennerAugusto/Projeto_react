import React, { Fragment, useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import { Link, useParams } from 'react-router-dom';
import Alert from '../../components/mensagem/alert';
import Mensagem from '../../components/mensagem/Mensagem';
import ShowMensagem from '../../components/mensagem/ShowMensagem';
import { listarCidade } from '../../services/CidadeService';
import { ExcluirProfessor, lerIdProfessor } from '../../services/ProfessorService';
import { ERROR_PROF, PROFESSOR } from './Professor';

const RemoverProfessor = () => {
  const [professor, setProfessor] = useState(PROFESSOR);
  const [error, setError] = useState(ERROR_PROF);
  const { id } = useParams();

  const [idProfessor, setIdProfessor] = useState('');
  const [codProfessor, setCodProfessor] = useState('');
  const [nomeProfessor, setNomeProfessor] = useState('');
  const [idCidade, setIdCidadeProfessor] = useState('');
  const [cidades, setCidades] = useState([]);
  const [show, setShow] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [tipo, setTipo] = useState('');

  useEffect(() => {
    const getCidades = async () => {
      const response = await listarCidade();

      setCidades(response);
    };

    const lerProfessor = async () => {
      const data = await lerIdProfessor(id);
      setIdProfessor(data.object.idProfessor);
      setCodProfessor(data.object.codProfessor);
      setNomeProfessor(data.object.nomeProfessor);
      setIdCidadeProfessor(data.object.idCidade);
    };
    lerProfessor();

    getCidades();
  }, []);

  const onSubmitProfessor = (e) => {
    e.preventDefault();

    Remocao(id);
  };

  const Remocao = async (professor) => {
    const data = await ExcluirProfessor(professor);
    console.log(data);

    if (data.status === 200) {
      setMensagem(data.mensagem);
      setTipo('sucess');
      setShow(true);
    }
  };

  return (
    <Fragment>
      <div className="app-content">
        <ShowMensagem
          titulo="Excluir Professor"
          iconTitulo={<GiIcons.GiTeacher />}
          iconReturn={FaIcons.FaListAlt}
          url="/professor/lista"
          tituloUrl="Página Principal"
        />
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-12">
            {show && (
              <Alert mensagem={mensagem} show={show} tipo={tipo} setShow={() => setShow(false)} />
            )}
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <div className="cadastro">
              <form className="mt-3" onSubmit={onSubmitProfessor}>
                <div className="row mb-3">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="idProfessor" className="control-label">
                        Id:
                      </label>
                      <input
                        id="idProfessor"
                        name="idProfessor"
                        value={idProfessor}
                        onChange={(e) => setIdProfessor(e.target.value)}
                        className={error.idProfessor ? 'form-control is-invalid' : 'form-control'}
                      />
                      {error.idProfessor ? <Mensagem mensagem={error.idProfessor} /> : null}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="codProfessor" className="control-label">
                        Código:
                      </label>
                      <input
                        id="codProfessor"
                        name="codProfessor"
                        value={codProfessor}
                        onChange={(e) => setCodProfessor(e.target.value)}
                        className={error.codProfessor ? 'form-control is-invalid' : 'form-control'}
                      />
                      {error.codProfessor ? <Mensagem mensagem={error.codProfessor} /> : null}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="nomeProfessor" className="control-label">
                        Nome:
                      </label>
                      <input
                        id="nomeProfessor"
                        name="nomeProfessor"
                        onChange={(e) => setNomeProfessor(e.target.value)}
                        value={nomeProfessor}
                        className={error.nomeProfessor ? 'form-control is-invalid' : 'form-control'}
                      />
                      {error.nomeProfessor ? <Mensagem mensagem={error.nomeProfessor} /> : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="idCidade" className="control-label">
                        Cidade:
                      </label>
                      <select
                        id="idCidade"
                        name="idCidade"
                        value={idCidade}
                        onChange={(e) => setIdCidadeProfessor(e.target.value)}
                        className={error.cidade ? 'form-control is-invalid' : 'form-control'}>
                        {cidades.map((cidade) => (
                          <option key={cidade.idCidade} value={cidade.idCidade}>
                            {cidade.nomeCidade}
                          </option>
                        ))}
                      </select>
                      {error.cidade ? <Mensagem mensagem={error.cidade} /> : null}
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-danger btn-lg">
                    Excluir professor
                  </button>
                  <Link to="/professor/lista" type="button" className="btn btn-secondary btn-lg">
                    Cancelar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RemoverProfessor;
