import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import ShowMensagem from '../../components/mensagem/ShowMensagem';
import { ERROR_CID, CIDADE } from './Cidade';
import { listarCidade } from '../../services/CidadeService';
import Mensagem from '../../components/mensagem/Mensagem';
import { incluirCidade } from '../../services/CidadeService';


const Incluir = () => {

   const [cidade, setCidade] = useState(CIDADE)
   const [error, setError] = useState(ERROR_CID)

   const [idCidade, setIdCidade] = useState('');
   const [codCidade, setCodCidade] = useState('');
   const [nomeCidade, setNomeCidade] = useState('');

   const [cidades, setCidades] = useState([]);

   useEffect(() => {
      const getCidades = async () => {
         const response = await listarCidade()

         setCidades(response)
      }

      getCidades();
   }, [])

   const onSubmitCidade = (e) => {
      e.preventDefault();

      let cidade = {
         idCidade,
         codCidade,
         nomeCidade
      }

      salvarCidade(cidade)

   }

   const salvarCidade = async (cidade) => {
      const data = await incluirCidade(cidade);
      console.log(data);

      let error = {}

      if(data.status === 400) {
         for(let i = 0; i < data.fields.length; i++) {
            if(data.fields[i].nameField === 'codCidade') {
               error.codCidade = data.fields[i].messageErrorField;
            }
            if(data.fields[i].nameField === 'nomeCidade') {
               error.nomeCidade = data.fields[i].messageErrorField;
            }
         }

         setError(error)
         
      }
   }

  return (
    <Fragment>
       <div className="app-content">
         <ShowMensagem 
            titulo="Cadastro de Cidades"
            iconTitulo={<GiIcons.GiTeacher/>}
            iconReturn={FaIcons.FaListAlt}
            url="/cidade/lista"
            tituloUrl="Página Principal"
         />
         <div className="row justify-content-center">
         <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <div className="cadastro">
               
               <form className='mt-3' onSubmit={onSubmitCidade}>

                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='idCidade' className='control-label'>Id:</label>
                               <input id='idCidade'
                                      name='idCidade'
                                      value={idCidade}
                                      onChange={(e) => setIdCidade(e.target.value)}
                                      className={error.idCidade ? "form-control is-invalid" : "form-control"}/> 
                                      {
                                          error.idCidade
                                          ? (
                                             <Mensagem mensagem={error.idCidade} />
                                          )
                                          : null
                                      }
                           </div>
                        </div> 
                  </div>  
                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='codCidade' className='control-label'>Código:</label>
                               <input id='codCidade'
                                      name='codCidade'
                                      value={codCidade}
                                      onChange={(e) => setCodCidade(e.target.value)}
                                      className={error.codCidade ? "form-control is-invalid" : "form-control"}/> 
                                       {
                                          error.codCidade
                                          ? (
                                             <Mensagem mensagem={error.codCidade} />
                                          )
                                          : null
                                       }
                           </div>
                        </div> 
                  </div> 
                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='nomeCidade' className='control-label'>Nome:</label>
                               <input id='nomeCidade'
                                      name='nomeCidade'
                                      onChange={(e) => setNomeCidade(e.target.value)}
                                      value={nomeCidade}
                                      className={error.nomeCidade ? "form-control is-invalid" : "form-control"}/> 
                                       {
                                          error.nomeCidade
                                          ? (
                                             <Mensagem mensagem={error.nomeCidade} />
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

