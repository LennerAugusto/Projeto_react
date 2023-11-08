import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import ShowMensagem from '../../components/mensagem/ShowMensagem';
import { ERROR_DISCIPLINA, DISCIPLINA } from './Disciplina';
import { listarDisciplina } from '../../services/DisciplinaService';
import Mensagem from '../../components/mensagem/Mensagem';
import { incluirDisciplina } from '../../services/DisciplinaService';


const Incluir = () => {

   const [disciplina, setDisciplina] = useState(DISCIPLINA)
   const [error, setError] = useState(ERROR_DISCIPLINA)

   const [idDisciplina, setIdDisciplina] = useState('');
   const [codDisciplina, setCodDisciplina] = useState('');
   const [nomeDisciplina, setNomeDisciplina] = useState('');


   useEffect(() => {
      const getDisciplina = async () => {
         const response = await listarDisciplina()

         setDisciplina(response)
      }

      getDisciplina();
   }, [])

   const onSubmitDisciplina = (e) => {
      e.preventDefault();

      let disciplina = {
         idDisciplina,
         codDisciplina,
         nomeDisciplina
      }

      salvarDisciplina(disciplina)

   }

   const salvarDisciplina = async (disciplina) => {
      const data = await incluirDisciplina(disciplina);
      console.log(data);

      let error = {}

      if(data.status === 400) {
         for(let i = 0; i < data.fields.length; i++) {
            if(data.fields[i].nameField === 'codDisciplina') {
               error.codDisciplina = data.fields[i].messageErrorField;
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
            titulo="Cadastro de Disciplina"
            iconTitulo={<GiIcons.GiTeacher/>}
            iconReturn={FaIcons.FaListAlt}
            url="/disciplina/incluir"
            tituloUrl="Página Principal"
         />
         <div className="row justify-content-center">
         <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <div className="cadastro">
               
               <form className='mt-3' onSubmit={onSubmitDisciplina}>

                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='idDisciplina' className='control-label'>Id:</label>
                               <input id='idDisciplina'
                                      name='idDisciplina'
                                      value={idDisciplina}
                                      onChange={(e) => setIdDisciplina(e.target.value)}
                                      className={error.idDisciplina ? "form-control is-invalid" : "form-control"}/> 
                                      {
                                          error.idDisciplina
                                          ? (
                                             <Mensagem mensagem={error.idDisciplina} />
                                          )
                                          : null
                                      }
                           </div>
                        </div> 
                  </div>  
                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='codDisciplina' className='control-label'>Código:</label>
                               <input id='codDisciplina'
                                      name='codDisciplina'
                                      value={codDisciplina}
                                      onChange={(e) => setCodDisciplina(e.target.value)}
                                      className={error.codDisciplina ? "form-control is-invalid" : "form-control"}/> 
                                       {
                                          error.codDisciplina
                                          ? (
                                             <Mensagem mensagem={error.codDisciplina} />
                                          )
                                          : null
                                       }
                           </div>
                        </div> 
                  </div> 
                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='nomeDisciplina' className='control-label'>Nome:</label>
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
                          to='/disciplina/lista'
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

