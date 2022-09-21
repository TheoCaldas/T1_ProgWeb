# T1 Programação Web
## INF1407 22.2 PUC-Rio
### Theo Caldas (1911078) & Matheus Kulick (1911090)

# Minhoca Louca
Jogo baseado no famoso "Snake". <br>

## 1. GDD
Nesse jogo, você é uma minhoca louca que precisa coletar frutas para ganhar pontos. <br>
Ao coletar uma fruta, além de aumentar a pontuação, a cauda da minhoca cresce um pouco. <br>
A minhoca está sempre em movimento e você sempre controla sua direção, à partir da cabeça. <br>
Você perde se a cabeça encostar na cauda ou em uma parede (cantos da tela). <br>

### 1.1 Dificuldades
Antes do início de uma partida, é necessário escolher o nível de dificuldade. <br>
Existem 3 níveis de dificuldade do jogo: Fácil, Médio e Difícil. <br>
Quanto mais alta a dificuldade, mais velocidade para a minhoca (menor tempo de reação). <br>


### 1.2 Identificação dos Elementos
Cabeça da cobra - Quadradinho Azul Escuro <br>
Cauda da cobra - Quadradinho Azul Claro <br>
Fruta - Quadradinho Vermelho <br>

### 1.3 Fluxo de telas
<img src="/images/fluxograma.png" alt="Fluxograma Minhoca Louca" style="height: 100px; width:100px;"/>

## 2. Relatório
Foi implementado o menu inicial que pede ao usuário, através de formulário, seu email em Priplanus (texto) e a dificuldade do jogo (seletor de opções). <br>
Foi implementada a verificação do formato do email (tal como descrito no enunciado) e a verificação de uma dificuldade selecionada. <br>
!!! Foram implementadas as mecânicas principais do jogo. <br>
!!! Foi implementado o fluxo de telas descritos acima. <br>

### 2.1 Requisitos Atendidos
• Identificação do usuário no formato de email utilizado em Priplanus e validação utilizando expressão regular -> main.js <br>
!!! • Utilização de no mínimo dois objetos do tipo imagem com duas imagens diferentes em cada objeto <br>
• Tem no mínimo um array -> game.js <br>
• Tem no mínimo uma tomada de decisão (desvio condicional) -> main.js e game.js <br>
• Tem pelo menos um parâmetro configurável por um campo <\select> usando repetição para determinar a opção escolhida -> index.html <br>