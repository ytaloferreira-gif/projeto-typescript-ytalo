// Interface - o molde do Livro
interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  disponivel: boolean;
}

// Array que vai guardar os livros
const livros: Livro[] = [];

// Função 1: Adicionar um livro
function adicionarLivro(livro: Livro): void {
  livros.push(livro);
  console.log(`Livro "${livro.titulo}" adicionado com sucesso!`);
}

// Função 2: Listar todos os livros
function listarLivros(): void {
  console.log("\n📚 Lista de Livros:");
  livros.forEach((livro) => {
    console.log(`
    ID: ${livro.id}
    Título: ${livro.titulo}
    Autor: ${livro.autor}
    Ano: ${livro.ano}
    Disponível: ${livro.disponivel ? "Sim" : "Não"}
    `);
  });
}

// Função 3 (Extra): Emprestar um livro
function emprestarLivro(id: number): void {
  const livro = livros.find((l) => l.id === id);

  if (!livro) {
    console.log(`Livro com ID ${id} não encontrado.`);
    return;
  }

  if (!livro.disponivel) {
    console.log(`O livro "${livro.titulo}" já está emprestado.`);
    return;
  }

  livro.disponivel = false;
  console.log(`Livro "${livro.titulo}" emprestado com sucesso!`);
}

// Testando tudo
adicionarLivro({ id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, disponivel: true });
adicionarLivro({ id: 2, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954, disponivel: true });

listarLivros();

emprestarLivro(1);

listarLivros();