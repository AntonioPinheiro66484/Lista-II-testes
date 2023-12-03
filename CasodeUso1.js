class Disciplina {
  constructor(nome, professor, horario, sala, creditos, vagas) {
    this.nome = nome;
    this.professor = professor;
    this.horario = horario;
    this.sala = sala;
    this.creditos = creditos;
    this.vagas = vagas;
    this.alunosInscritos = [];
  }

  estaDisponivel() {
    return this.vagas > 0 && this.creditos <= 20;
  }

  inscreverAluno(aluno) {
    if (this.estaDisponivel()) {
      if (!this.horarioConflita(aluno.disciplinas)) {
        this.alunosInscritos.push(aluno);
        this.vagas--;
        aluno.creditos -= this.creditos;
        aluno.disciplinas.push(this);
        return true;
      } else {
        console.log("Erro: Conflito de horário.");
        return false;
      }
    } else {
      console.log("Erro: Disciplina indisponível ou sem créditos suficientes.");
      return false;
    }
  }

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
const disciplina1 = new Disciplina("Matemática", "Prof. Silva", "Segunda-feira", "Sala 101", 4, 5);
const disciplina2 = new Disciplina("Física", "Prof. Souza", "Segunda-feira", "Sala 102", 4, 3);
const disciplina3 = new Disciplina("Química", "Prof. Santos", "Terça-feira", "Sala 201", 4, 0);

// Criar um aluno de exemplo
const aluno1 = new Aluno("João", 20);
const aluno2 = new Aluno("Igor", 20);
const aluno3 = new Aluno("Vinicius", 20);

// Tentar se inscrever em disciplinas
disciplina1.inscreverAluno(aluno1);
disciplina2.inscreverAluno(aluno1);
disciplina3.inscreverAluno(aluno1);

console.log(aluno1.disciplinas);

// Tentar se inscrever em disciplinas
disciplina1.inscreverAluno(aluno2);
disciplina2.inscreverAluno(aluno2);
disciplina3.inscreverAluno(aluno2);

console.log(aluno2.disciplinas);

// Tentar se inscrever em disciplinas
disciplina1.inscreverAluno(aluno3);
disciplina2.inscreverAluno(aluno3);
disciplina3.inscreverAluno(aluno3);

console.log(aluno3.disciplinas);
