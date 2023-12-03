const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Disciplina {
  constructor(codigo, nome, preRequisitos) {
    this.codigo = codigo;
    this.nome = nome;
    this.preRequisitos = preRequisitos || [];
  }
}

class Aluno {
  constructor(nome, disciplinasCursadas) {
    this.nome = nome;
    this.disciplinasCursadas = disciplinasCursadas || [];
    this.inscricoes = [];
  }
}

function mostrarDisciplinasDisponiveis() {
  console.log("Disciplinas Disponíveis:");
  console.log("1. Matemática");
  console.log("2. Física");
  console.log("3. Química");
}

function selecionarDisciplina() {
  return new Promise(resolve => {
    rl.question("Escolha a disciplina (1, 2 ou 3): ", opcao => {
      switch (opcao) {
        case "1":
          resolve(disciplina1);
          break;
        case "2":
          resolve(disciplina2);
          break;
        case "3":
          resolve(disciplina3);
          break;
        default:
          console.log("Opção inválida. Tente novamente.");
          resolve(selecionarDisciplina());
      }
    });
  });
}

function selecionarAluno() {
  return new Promise(resolve => {
    rl.question("Escolha o aluno (1, 2 ou 3): ", opcao => {
      switch (opcao) {
        case "1":
          resolve(aluno1);
          break;
        case "2":
          resolve(aluno2);
          break;
        case "3":
          resolve(aluno3);
          break;
        default:
          console.log("Opção inválida. Tente novamente.");
          resolve(selecionarAluno());
      }
    });
  });
}

function realizarInscricao() {
  mostrarDisciplinasDisponiveis();

  selecionarAluno().then(alunoSelecionado => {
    selecionarDisciplina().then(disciplinaSelecionada => {
      disciplinaSelecionada.inscreverAluno(alunoSelecionado);

      console.log(`${alunoSelecionado.nome} se inscreveu em ${disciplinaSelecionada.nome}.`);
      console.log(`Disciplinas de ${alunoSelecionado.nome}:`, alunoSelecionado.disciplinas);

      rl.close();
    });
  });
}