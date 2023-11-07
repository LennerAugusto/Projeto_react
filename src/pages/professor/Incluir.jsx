
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import ShowMensagem from '../../components/mensagem/ShowMensagem';
import { ERROR_PROF, PROFESSOR } from './Professor';
import { listarCidade } from '../../services/CidadeService';
import Mensagem from '../../components/mensagem/Mensagem';
import { incluirProfessor } from '../../services/ProfessorService';
import Alert from '../../components/mensagem/alert';


const Incluir = () => {

   const [professor, setProfessor] = useState(PROFESSOR)
   const [error, setError] = useState(ERROR_PROF)

   const [idProfessor, setIdProfessor] = useState('');
   const [codProfessor, setCodProfessor] = useState('');
   const [nomeProfessor, setNomeProfessor] = useState('');
   const [idCidade, setIdCidadeProfessor] = useState('');
   const [show, setShow] = useState(false);
   const[mensagem, setMensagem] = useState('');
   const [tipo, setTipo] = useState('');

   const [cidades, setCidades] = useState([]);

   useEffect(() => {
      const getCidades = async () => {
         const response = await listarCidade()

         setCidades(response)
      }

      getCidades();
   }, [])

   const onSubmitProfessor = (e) => {
      e.preventDefault();

      let professor = {
         idProfessor,
         codProfessor,
         nomeProfessor,
         cidade: {
            idCidade
         }
      }

      salvarProfessor(professor)

   }

   const salvarProfessor = async (professor) => {
      const data = await incluirProfessor(professor);
      console.log(data);

      let error = {}

      if(data.error) {
         for(let i = 0; i < data.fields.length; i++) {
            if(data.fields[i].nameField === 'codProfessor') {
               error.codProfessor = data.fields[i].messageErrorField;
            }
            if(data.fields[i].nameField === 'nomeProfessor') {
               error.nomeProfessor = data.fields[i].messageErrorField;
            }
         }

         setError(data.mensagem)
         setTipo('danger')
         setShow(true)
         setMensagem('Professor não cadastrado')
      } else{
         setTipo('success')
         setShow(true)
         setMensagem('Professor cadastrado com sucesso!')
      }
   }

  return (
    <Fragment>
       <div className="app-content">
         <ShowMensagem 
            titulo="Cadastro de Professores"
            iconTitulo={<GiIcons.GiTeacher/>}
            iconReturn={FaIcons.FaListAlt}
            url="/professor/lista"
            tituloUrl="Página Principal"
         />
         <div className="row justify-content-center">
         <div className='col-xs-12 col-sm-12 col-md-12'>
               { show && (
                  <Alert mensagem={mensagem}
                           show={show}
                           tipo={tipo}
                           setShow={()=> setShow(false)}/>
                 )               
               }


            </div>
         <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <div className="cadastro">
               
               <form className='mt-3' onSubmit={onSubmitProfessor}>

                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='idProfessor' className='control-label'>Id:</label>
                               <input id='idProfessor'
                                      name='idProfessor'
                                      value={idProfessor}
                                      onChange={(e) => setIdProfessor(e.target.value)}
                                      className={error.idProfessor ? "form-control is-invalid" : "form-control"}/> 
                                      {
                                          error.idProfessor
                                          ? (
                                             <Mensagem mensagem={error.idProfessor} />
                                          )
                                          : null
                                      }
                           </div>
                        </div> 
                  </div>  
                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='codProfessor' className='control-label'>Código:</label>
                               <input id='codProfessor'
                                      name='codProfessor'
                                      value={codProfessor}
                                      onChange={(e) => setCodProfessor(e.target.value)}
                                      className={error.codProfessor ? "form-control is-invalid" : "form-control"}/> 
                                       {
                                          error.codProfessor
                                          ? (
                                             <Mensagem mensagem={error.codProfessor} />
                                          )
                                          : null
                                       }
                           </div>
                        </div> 
                  </div> 
                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='nomeProfessor' className='control-label'>Nome:</label>
                               <input id='nomeProfessor'
                                      name='nomeProfessor'
                                      onChange={(e) => setNomeProfessor(e.target.value)}
                                      value={nomeProfessor}
                                      className={error.nomeProfessor ? "form-control is-invalid" : "form-control"}/> 
                                       {
                                          error.nomeProfessor
                                          ? (
                                             <Mensagem mensagem={error.nomeProfessor} />
                                          )
                                          : null
                                       }
                           </div>
                        </div> 
                  </div> 

                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='idCidade' className='control-label'>Cidade:</label>
                             
                               <select id='idCidade'
                                       name='idCidade'
                                       value={idCidade}
                                       onChange={(e) => setIdCidadeProfessor(e.target.value)}
                                       className={error.cidade ? "form-control is-invalid" : "form-control"}>
                                            <option>Selecione...</option>
                                       {
                                          cidades.map((cidade) => (
                                             <option key={cidade.idCidade} value={cidade.idCidade}>
                                                {cidade.nomeCidade}
                                             </option>
                                          ))
                                       }
                               </select>  
                               {
                                 error.cidade
                                 ? (
                                    <Mensagem mensagem={error.cidade} />
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
                          to='/professor/lista'
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

