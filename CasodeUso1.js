const readlineSync = require('readline-sync');

// Função para gerar informações aleatórias da disciplina
function gerarInformacoesDisciplina() {
  const professores = ['Prof. A', 'Prof. B', 'Prof. C'];
  const horarios = ['Segunda às 10h', 'Terça às 14h', 'Quarta às 18h'];
  const locais = ['Sala 101', 'Sala 203', 'Laboratório 1'];
  const codigosTurma = ['T123', 'T456', 'T789'];

<<<<<<< HEAD
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
  console.log(`Horário: ${informacoes.horario}`);
  console.log(`Local da Aula: ${informacoes.local}`);
  console.log(`Código da Turma: ${informacoes.codigoTurma}`);
}

function main() {
  while (true) {
    console.log('\n1. Se inscrever em uma disciplina');
    console.log('2. Revisar lista de disciplinas inscritas');
    console.log('3. Confirmar Inscrições');
    console.log('4. Sair');

    const escolha = readlineSync.question('Escolha uma opção: ');

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
              console.log('Inscrição finalizada e dados registrados com sucesso no Sistema de Faturamento.');
              imprimirInformacoesDisciplina(disciplina);            
            } else {
              console.log('Conflito de horário! Não é possível se inscrever.');
            }
          } else {
            console.log('Vagas esgotadas ou créditos insuficientes para se inscrever.');
          }
        } else {
          console.log('Disciplina não encontrada.');
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
            console.log('Aluno não encontrado.');
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
          console.log('Saindo do sistema. Até logo!');
          process.exit();
  
        default:
          console.log('Opção inválida. Tente novamente.');
=======
  inscreverAluno(aluno) {
    if (this.estaDisponivel()) {
      if (!this.horarioConflita(aluno.disciplinas)) {
        this.alunosInscritos.push(aluno);
        this.vagas--;
        aluno.creditos -= this.creditos;
        aluno.disciplinas.push(this);
        return true;
      } else {
        //RN00 Choque de horarios
        console.log("Erro: Conflito de horário.");
        return false;
>>>>>>> 91bd6a1491034fea22cc03915659b96c48c8f26a
      }
    }
  }
<<<<<<< HEAD
  
  // Iniciar o programa
  main();
=======

  horarioConflita(disciplinas) {
    return disciplinas.some(d => d.horario === this.horario);
  }
}

class Aluno {
  constructor(nome, creditos) {
    this.nome = nome;
    this.creditos = creditos;
    this.disciplinas = [];
  }

  editarDisciplinas(disciplinas) {
    this.disciplinas = disciplinas.filter(d => d.inscreverAluno(this));
  }
}

// Criar algumas disciplinas de exemplo
const disciplina1 = new Disciplina("Matemática", "Prof. Tokio", "Segunda-feira", "Sala 101", 4, 20);
const disciplina2 = new Disciplina("Física", "Prof. Souza", "Terça-feira", "Sala 102", 4, 20);
const disciplina3 = new Disciplina("Algebra linear", "Prof. Furia", "Quarta-feira", "Sala 201", 4, 20);
const disciplina4 = new Disciplina("Logica de progracao e algoritmo", "Prof. Eliane", "Quinta-feira", "Sala 201", 4, 20);
const disciplina5 = new Disciplina("Qualidade de teste e software", "Prof. Vendramel", "Sexta-feira", "Sala 201", 4, 20);
// Criar um aluno de exemplo
const aluno1 = new Aluno("João", 20);

// Tentar se inscrever em disciplinas
disciplina1.inscreverAluno(aluno1);
disciplina2.inscreverAluno(aluno1);
disciplina3.inscreverAluno(aluno1);
disciplina4.inscreverAluno(aluno1);
disciplina5.inscreverAluno(aluno1);

console.log(aluno1.disciplinas);
>>>>>>> 91bd6a1491034fea22cc03915659b96c48c8f26a
