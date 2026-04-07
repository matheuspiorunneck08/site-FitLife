
Site interativo de perda de peso e metas fitness com calculadora de IMC, planos de treino personalizados e fichas de academia. Desenvolvido em HTML, CSS e JavaScript puro.
```

---

## README.md Completo

```markdown
# FitLife - Seu Parceiro na Jornada Fitness

Site completo e interativo para ajudar usuários a alcançar suas metas de peso e condicionamento físico. Com calculadora de IMC, planos de treino personalizados, fichas de academia detalhadas e muito mais.

## Funcionalidades

- **Calculadora de IMC** - Calcula o Índice de Massa Corporal e define o peso ideal baseado na altura
- **Planos Personalizados** - 4 planos de treino adaptados para cada objetivo:
  - Perda de Peso
  - Ganho de Massa Muscular
  - Manutenção e Bem-estar
  - HIIT (Treino Intervalado de Alta Intensidade)
- **Fichas de Treino Completas** - Exercícios detalhados com séries, repetições e tempo de descanso
- **Plano Alimentar** - Sugestões de refeições para cada objetivo
- **Esportes Recomendados** - Lista de atividades físicas com calorias queimadas por hora
- **Tema Claro/Escuro** - Alternância entre modo claro (branco/azul) e escuro (preto/azul)
- **Design Responsivo** - Funciona perfeitamente em celulares, tablets e desktops

## Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox, Grid, Animações, Variáveis CSS)
- JavaScript (ES6+)
  - `let` e `const` para declaração de variáveis
  - `console.log()` para debug
  - `alert()` para interações com o usuário
  - `localStorage` para salvar preferências do tema

## Estrutura do Projeto

```

public/
├── index.html          # Página principal
├── plano.html          # Página de plano personalizado
├── style.css           # Estilos CSS
├── script.js           # Lógica JavaScript
└── images/
├── hero-fitness.jpg
├── cardio.jpg
├── musculacao.jpg
├── yoga.jpg
├── natacao.jpg
├── ciclismo.jpg
├── alimentacao.jpg
└── sucesso.jpg

## Como usar

1. Na página inicial, insira seu **peso atual** e sua **altura**
2. Clique em **"Calcular Meu Plano"**
3. Veja seu IMC, peso ideal e escolha um dos planos disponíveis
4. Clique no plano desejado para ver detalhes completos
5. Na página do plano, encontre:

1. Ficha de treino semanal
2. Plano alimentar
3. Esportes recomendados
4. Dicas personalizadas

## Personalização

### Alterar Cores

As cores do site são definidas através de variáveis CSS em `style.css`:

```css
:root {
    --primary-color: #2563eb;    /* Azul principal */
    --secondary-color: #1e40af;  /* Azul escuro */
    --accent-color: #3b82f6;     /* Azul claro */
    --background-color: #ffffff; /* Fundo */
    --text-color: #1f2937;       /* Texto */
}
```

### Adicionar Novos Planos

Para adicionar novos planos de treino, edite o arquivo `script.js` e adicione um novo objeto no array `planosDetalhados`.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abrir um Pull Request


**Transforme sua vida, um treino de cada vez!






```
