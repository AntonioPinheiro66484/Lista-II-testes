const readlineSync = require('readline-sync');

// Função para gerar informações aleatórias da disciplina
function gerarInformacoesDisciplina() {
  const professores = ['Prof. A', 'Prof. B', 'Prof. C'];
  const horarios = ['Segunda as 10h', 'Terça as 14h', 'Quarta as 18h'];
  const locais = ['Sala 101', 'Sala 203', 'Laboratorio 1'];
  const codigosTurma = ['T123', 'T456', 'T789'];

  const indiceAleatorio = (array) => Math.floor(Math.random() * array.length);

  return {
    professor: professores[indiceAleatorio(professores)],
    horario: horarios[indiceAleatorio(horarios)],
    local: locais[indiceAleatorio(locais)],
    codigoTurma: codigosTurma[indiceAleatorio(codigosTurma)],
  };
}

const disciplinasDisponiveis = [
  { nome: 'Matematica', vagas: 5, creditos: 4, alunos: [] },
  { nome: 'Historia', vagas: 3, creditos: 4, alunos: [] },
  { nome: 'Fisica', vagas: 4, creditos: 4, alunos: [] },
  // Adicione mais disciplinas conforme necessário
];

const alunos = [];

function encontrarAlunoPorNome(nome) {
  return alunos.find((aluno) => aluno.nome === nome);
}

function encontrarDisciplinaPorNome(nome) {
  return disciplinasDisponiveis.find((disciplina) => disciplina.nome === nome);
}

function imprimirInformacoesDisciplina(disciplina) {
  const informacoes = gerarInformacoesDisciplina();
  console.log(`Nome do Professor: ${informacoes.professor}`);
  console.log(`Horario: ${informacoes.horario}`);
  console.log(`Local da Aula: ${informacoes.local}`);
  console.log(`Código da Turma: ${informacoes.codigoTurma}`);
}

function main() {
  while (true) {
    console.log('\n1. Se inscrever em uma disciplina');
    console.log('2. Revisar lista de disciplinas inscritas');
    console.log('3. Confirmar Inscricoes');
    console.log('4. Sair');

    const escolha = readlineSync.question('Escolha uma opcao: ');

    switch (escolha) {
      case '1':
        const nomeAluno = readlineSync.question('Digite seu nome: ');
        let alunoExistente = encontrarAlunoPorNome(nomeAluno);

        if (!alunoExistente) {
          const novoAluno = { nome: nomeAluno, creditos: 20, disciplinasInscritas: [] };
          alunos.push(novoAluno);
          alunoExistente = novoAluno; // Atualizar referência
        }

        const disciplinaEscolhida = readlineSync.question('Digite o nome da disciplina desejada: ');
        const disciplina = encontrarDisciplinaPorNome(disciplinaEscolhida);

        if (disciplina) {
          if (disciplina.vagas > 0 && alunoExistente.creditos >= disciplina.creditos) {
            const conflitoHorario = alunoExistente.disciplinasInscritas.some(
              (disc) => gerarInformacoesDisciplina().horario === disc.horario
            );

            if (!conflitoHorario) {
              alunoExistente.creditos -= disciplina.creditos;
              disciplina.vagas--;
              alunoExistente.disciplinasInscritas.push({
                nome: disciplina.nome,
                horario: gerarInformacoesDisciplina().horario,
              });
              console.log('Inscricao finalizada e dados registrados com sucesso no Sistema de Faturamento.');
              imprimirInformacoesDisciplina(disciplina);            
            } else {
              console.log('Conflito de horario! Nao e possivel se inscrever.');
            }
          } else {
            console.log('Vagas esgotadas ou creditos insuficientes para se inscrever.');
          }
        } else {
          console.log('Disciplina nao encontrada.');
        }
        break;
        case '2':
          // Revisar lista de disciplinas inscritas
          const nomeAlunoRevisao = readlineSync.question('Digite seu nome: ');
          const alunoRevisao = encontrarAlunoPorNome(nomeAlunoRevisao);
  
          if (alunoRevisao) {
            console.log('Disciplinas inscritas:');
            alunoRevisao.disciplinasInscritas.forEach((disciplina) => {
              console.log(`- ${disciplina.nome} (${disciplina.horario})`);
            });
          } else {
            console.log('Aluno nao encontrado.');
          }
          break;
  
        case '3':
          // Confirmar Inscrições
          console.log('Informações das disciplinas inscritas:');
          alunos.forEach((aluno) => {
            aluno.disciplinasInscritas.forEach((disciplina) => {
              const disciplinaConfirmacao = encontrarDisciplinaPorNome(disciplina.nome);
              console.log(`Aluno: ${aluno.nome}, Disciplina: ${disciplina.nome}`);
              imprimirInformacoesDisciplina(disciplinaConfirmacao);
              console.log('---');
            });
          });
          break;
  
        case '4':
          // Sair
          console.log('Saindo do sistema. Ate logo!');
          process.exit();
  
        default:
          console.log('Opção invalida. Tente novamente.');
      }
    }
  }
  
  // Iniciar o programa
  main();