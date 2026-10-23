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
│   ├── layout.css              Shell: topbar, sidebar e responsividade
│   ├── components.css          Sistema de componentes (cards, botões, modais, tabs)
│   ├── animations.css          Micro-animações e transições
│   └── extra-pages.css         Estilos das telas de formulários, eventos, contatos e notificações
└── js/
│   ├── demo-data.js            Bundle dos fixtures de demonstração do Flutter, compatível com file://
│   ├── data.js                 Adapta os dados de demonstração às telas e mantém estado local
│   ├── charts.js               Gráficos via Canvas 2D API (barras, donut, radar 11 eixos, sparklines)
│   ├── router.js               Navegação entre páginas via localStorage
│   ├── components.js           Topbar, sidebar e modal de leitura rápida
│   └── extra-pages.js          Renderização de formulários, eventos, contatos e notificações
└── pages/
    ├── login.html              Tela de login (layout split com logo oficial)
    ├── dashboard.html          Dashboard com gráficos e alertas clínicos
    ├── patients.html           Lista de pacientes, popup rápido e cadastro
    ├── patient-detail.html     Ficha da paciente (11 abas, incluindo consultas, jornada operacional e relatório para impressão)
    ├── patient-profile.html    Perfil pessoal da paciente e autorizações de compartilhamento
    ├── habits.html             Diário Lapidar (check-in diário, metas personalizadas, bloco 40+)
    ├── consultation.html       Workspace de consulta (checklist, 22 exames com 3 status, anotações)
    ├── journey.html            Jornada operacional (visão geral com timeline e checklist com fases pós-ciclo)
    ├── agenda.html             Agenda com calendário interativo, contatos de terça e retorno > 7d
    ├── financial.html          Financeiro com gráfico e tabela de transações
    ├── forms.html              Modelos e respostas de formulários
    ├── events.html             Calendário, inscrições e eventos da clínica
    ├── contacts.html           Diretório de pessoas e contatos
    ├── notifications.html      Histórico filtrável de notificações
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

O botão “Ver como” no topbar abre o seletor de seis perfis de demonstração; cada perfil adapta o menu, as permissões e o conteúdo:

| Perfil | Acesso |
|---|---|
| **Médica** | Acesso clínico, financeiro geral e sistema |
| **Médica (sem admin)** | Consultas e agenda; ficha somente leitura; financeiro próprio |
| **Secretária (Admin)** | Agenda, contatos, financeiro geral e sistema |
| **Secretária** | Agenda, contatos e financeiro próprio |
| **Paciente** | Diário, ficha, consultas e conteúdos |
| **Desenvolvedor** | Logs do sistema e configurações |

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
- O shell (topbar + sidebar) é inicializado em cada página com `initShell('nome-da-pagina')`.
