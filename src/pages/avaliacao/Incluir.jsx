import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import ShowMensagem from '../../components/mensagem/ShowMensagem';
import { ERROR_AVALIACAO, AVALIACAO } from './Avaliacao';
import { listarAvaliacao } from '../../services/AvaliacaoService';
import Mensagem from '../../components/mensagem/Mensagem';
import { incluirAvaliacao } from '../../services/AvaliacaoService';


const Incluir = () => {
   const [error, setError] = useState(ERROR_AVALIACAO)

   const [idAvaliacao, setIdAvaliacao] = useState('');
   const [codAvaliacao, setCodAvaliacao] = useState('');
   const [nomeDisciplina, setNomeDisciplina] = useState('');

   const [avaliacao, setAvaliacao] = useState([]);

   useEffect(() => {
      const getAvaliacao = async () => {
         const response = await listarAvaliacao()

         setAvaliacao(response)
      }

      getAvaliacao();
   }, [])

   const onSubmitAvaliacao = (e) => {
      e.preventDefault();

      let avaliacao = {
         idAvaliacao,
         codAvaliacao,
         nomeDisciplina
      }

      salvarAvaliacao(avaliacao)

   }

   const salvarAvaliacao = async (avaliacao) => {
      const data = await incluirAvaliacao(avaliacao);
      console.log(data);

      let error = {}

      if(data.status === 400) {
         for(let i = 0; i < data.fields.length; i++) {
            if(data.fields[i].nameField === 'codAvaliacao') {
               error.codAvaliacao = data.fields[i].messageErrorField;
            }
            if(data.fields[i].nameField === 'nomeDisciplina') {
               error.nomeDisciplina = data.fields[i].messageErrorField;
            }
         }

         setError(error)
         
      }
   }

  return (
    <Fragment>
       <div className="app-content">
         <ShowMensagem 
            titulo="Cadastro de Avaliacões"
            iconTitulo={<GiIcons.GiTeacher/>}
            iconReturn={FaIcons.FaListAlt}
            url="/avaliacao/lista"
            tituloUrl="Página Principal"
         />
         <div className="row justify-content-center">
         <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <div className="cadastro">
               
               <form className='mt-3' onSubmit={onSubmitAvaliacao}>

                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='idAvaliacao' className='control-label'>Id:</label>
                               <input id='idAvaliacao'
                                      name='idAvaliacao'
                                      value={idAvaliacao}
                                      onChange={(e) => setIdAvaliacao(e.target.value)}
                                      className={error.idAvaliacao ? "form-control is-invalid" : "form-control"}/> 
                                      {
                                          error.idAvaliacao
                                          ? (
                                             <Mensagem mensagem={error.idAvaliacao} />
                                          )
                                          : null
                                      }
                           </div>
                        </div> 
                  </div>  
                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='codAvaliacao' className='control-label'>Código:</label>
                               <input id='codAvaliacao'
                                      name='codAvaliacao'
                                      value={codAvaliacao}
                                      onChange={(e) => setCodAvaliacao(e.target.value)}
                                      className={error.codAvaliacao ? "form-control is-invalid" : "form-control"}/> 
                                       {
                                          error.codAvaliacao
                                          ? (
                                             <Mensagem mensagem={error.codAvaliacao} />
                                          )
                                          : null
                                       }
                           </div>
                        </div> 
                  </div> 
                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='nomeDisciplina' className='control-label'>Nome da disciplina:</label>
                               <input id='nomeDisciplina'
                                      name='nomeDisciplina'
                                      onChange={(e) => setNomeDisciplina(e.target.value)}
                                      value={nomeDisciplina}
                                      className={error.nomeDisciplina ? "form-control is-invalid" : "form-control"}/> 
                                       {
                                          error.nomeDisciplina
                                          ? (
                                             <Mensagem mensagem={error.nomeDisciplina} />
                                          )
                                          : null
                                       }
                           </div>
                        </div> 
                  </div> 

                  <div>
                       <button 
                          type='submit'
                          className='btn btn-primary btn-lg'
                       >Salvar</button>
                       <Link 
                          to='/cidade/lista'
                          type='button'
                          className='btn btn-secondary btn-lg'
                       >Cancelar</Link>
                  </div> 




               </form>


            </div>

         </div>

         </div> 
       </div>
    </Fragment>
  )  
}

export default Incluir

