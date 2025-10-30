// Arquivo: app.js
// Este arquivo contém classes de POO geradas para o exercício.

// Classe Prato: representa um prato no cardápio
class Prato {
  constructor(nome, preco, ingredientes = []) {
    this.nome = nome;
    this.preco = preco;
    this.ingredientes = ingredientes;
  }

  calcularPrecoComTaxa(taxaPercentual = 0) {
    return +(this.preco * (1 + taxaPercentual / 100)).toFixed(2);
  }

  // Copilot, me explique esta classe. O que é um 'constructor'?
  // Copilot, o que é 'this' neste contexto?
}

// Classe Restaurante: agrupa pratos e fornece operações comuns
class Restaurante {
  constructor(nome, endereco) {
    this.nome = nome;
    this.endereco = endereco;
    this.menu = []; // array de Prato
  }

  adicionarPrato(prato) {
    if (prato instanceof Prato) {
      this.menu.push(prato);
    } else {
      throw new TypeError('adicionarPrato espera uma instância de Prato');
    }
  }

  buscarPratoPorNome(nome) {
    return this.menu.find(p => p.nome.toLowerCase() === nome.toLowerCase()) || null;
  }

  listarMenu() {
    return this.menu.map(p => `${p.nome} - R$ ${p.preco.toFixed(2)}`).join('\n');
  }

  render() {
    // Exemplo simples de "render": transforma o estado em texto legível
    return `Restaurante: ${this.nome}\nEndereço: ${this.endereco}\nMenu:\n${this.listarMenu()}`;
  }

  // Copilot, me explique esta classe. O que é um 'constructor'?
  // Copilot, por que este método 'render' é útil?
  // Copilot, o que é 'this' neste contexto?
}

// Classe Musica: representa uma música
class Musica {
  constructor(titulo, duracaoSegundos, genero = '') {
    this.titulo = titulo;
    this.duracaoSegundos = duracaoSegundos;
    this.genero = genero;
  }

  duracaoFormatada() {
    const min = Math.floor(this.duracaoSegundos / 60);
    const seg = this.duracaoSegundos % 60;
    return `${min}:${seg.toString().padStart(2, '0')}`;
  }

  // Copilot, me explique esta classe. O que é um 'constructor'?
  // Copilot, o que é 'this' neste contexto?
}

// Classe Artista: agrupa músicas e operações relacionadas
class Artista {
  constructor(nome, estilo = '') {
    this.nome = nome;
    this.estilo = estilo;
    this.discografia = []; // array de Musica
  }

  adicionarMusica(musica) {
    if (musica instanceof Musica) {
      this.discografia.push(musica);
    } else {
      throw new TypeError('adicionarMusica espera uma instância de Musica');
    }
  }

  listarDiscografia() {
    return this.discografia.map((m, i) => `${i + 1}. ${m.titulo} (${m.duracaoFormatada()})`).join('\n');
  }

  render() {
    return `Artista: ${this.nome} (${this.estilo})\nDiscografia:\n${this.listarDiscografia()}`;
  }

  // Copilot, me explique esta classe. O que é um 'constructor'?
  // Copilot, por que este método 'render' é útil?
  // Copilot, o que é 'this' neste contexto?
}

// Exportar classes para uso em outros módulos (se necessário)
module.exports = { Prato, Restaurante, Musica, Artista };

// Exemplo rápido de uso (para execução local)
if (require.main === module) {
  const r = new Restaurante('Cantinho JS', 'Rua das Variáveis, 42');
  const p1 = new Prato('Feijoada', 35.0, ['feijão', 'carne']);
  const p2 = new Prato('Salada', 18.5, ['alface', 'tomate']);
  r.adicionarPrato(p1);
  r.adicionarPrato(p2);
  console.log(r.render());

  const a = new Artista('Synth Maestro', 'Eletrônica');
  const m1 = new Musica('Noite Neon', 210, 'Synthwave');
  a.adicionarMusica(m1);
  console.log('\n' + a.render());
}
