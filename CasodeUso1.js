//Codigo desenvolvido por Antonio Gabriel Pinheiro Lima.
//Testado Por Igor Machado e Vinicius Guido.

//Instruções:

// 1- Menu para escolha das opções dentro do processo de Realizar Inscrições. 
// 2- Para inscrever na disciplina é necessario apertar 1 digitar o nome do aluno e o nome da disciplina.
// 3- Para revisar a lista basta digitar o nome do aluno e caso queira editar responda Sim ou Nao.
// 4- Para excluir uma disciplinar apos apertar em Sim digite o numero correspondente a disciplina e remova ela.
// 5- Para confirmar as inscrições basta Apertar 3 
// 6- Caso queira sair aperte 4 e o sistema será encerrado 

// Regras:

// Cada Aluno tem 20 creditos e cada disciplina custa 4 creditos para o aluno ter uma grade completa na semana basta escolher
// 5 disciplinas, aluno não pode escolher turma onde tem conflito de horario (Outra turma no mesmo horario e dia) e não pode tambem
// ultrapassar a quantidade de creditos que pode ser gasta caso isso acontecessa deve voltar e revisar suas materias.

// Se a disciplina estiver com todas as vagas preenchidas o aluno pode entrar em uma lista de espera ou voltar e editar sua grade


const readlineSync = require('readline-sync');

const disciplinasDisponiveis = [
  { nome: 'Matematica', vagas: 3, creditos: 4, professor: 'Vendramel', horario: 'Segunda às 10h', local: 'Sala 101', codigoTurma: 'T123', alunos: [], listaEspera: [] },
  { nome: 'Historia', vagas: 3, creditos: 4, professor: 'Alberto', horario: 'Terça às 14h', local: 'Sala 202', codigoTurma: 'T47', alunos: [], listaEspera: [] },
  { nome: 'Fisica', vagas: 2, creditos: 4, professor: 'Dexter', horario: 'Quarta às 18h', local: 'Laboratório 4', codigoTurma: 'T389', alunos: [], listaEspera: [] },
  { nome: 'Portugues', vagas:3 , creditos: 4, professor: 'Maria', horario: 'Quinta às 14h', local: 'Sala 223', codigoTurma: 'T456', alunos: [], listaEspera: [] },
  { nome: 'Artes', vagas: 4, creditos: 4, professor: 'Elzebio', horario: 'Sexta às 18h', local: 'Laboratório 45', codigoTurma: 'T774', alunos: [], listaEspera: [] },
  { nome: 'Design', vagas: 3, creditos: 4, professor: 'Ivo', horario: 'Sabado às 14h', local: 'Sala 212', codigoTurma: 'T483', alunos: [], listaEspera: [] }, 
  { nome: 'Algebra', vagas: 3, creditos: 4, professor: 'Furia', horario: 'Segunda às 10h', local: 'Laboratório 54', codigoTurma: 'T709', alunos: [], listaEspera: [] },
  { nome: 'Etica', vagas: 2, creditos: 4, professor: 'Andreza', horario: 'Terça às 14h', local: 'Laboratório 123', codigoTurma: 'T772', alunos: [], listaEspera: [] },
];

const alunos = [];

function encontrarAlunoPorNome(nome) {
  return alunos.find((aluno) => aluno.nome === nome);
}

function encontrarDisciplinaPorNome(nome) {
  return disciplinasDisponiveis.find((disciplina) => disciplina.nome === nome);
}

function imprimirInformacoesDisciplina(disciplina) {
  console.log(`Nome do Professor: ${disciplina.professor}`);
  console.log(`Horario: ${disciplina.horario}`);
  console.log(`Local da Aula: ${disciplina.local}`);
  console.log(`Código da Turma: ${disciplina.codigoTurma}`);
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
          alunoExistente = novoAluno; 
        }

        const disciplinaEscolhida = readlineSync.question('Digite o nome da disciplina desejada: ');
        const disciplina = encontrarDisciplinaPorNome(disciplinaEscolhida);

        if (disciplina) {
          if (disciplina.vagas > 0) {
            if (alunoExistente.creditos >= disciplina.creditos) {
              const conflitoHorario = alunoExistente.disciplinasInscritas.some(
                (disc) => disciplina.horario === disc.horario
              );

              if (!conflitoHorario) {
                alunoExistente.creditos -= disciplina.creditos;
                disciplina.vagas--;
                alunoExistente.disciplinasInscritas.push({
                  nome: disciplina.nome,
                  horario: disciplina.horario,
                });
                console.log('Inscricao finalizada e dados registrados com sucesso no Sistema de Faturamento.');
                imprimirInformacoesDisciplina(disciplina);
              } else {
                console.log('Conflito de horario! Nao e possivel se inscrever.');
              }
            } else {
              console.log('Creditos insuficientes para se inscrever.');
            }
          } else {
            console.log('Vagas esgotadas. Deseja entrar na lista de espera? (Sim/Nao)');
            const respostaListaEspera = readlineSync.question();
            if (respostaListaEspera.toLowerCase() === 'sim') {
              disciplina.listaEspera.push(alunoExistente);
              console.log('Adicionado a lista de espera.');
              console.log('Lista de espera:');
              disciplina.listaEspera.forEach((aluno, index) => {
                console.log(`${index + 1}. ${aluno.nome}`);
              });
            } else {
              console.log('Inscricao nao realizada.');
            }
          }
        } else {
          console.log('Disciplina nao encontrada.');
        }
        break;
        case '2':
          const nomeAlunoRevisao = readlineSync.question('Digite seu nome: ');
          const alunoParaRevisar = encontrarAlunoPorNome(nomeAlunoRevisao);
  
          if (alunoParaRevisar) {
            console.log('Disciplinas inscritas:');
            alunoParaRevisar.disciplinasInscritas.forEach((disc) => {
              console.log(`${disc.nome} - ${disc.horario}`);
            });
  
            console.log('\nDeseja editar a lista de disciplinas inscritas? (Sim/Nao)');
            const respostaEdicao = readlineSync.question();
  
            if (respostaEdicao.toLowerCase() === 'sim') {
              // Opção de editar a lista de disciplinas inscritas
              console.log('\nEditando a lista de disciplinas inscritas:');
              alunoParaRevisar.disciplinasInscritas.forEach((disc, index) => {
                console.log(`${index + 1}. ${disc.nome} - ${disc.horario}`);
              });
  
              const numeroDisciplinaEdicao = parseInt(readlineSync.question('Digite o numero da disciplina que deseja remover: '), 10);
  
              if (!isNaN(numeroDisciplinaEdicao) && numeroDisciplinaEdicao >= 1 && numeroDisciplinaEdicao <= alunoParaRevisar.disciplinasInscritas.length) {
                // Remover a disciplina selecionada
                const disciplinaRemovida = alunoParaRevisar.disciplinasInscritas.splice(numeroDisciplinaEdicao - 1, 1)[0];
                console.log(`Disciplina ${disciplinaRemovida.nome} removida com sucesso.`);
              } else {
                console.log('Entrada invalida. Nenhuma disciplina foi removida.');
              }
            }
          } else {
            console.log('Aluno nao encontrado.');
          }
          break;
  
        case '3':
          // Confirmar Inscrições
          console.log('Informacoes das disciplinas inscritas:');
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