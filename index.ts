import * as readline from "readline";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  disponivel: boolean;
}

const livros: Livro[] = [];
let proximoId = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pergunta(texto: string): Promise<string> {
  return new Promise((resolve) => rl.question(texto, resolve));
}

function listarLivros(): void {
  if (livros.length === 0) {
    console.log("\nNenhum livro cadastrado ainda.\n");
    return;
  }
  console.log("\n📚 Lista de Livros:");
  livros.forEach((livro) => {
    console.log(`
  ID: ${livro.id}
  Título: ${livro.titulo}
  Autor: ${livro.autor}
  Ano: ${livro.ano}
  Disponível: ${livro.disponivel ? "✅ Sim" : "❌ Não"}
    `);
  });
}

async function adicionarLivro(): Promise<void> {
  console.log("\n➕ Adicionar Livro:");
  const titulo = await pergunta("Título: ");
  const autor = await pergunta("Autor: ");
  const ano = await pergunta("Ano: ");

  const novoLivro: Livro = {
    id: proximoId++,
    titulo,
    autor,
    ano: Number(ano),
    disponivel: true,
  };

  livros.push(novoLivro);
  console.log(`\n✅ Livro "${titulo}" adicionado com sucesso!`);
}

async function emprestarLivro(): Promise<void> {
  if (livros.length === 0) {
    console.log("\nNenhum livro cadastrado ainda.\n");
    return;
  }

  listarLivros();
  const id = await pergunta("Digite o ID do livro para emprestar: ");
  const livro = livros.find((l) => l.id === Number(id));

  if (!livro) {
    console.log("\n❌ Livro não encontrado.");
    return;
  }

  if (!livro.disponivel) {
    console.log(`\n❌ O livro "${livro.titulo}" já está emprestado.`);
    return;
  }

  livro.disponivel = false;
  console.log(`\n✅ Livro "${livro.titulo}" emprestado com sucesso!`);
}

async function menu(): Promise<void> {
  while (true) {
    console.log("\n=============================");
    console.log("      📚 Gerenciador de Livros");
    console.log("=============================");
    console.log("1 - Adicionar livro");
    console.log("2 - Listar livros");
    console.log("3 - Emprestar livro");
    console.log("0 - Sair");
    console.log("=============================");

    const opcao = await pergunta("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        await adicionarLivro();
        break;
      case "2":
        listarLivros();
        break;
      case "3":
        await emprestarLivro();
        break;
      case "0":
        console.log("\nAté mais! 👋\n");
        rl.close();
        return;
      default:
        console.log("\n❌ Opção inválida. Tente novamente.");
    }
  }
}

menu();