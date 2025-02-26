# Algoritmo Genético - Evolução dos Aliens 👽

Este projeto implementa um **Algoritmo Genético** para simular a evolução de uma população de **aliens**, utilizando conceitos de **seleção natural, cross-over e mutação**. O objetivo é visualizar como os indivíduos evoluem ao longo das gerações.

## 🚀 Funcionalidades

- **Gerar População Inicial** 👽
- **Selecionar os Indivíduos Mais Aptos** 📊
- **Aplicar Cross-Over** 🔀
- **Executar Mutações** 🧬

## 📌 Tecnologias Utilizadas

- **HTML5** 🏗️
- **CSS3** 🎨
- **JavaScript (Vanilla)** ⚡

## 🛠️ Como Executar o Projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/algoritmo-genetico.git
   ```
2. **Acesse a pasta do projeto:**
   ```sh
   cd algoritmo-genetico-ML
   ```
3. **Abra o arquivo ****`index.html`**** no navegador.**

## 📝 Como Funciona

1. **Gerar População:** Cria uma população de 6 aliens com cores aleatórias.
2. **Seleção Natural:** Escolhe 6 indivíduos baseados em sua **escuridão** (os mais escuros têm mais chance de serem selecionados).
3. **Cross-Over:** Aplica os seguintes métodos de recombinação genética:
   - **One-Point 1** 🔵
   - **One-Point 2** 🔴
   - **Uniform** 🟢
   - **Arithmetic** 🟡
4. **Mutação:** Um dos descendentes (F1, F2, F3 ou F4) sofre uma das seguintes mutações:
   - **Mutação Aleatória:** Um dos valores RGB recebe um novo valor aleatório.
   - **Mutação Pequena:** Um dos valores RGB aumenta/diminui em até 10 pontos.
   - **Mutação Dirigida:** Todos os valores RGB diminuem para escurecer o alien.

## 🖥️ Estrutura do Projeto

```
algoritmo-genetico-ML/
│── index.html       # Página principal
│── style.css        # Estilos do projeto
│── script.js        # Lógica do algoritmo genético
│── alien.svg        # Ícone do alienígena
│── README.md        # Documentação do projeto
```

## 📸 Demonstração

(algoritmo-genetico-ML/preview.png)

## 🏆 Créditos

Projeto desenvolvido por [Abner Silva](https://github.com/AbnerSLima) ✨.

---

### 🔗 Licença

Este projeto está sob a licença **MIT**. Sinta-se à vontade para usar, modificar e compartilhar! 🚀

