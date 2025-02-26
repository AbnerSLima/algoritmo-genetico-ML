let populacao = [];
const tamanhoPopulacao = 6;

/* Gera uma cor aleatória no formato RGB.*/
function gerarCorAleatoria() {
    return [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256)
    ];
}

/* Cria a população inicial. */
function gerarPopulacao() {
    populacao = Array.from({ length: tamanhoPopulacao }, () => gerarCorAleatoria());
    renderizarPopulacao("populacao");
}

/* Calcula a aptidão de um alien com base na sua escuridão. */
function fitness(alien) {
    return 255 - (alien[0] + alien[1] + alien[2]) / 3; 
}

/* Seleção Natural - Seleciona dois indivíduos baseando-se na escuridão. */
function selecaoNatural() {
    let novaPopulacao = [];
    for (let i = 0; i < 6; i++) {
        novaPopulacao.push(selecaoPorProbabilidade());
    }
    populacao = novaPopulacao;
    renderizarPopulacao("populacao2");
}

/* Simula a seleção de um alien com maior probabilidade para os mais escuros. */
function selecaoPorProbabilidade() {
    let somaFitness = populacao.reduce((soma, alien) => soma + fitness(alien), 0);
    let sorteio = Math.random() * somaFitness;
    let acumulado = 0;
    
    for (let i = 0; i < populacao.length; i++) {
        acumulado += fitness(populacao[i]);
        if (acumulado >= sorteio) return populacao[i];
    }
}

/* Seleciona dois pais aleatórios para o cross-over. */
function selectParents() {
    if (populacao.length < 2) return null;
    let parent1 = populacao[Math.floor(Math.random() * populacao.length)];
    let parent2 = populacao[Math.floor(Math.random() * populacao.length)];
    return [parent1, parent2];
}

/* Realiza o Cross-Over entre dois indivíduos. */
function crossOver() {
    let parents = selectParents();
    if (!parents) return;
    let [pai1, pai2] = parents;
    
    let filhos = [
        { filho: crossoverOnePoint(pai1, pai2), metodo: "One-Point 1" },
        { filho: crossoverOnePoint(pai2, pai1), metodo: "One-Point 2" },
        { filho: crossoverUniform(pai1, pai2), metodo: "Uniform" },
        { filho: crossoverArithmetic(pai1, pai2), metodo: "Arithmetic" }
    ];
    
    populacao = [pai1, pai2, ...filhos.map(f => f.filho)];
    renderizarCrossOver("populacao3", pai1, pai2, filhos);
}

/* Tipos de Cross-Over aplicáveis. */
function crossoverOnePoint(parent1, parent2) {
    let midpoint = Math.floor(Math.random() * 3);
    let childRGB = [...parent1];
    childRGB[midpoint] = parent2[midpoint];
    return childRGB;
    //Escolhe um ponto de corte aleatório no array de genes (posição 0, 1 ou 2, correspondendo a R, G ou B).
    //Copia os genes do primeiro pai (parent1).
    //Substitui o valor do gene na posição escolhida pelo valor do mesmo gene do segundo pai (parent2).
    //Retorna o novo filho com essa modificação.
}

function crossoverUniform(parent1, parent2) {
    return parent1.map((val, i) => (Math.random() < 0.5 ? val : parent2[i]));
    //Percorre cada gene (R, G, B) e decide aleatoriamente se mantém o gene do primeiro pai ou troca pelo gene do segundo pai.
    //A decisão é feita com Math.random() < 0.5, ou seja, há 50% de chance de cada gene vir do primeiro ou do segundo pai.
}

function crossoverArithmetic(parent1, parent2, alpha = 0.5) {
    return parent1.map((val, i) => Math.round(alpha * val + (1 - alpha) * parent2[i]));
    //Para cada gene (R, G, B), calcula um valor intermediário ponderado entre os pais.
    //alpha define o peso de cada pai na mistura.
    //O cálculo é:
      // R = round(0.5 * pai1[R] + 0.5 * pai2[R]) = round(filho[R]) = filho[R]
      // G = round(0.5 * pai1[G] + 0.5 * pai2[G]) = round(filho[G]) = filho[G]
      // B = round(0.5 * pai1[B] + 0.5 * pai2[B]) = round(filho[B]) = filho[B]
      // Filho gerado: [filho[R], filho[G], filho[B]]
    //O valor padrão de alpha é 0.5, o que significa que o filho recebe 50% de influência de cada pai.
}

/* Renderiza o resultado do Cross-Over. */
function renderizarCrossOver(containerId, pai1, pai2, filhos) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";
    
    filhos.forEach(({ filho, metodo }, index) => {
        let row = document.createElement("div");
        row.className = "crossover-row";
        row.innerHTML = `
            <h2>${metodo}</h2>
            <div style="display: flex; align-items: center; gap: 10px;">
                <div class="alien-container">P1 ${criarAlienSVG(pai1)}</div>
                <span> + </span>
                <div class="alien-container">P2 ${criarAlienSVG(pai2)}</div>
                <span> = </span>
                <div class="alien-container">F${index + 1} ${criarAlienSVG(filho)}</div>
            </div>
            <hr>
        `;
        container.appendChild(row);
    });
    
    let novaPopulacaoRow = document.createElement("div");
    novaPopulacaoRow.className = "crossover-row";
    novaPopulacaoRow.innerHTML = `
        <h2>Nova População</h2>
        <div style="display: flex; align-items: center; gap: 10px;">
            <div class="alien-container">P1 ${criarAlienSVG(pai1)}</div>
            <div class="alien-container">P2 ${criarAlienSVG(pai2)}</div>
            ${filhos.map((f, i) => `<div class="alien-container">F${i + 1} ${criarAlienSVG(f.filho)}</div>`).join('')}
        </div>
        <hr>
    `;
    container.appendChild(novaPopulacaoRow);
}

/* Gera o código SVG do alien com cor específica. */
function criarAlienSVG(cor) {
    let fitnessValue = fitness(cor).toFixed(0);
    return `
        <div style="text-align: center;">
            <img src="alien.svg" style="width: 50px; height: 50px; filter: invert(1) sepia(1) saturate(10000%) hue-rotate(${cor[0]}deg) brightness(${cor[1] / 255}) contrast(${cor[2] / 255});">
            <p style="margin: 5px 0 0 0;">${fitnessValue}</p>
        </div>
    `;
}

/* Renderiza a população com cores RGB. */
function renderizarPopulacao(containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";
    
    populacao.forEach(cor => {
        let div = document.createElement("div");
        div.className = 'alien-container';

        let img = document.createElement("img");
        img.src = "alien.svg";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.filter = `invert(1) sepia(1) saturate(10000%) hue-rotate(${cor[0]}deg) brightness(${cor[1] / 255}) contrast(${cor[2] / 255})`;

        let fitnessValue = document.createElement("p");
        fitnessValue.innerText = `${fitness(cor).toFixed(0)}`;
        fitnessValue.style.margin = "5px 0 0 0";

        div.appendChild(img);
        div.appendChild(fitnessValue);
        container.appendChild(div);
    });
}

/* Aplica mutação em um dos novos indivíduos */
function mutacao() {
    let novosIndividuos = populacao.slice(2);
    if (novosIndividuos.length === 0) return;
    let indice = Math.floor(Math.random() * novosIndividuos.length) + 2;
    let original = populacao[indice];
    
    let mutacoes = [
        { mutante: mutar(original, 'aleatoria'), metodo: "Mutação Aleatória" },
        { mutante: mutar(original, 'pequena'), metodo: "Mutação Pequena" },
        { mutante: mutar(original, 'dirigida'), metodo: "Mutação Dirigida" }
    ];
    
    renderizarMutacao("populacao4", original, mutacoes);
}

/* Tipos de mutação aplicáveis. */
function mutar(alien, tipo) {
    let novoAlien = [...alien];
    let indice = Math.floor(Math.random() * 3);
    if (tipo === 'aleatoria') {
        // Um dos valores R, G ou B muda para um valor totalmente aleatório entre 0 e 255
        novoAlien[indice] = Math.floor(Math.random() * 256);
    } else if (tipo === 'pequena') {
        // Um dos valores R, G ou B sofre um pequeno aumento ou redução entre -10 e +10
        novoAlien[indice] = Math.min(255, Math.max(0, novoAlien[indice] + (Math.random() < 0.5 ? -10 : 10)));
    } else if (tipo === 'dirigida') {
        // Todos os valores R, G e B são diminuídos por um valor aleatório entre 5 e 20
        novoAlien = novoAlien.map(val => Math.max(0, val - Math.floor(Math.random() * 16 + 5)));
    }
    return novoAlien;
}

/* Renderiza a mutação de um único indivíduo com os três tipos de mutação. */
function renderizarMutacao(containerId, original, mutacoes) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";
    
    mutacoes.forEach(({ mutante, metodo }) => {
        let row = document.createElement("div");
        row.className = "mutation-row";
        row.innerHTML = `
            <h2>${metodo}</h2>
            <div style="display: flex; align-items: center; gap: 10px;">
                <div class="alien-container">Original ${criarAlienSVG(original)}</div>
                <span> → </span>
                <div class="alien-container">Mutante ${criarAlienSVG(mutante)}</div>
            </div>
            <hr>
        `;
        container.appendChild(row);
    });
}