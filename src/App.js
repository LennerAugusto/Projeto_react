import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
//Cidade
import CidadeIncluir from './pages/cidade/Incluir';
import CidadeLista from './pages/cidade/Lista';
import Dashboard from './pages/Dashboard';
//Professor
import ProfessorAlterar from './pages/professor/Alterar';
import ExcluirProfessor from './pages/professor/Excluir';
import ProfessorIncluir from './pages/professor/Incluir';
import ProfessorLista from './pages/professor/Lista';
//Aluno
import AlunoAlterar from './pages/aluno/Alterar';
import AlunoLista from './pages/aluno/Lista';
import AlunoIncluir from './pages/aluno/Incluir';
import AlunoExcluir from './pages/aluno/Excluir';
//Avaliação
import AvaliacaoLista from './pages/avaliacao/Lista'

import Rotas from './rotas/Rotas';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <>
            <Route element={<Rotas />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/professor/lista" element={<ProfessorLista />} />
              <Route path="/professor/incluir" element={<ProfessorIncluir />} />
              <Route path="/professor/alterar/:id" element={<ProfessorAlterar />} />
              <Route path="/professor/excluir/:id" element={<ExcluirProfessor />} />
              <Route path="/cidade/lista" element={<CidadeLista />} />
              <Route path="/cidade/incluir" element={<CidadeIncluir />} />
              <Route path="/aluno/alterar" element={<AlunoAlterar />} />
              <Route path="/aluno/lista" element={<AlunoLista />} />
              <Route path="/aluno/excluir" element={<AlunoExcluir/>} />
              <Route path="/aluno/incluir" element={<AlunoIncluir/>} />
              <Route path="/avaliacao/lista" element={<AvaliacaoLista/>} />
              <Route path="/avaliacao/lista" element={<AvaliacaoLista />} />
            </Route>
          </>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;