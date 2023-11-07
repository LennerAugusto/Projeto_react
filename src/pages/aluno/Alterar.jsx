import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import ShowMensagem from '../../components/mensagem/ShowMensagem';
import { ERROR_ALUNO, ALUNO } from './Aluno';
import { listarCidade } from '../../services/CidadeService';
import Mensagem from '../../components/mensagem/Mensagem';
import { alterarAluno, incluirAluno } from '../../services/AlunoService';
import Alert from '../../components/mensagem/alert';


const Incluir = () => {

   const [professor, setAluno] = useState(ALUNO)
   const [error, setError] = useState(ERROR_ALUNO)

   const [idAluno, setIdAluno] = useState('');
   const [codAluno, setCodAluno] = useState('');
   const [nomeAluno, setNomeAluno] = useState('');
   const [idCidade, setIdCidadeAluno] = useState('');
   const [cidades, setCidades] = useState([]);
   const [show, setShow] = useState(false);
   const[mensagem, setMensagem] = useState('');
   const [tipo, setTipo] = useState('');

   useEffect(() => {
      const getCidades = async () => {
         const response = await listarCidade()

         setCidades(response)
      }

      getCidades();
   }, [])

   const onSubmitAluno = (e) => {
      e.preventDefault();

      let Aluno = {
         idAluno,
         codAluno,
         nomeAluno,
         cidade: {
            idCidade
         }
      }

      salvarAlteracaoAluno(Aluno)

   }
   const salvarAlteracaoAluno =async (aluno) => {
      try{
         const data = await alterarAluno(idAluno , aluno)
         console.log(data, 'try');
      }
      catch(error) {
         console.log(error, 'catch')
      }
   }

   const salvarAluno = async (aluno) => {
      const data = await incluirAluno(aluno);
      console.log(data);

      let error = {}

      if(data.error) {
         for(let i = 0; i < data.fields.length; i++) {
            if(data.fields[i].nameField === 'codAluno') {
               error.codAluno = data.fields[i].messageErrorField;
            }
            if(data.fields[i].nameField === 'nomeAluno') {
               error.nomeAluno = data.fields[i].messageErrorField;
            }
         }

         setError(data.mensagem)
         setTipo('danger')
         setShow(true)
         setMensagem('Aluno não cadastrado')
      } else{
         setTipo('sucess')
         setShow(true)
         setMensagem('Aluno cadastrado com sucesso!')
      }
   }

      //if(data.status === 200){
       //  setMensagem(data.mensagem);
       // setTipo('sucess');
        // setShow(true);
     // }



  return (
    <Fragment>
       <div className="app-content">
         <ShowMensagem 
            titulo="Cadastro de Aluno"
            iconTitulo={<GiIcons.GiTeacher/>}
            iconReturn={FaIcons.FaListAlt}
            url="/aluno/lista"
            tituloUrl="Página Principal"
         />
         <div className="row justify-content-center">
            <div className='col-xs-12 col-sm-12 col-md-12'>
               { show && (
                  <Alert mensagem={mensagem}
                           show={show}
                           tipo={tipo}
                           setShow ={()=>setShow(false)}/>
                 )               
               }


            </div>
         <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                 
            <div className="cadastro">
               
               <form className='mt-3' onSubmit={onSubmitAluno}>

                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='idAluno' className='control-label'>Id:</label>
                               <input id='idAluno'
                                      name='idAluno'
                                      value={idAluno}
                                      onChange={(e) => setIdAluno(e.target.value)}
                                      className={error.idAluno ? "form-control is-invalid" : "form-control"}/> 
                                      {
                                          error.idAluno
                                          ? (
                                             <Mensagem mensagem={error.idAluno} />
                                          )
                                          : null
                                      }
                           </div>
                        </div> 
                  </div>  
                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='codAluno' className='control-label'>Código:</label>
                               <input id='codAluno'
                                      name='codAluno'
                                      value={codAluno}
                                      onChange={(e) => setCodAluno(e.target.value)}
                                      className={error.codProfessor ? "form-control is-invalid" : "form-control"}/> 
                                       {
                                          error.codAluno
                                          ? (
                                             <Mensagem mensagem={error.codAluno} />
                                          )
                                          : null
                                       }
                           </div>
                        </div> 
                  </div> 
                  <div className='row mb-3'>
                       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <div className='form-group'>
                               <label htmlFor='nomeAluno' className='control-label'>Nome:</label>
                               <input id='nomeAluno'
                                      name='nomeAluno'
                                      onChange={(e) => setNomeAluno(e.target.value)}
                                      value={nomeAluno}
                                      className={error.nomeAluno ? "form-control is-invalid" : "form-control"}/> 
                                       {
                                          error.nomeAluno
                                          ? (
                                             <Mensagem mensagem={error.nomeAluno} />
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
                                       onChange={(e) => setIdCidadeAluno(e.target.value)}
                                       className={error.cidade ? "form-control is-invalid" : "form-control"}>
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
                          to='/aluno/lista'
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

