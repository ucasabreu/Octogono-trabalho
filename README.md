# Projeto de Computação Gráfica - Transformações Geométricas em WebGL

## Descrição do Projeto

Este projeto tem como objetivo desenvolver um programa em WebGL que permita ao usuário realizar interações e aplicar transformações geométricas em um objeto bidimensional. As transformações incluem translação, rotação e redimensionamento do objeto.

## Funcionalidades

### a) Translação 
- O usuário pode clicar e arrastar dentro da área interna do objeto para movê-lo.
- A translação é realizada em tempo real conforme o movimento do mouse.

### b) Rotação 
- Permitir que o usuário rotacione o objeto em torno do seu baricentro.
- A rotação é controlada por um botão que incrementa o ângulo de rotação a cada clique.

### c) Redimensionamento 
- Permitir que o objeto seja escalado (aumentado ou reduzido) com relação ao seu baricentro.
- O redimensionamento é controlado por um slider que ajusta a escala do objeto.

## Instruções de Uso

1. **Translação**:
   - Clique e segure o botão esquerdo do mouse dentro da área do objeto.
   - Arraste o mouse para mover o objeto na direção desejada.

2. **Rotação**:
   - Clique no botão "Rotacionar" para rotacionar o objeto em torno do seu baricentro.

3. **Redimensionamento**:
   - Use o slider "Escala" para aumentar ou reduzir o tamanho do objeto.

## Estrutura do Projeto

- `Common/`: Contém arquivos comuns utilizados no projeto.
  - `initShaders.js`: Funções para inicializar shaders no arquivo HTML.
  - `initShaders2.js`: Funções para inicializar shaders que estão em arquivos separados.
  - `MV.js`: Pacote de matrizes e vetores.
  - `webgl-utils.js`: Utilitários padrão do Google para configurar um contexto WebGL.

- `index.html`: Contém a estrutura HTML do projeto.
- `octogono.js`: Contém a lógica JavaScript para as transformações geométricas.
- `octogono.css`: Contém os estilos CSS para a interface do usuário.
- `shaders`: Contém os shaders de vértice e fragmento usados pelo WebGL.

## Tecnologias Utilizadas

- **WebGL**: Para renderização gráfica.
- **JavaScript**: Para lógica de interação e transformações geométricas.
- **HTML/CSS**: Para estrutura e estilo da interface do usuário.

## Como Executar o Projeto

1. Clone o repositório para sua máquina local.
2. Abra o arquivo `index.html` em um navegador que suporte WebGL.
3. Interaja com o objeto usando as funcionalidades descritas acima.