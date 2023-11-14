import React, { Fragment, useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import { Link, useParams } from 'react-router-dom';
import Alert from '../../components/mensagem/alert';
import Mensagem from '../../components/mensagem/Mensagem';
import ShowMensagem from '../../components/mensagem/ShowMensagem';
import { listarAvaliacao } from '../../services/AvaliacaoService';
import { ExcluirAvaliacao, lerIdAvaliacao} from '../../services/AvaliacaoService';
import { ERROR_AVALIACAO, AVALIACAO } from './Avaliacao';

const RemoverAvaliacao = () => {
  const [avaliacao, setAvaliacao] = useState(AVALIACAO);
  const [error, setError] = useState(ERROR_AVALIACAO);
  const { id } = useParams();

  const [idAvaliacao, setIdAvaliacao] = useState('');
  const [codAvaliacao, setCodAvaliacao] = useState('');
  const [nomeDisciplina, setNomeDisciplina] = useState('');
  const [idCidade, setIdCidadeProfessor] = useState('');

  
  const [show, setShow] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [tipo, setTipo] = useState('');


  useEffect(() => {
    

    const lerAvaliacao = async () => {
      const data = await lerIdAvaliacao(id);
      setIdAvaliacao(data.object.idAvaliacao);
      setCodAvaliacao(data.object.codAvaliacao);
      setNomeDisciplina(data.object.nomeDisciplina);
    };
    lerAvaliacao();

  }, []);

  const onSubmitAvaliacao = (e) => {
    e.preventDefault();

    Remocao(id);
  };

  const Remocao = async (avaliacao) => {
    const data = await ExcluirAvaliacao(avaliacao);
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
          titulo="Excluir Avaliacao"
          iconTitulo={<GiIcons.GiTeacher />}
          iconReturn={FaIcons.FaListAlt}
          url="/avaliacao/lista"
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
              <form className="mt-3" onSubmit={onSubmitAvaliacao}>
                <div className="row mb-3">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="idProfessor" className="control-label">
                        Id:
                      </label>
                      <input
                        id="idAvaliacao"
                        name="idAvaliacao"
                        value={idAvaliacao}
                        onChange={(e) => setIdAvaliacao(e.target.value)}
                        className={error.idProfessor ? 'form-control is-invalid' : 'form-control'}
                      />
                      {error.idAvaliacao ? <Mensagem mensagem={error.idAvaliacao} /> : null}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="codAvaliacao" className="control-label">
                        Código:
                      </label>
                      <input
                        id="codAvaliacao"
                        name="codAvaliacao"
                        value={codAvaliacao}
                        onChange={(e) => setCodAvaliacao(e.target.value)}
                        className={error.codAvaliacao ? 'form-control is-invalid' : 'form-control'}
                      />
                      {error.codAvaliacao ? <Mensagem mensagem={error.codAvaliacao} /> : null}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="nomeAvaliacao" className="control-label">
                        Nome da Disciplina:
                      </label>
                      <input
                        id="nome"
                        name="nomeAvaliacao"
                        onChange={(e) => setNomeDisciplina(e.target.value)}
                        value={nomeDisciplina}
                        className={error.nomeDisciplina ? 'form-control is-invalid' : 'form-control'}
                      />
                      {error.nomeDisciplina ? <Mensagem mensagem={error.nomeDisciplina} /> : null}
                    </div>
                  </div>
                </div>

               
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-danger btn-lg">
                    Excluir Avaliacao
                  </button>
                  <Link to="/avaliacao/lista" type="button" className="btn btn-secondary btn-lg">
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

export default RemoverAvaliacao;
