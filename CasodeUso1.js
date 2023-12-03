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
        //RN00 Choque de horarios
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
