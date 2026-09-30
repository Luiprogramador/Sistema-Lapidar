# lapidar-prototipo

Protótipo estático do Sistema Lapidar em HTML, CSS e JavaScript puro — sem frameworks, sem build tools.

## Como abrir

Abra o arquivo `prototipo/index.html` diretamente no navegador. Nenhum servidor ou instalação necessária.

## Estrutura do projeto

```
prototipo/
├── index.html                  Ponto de entrada (redireciona para login)
├── assets/                     Logos oficiais (transparentes, vetor e texto)
├── css/
│   ├── variables.css           Tokens de design (cores, fontes, espaçamentos)
│   ├── base.css                Reset global e tipografia
│   ├── layout.css              Shell: topbar, sidebar, bottom bar, responsividade
│   ├── components.css          Sistema de componentes (cards, botões, modais, tabs)
│   └── animations.css          Micro-animações e transições
└── js/
│   ├── data.js                 Mock data: 8 pacientes completos, catálogo com 22 exames, check-in diário
│   ├── charts.js               Gráficos via Canvas 2D API (barras, donut, radar 11 eixos, sparklines)
│   ├── router.js               Navegação entre páginas via localStorage
│   └── components.js           Topbar, sidebar, bottom bar, modal de leitura rápida
└── pages/
    ├── login.html              Tela de login (layout split com logo oficial)
    ├── dashboard.html          Dashboard com gráficos e alertas clínicos
    ├── patients.html           Lista de pacientes, popup rápido e cadastro
    ├── patient-detail.html     Ficha da paciente (8 abas + impressão de relatório PDF)
    ├── habits.html             Diário Lapidar (check-in diário, metas personalizadas, bloco 40+)
    ├── consultation.html       Workspace de consulta (checklist, 22 exames com 3 status, anotações)
    ├── journey.html            Jornada operacional (visão geral com timeline e checklist com fases pós-ciclo)
    ├── agenda.html             Agenda com calendário interativo, contatos de terça e retorno > 7d
    ├── financial.html          Financeiro com gráfico e tabela de transações
    ├── portal.html             Portal da paciente (score radar, progresso, acesso ao diário, consultas)
    └── settings.html           Configurações da clínica e alertas
```

## Navegação

O roteamento é feito via `localStorage` (sem URL hash). O objeto `Router` em `js/router.js` gerencia o estado da página atual, perfil ativo e paciente selecionado.

Para navegar entre páginas, use sempre:
```js
Router.navigate('nome-da-pagina');               // sem parâmetros
Router.navigate('patient-detail', { patientId: 1 }); // com parâmetros
```

## Perfis de demonstração

O seletor no topbar alterna entre três perfis, cada um com menu e conteúdo adaptados:

| Perfil | Acesso |
|---|---|
| **Médica** | Dashboard, Pacientes, Agenda, Financeiro, Configurações |
| **Secretaria** | Dashboard, Pacientes, Agenda, Financeiro, Configurações |
| **Paciente** | Minha Ficha, Diário Lapidar, Consultas |

## Paleta de cores

| Token | Valor | Uso |
|---|---|---|
| `--vinho` | `#5B2333` | Cor primária |
| `--dourado` | `#C6A15B` | Destaques e acentos |
| `--bege` | `#F4EFE7` | Background |
| `--oliva` | `#66724A` | Sucesso / metas atingidas |

## Convenções

- Todo conteúdo dinâmico é gerado via `innerHTML` ou `appendChild` dentro de `<script>` — nunca template literals soltos no HTML.
- Estado persistido no `localStorage` com chaves prefixadas `lapidar-`.
- Gráficos são redesenhados no evento `resize` e na troca de aba via `requestAnimationFrame`.
- O shell (topbar + sidebar + bottom bar) é inicializado em cada página com `initShell('nome-da-pagina')`.
