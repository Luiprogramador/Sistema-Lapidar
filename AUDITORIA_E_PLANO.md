# Auditoria inicial — Lapidar principal x protótipo

## Contexto técnico

- **Aplicação principal (`interface.zip`)**: Flutter/Dart. Código em `SistemaLapidar/lib/`, organizado por funcionalidades e com testes automatizados.
- **Protótipo (`protótipo.zip`)**: HTML, CSS e JavaScript puro. Páginas independentes, navegação pelo `localStorage` e dados de demonstração em `js/data.js`.
- Estratégia: manter o protótipo web e reproduzir nele os fluxos e comportamentos relevantes do principal, sem tentar converter Flutter para HTML automaticamente.

## Diferenças confirmadas no código

### Ficha da paciente

A aplicação principal declara 11 abas em `lib/features/patients/presentation/pages/patient_record_page.dart`:

1. Timeline
2. Painel Clínico
3. Consultas
4. Bioimpedância
5. Diário Lapidar
6. Score Lapidar
7. Risco Cardiovascular
8. Medicamentos e Suplementos
9. Arquivos
10. Jornada operacional
11. Relatório

O protótipo original tinha 8 abas: Painel Clínico, Timeline, Bioimpedância, Score Lapidar, Risco CV, Medicamentos, Arquivos e Diário & Hábitos.

**Primeira alteração realizada:** foram adicionadas as abas Consultas, Jornada operacional e Relatório, com conteúdo inicial e ações de navegação/impressão. A aba Jornada fica oculta na visualização de paciente, respeitando o caráter interno indicado no principal. As informações são dados locais de demonstração.

### Consultas

O principal tem uma tela de detalhe de consulta organizada em cinco abas: Detalhes, Checklist, Exames, Anotações e Análises. O protótipo já tem seções correspondentes, mas é necessário testar e comparar as ações e permissões, não apenas os títulos.

### Mensagens

O principal tem páginas próprias para histórico de mensagens e mensagens da paciente, com pesquisa, filtros (todas, recebidas, enviadas, não lidas), paginação e ações de leitura/resposta. O protótipo não tinha uma página dedicada de mensagens nem rota própria no `js/router.js`.

### Perfis e permissões

O principal tem regras por perfil nas telas e na navegação. O protótipo também restringe algumas rotas, mas a matriz de acesso deve ser comparada módulo por módulo. Esconder elementos na interface não substitui autorização em um backend real.

### Dados e arquitetura

- O principal usa modelos e um repositório de demonstração, incluindo pacientes, consultas, mensagens, diário, finanças e arquivos.
- O protótipo guarda dados de demonstração em `js/data.js` e parte do estado no `localStorage`.
- Os dados do protótipo não estão sincronizados automaticamente com o aplicativo Flutter.

## Próximas etapas sugeridas

1. Validar no navegador as três abas adicionadas à ficha.
2. Criar a página de Mensagens e conectar a navegação.
3. Comparar as cinco abas da consulta com a implementação Flutter.
4. Revisar a matriz de permissões de médica, secretária, administradora e paciente.
5. Comparar o restante dos módulos: dashboard, pacientes, agenda, financeiro, diário, bioimpedância, score, risco cardiovascular, medicamentos, arquivos, conteúdos e configurações.
6. Rodar testes manuais por perfil e revisar responsividade.

## Limites desta auditoria

A comparação foi feita pela estrutura e pelo código-fonte extraído dos ZIPs. A validação visual e comportamental em navegador ainda precisa ser executada. A impressão do relatório do protótipo é uma prévia demonstrativa, não um documento clínico validado.

## Atualização — paridade implementada no protótipo

Comparação feita lendo o código Flutter (`lib/`) e validando o protótipo no navegador (desktop 1366 px e mobile 390 px) com os cinco perfis.

### Ficha da paciente (`pages/patient-detail.html`)
- Abas reordenadas como o enum `RecordTab`: Timeline (aba inicial), Painel Clínico, Consultas, Bioimpedância, Diário Lapidar, Score Lapidar, Risco Cardiovascular, Medicamentos e Suplementos, Arquivos, Jornada operacional, Relatório.
- Consultas: indicadores "Consultas realizadas / agendadas / Consulta atual", datas em dd/mm/aaaa e situação em badge. "Nova consulta" só para a médica.
- Jornada operacional: "Jornada da paciente — checklist interno da equipe", lê o progresso salvo em `lapidar-journey-<id>` (itens marcados e fase pós-ciclo). Continua oculta para a paciente.
- Relatório: cards formatados (as classes usadas antes não existiam no CSS) e botão Imprimir / salvar em PDF.
- Edição da ficha (bioimpedância, metas, medicamentos, liberação do risco CV) segue `canEditChart`: só a médica administradora.

### Mensagens (`pages/messages.html`, dados em `js/data.js`)
- Equipe: título com "N não lida(s) • M mensagens no histórico", busca por paciente ou assunto, filtros Todas / Recebidas / Enviadas / Não lidas, tabela DATA / PACIENTE / ASSUNTO / TIPO / SITUAÇÃO (lista empilhada no mobile), paginação de 10 itens, leitura em modal (marca como lida), Responder ("Re: assunto", vinculado por `replyToId`) e Nova mensagem.
- Paciente: "Recados entre você e a equipe Lapidar", cards "Equipe Lapidar" / "Você" e envio "Mensagem para a equipe".
- Situações iguais ao Flutter: Não lida, Lida, Aguardando leitura, Lida pela paciente.
- Acesso: item Mensagens no menu da médica e da secretária e ícone de envelope com contador na barra superior (como no Flutter, é por ele que a paciente abre as mensagens).
- Mensagens semeadas como em `lapidar_seed_messages.dart` e salvas em `lapidar-messages`.

### Consulta (`pages/consultation.html`)
- Cinco abas como `ConsultationTab`: Detalhes, Checklist, Exames, Anotações, Análises.
- Detalhes: data por extenso, horário, tipo, protocolo, status, peso e exames, mais chips de status / protocolo / checklist / exames pendentes.
- Ações: Abrir ficha, Ver Jornada (equipe), Editar consulta (modal) e Concluir consulta (médica, enquanto a consulta não estiver concluída).
- Permissões (`allowedFor`): a médica vê tudo; a secretária vê só Exames (abre pela agenda); a paciente vê Detalhes, Exames e Análises.

### Perfis e permissões (`js/router.js`, `js/components.js`)
- O perfil "Administrador" separado deixou de existir. O seletor agora tem Médica, Médica (sem admin), Secretária (admin), Secretária e Paciente (`role` + `isAdmin` em `lapidar_proto_state`). O valor antigo `admin` passa a ser tratado como Secretária (admin).
- `Router.can()` replica `AuthSession`: manageContent, editChart, seeClinicFinance, customizeSystem, seeConsultations, contactDataOnly etc.
- Menus como no `app_shell.dart`:
  - Médica: Dashboard, Pacientes, Agenda, Consultas, Mensagens, Financeiro, Conteúdos, Configurações.
  - Secretária: Dashboard, Pacientes, Agenda, Mensagens, Financeiro, Conteúdos, Configurações.
  - Paciente: Diário, Minha ficha, Consultas, Conteúdos, Configurações.
  - "Meu perfil" foi mantido como item extra do protótipo.
- Página inicial: Dashboard para a equipe e Diário para a paciente.
- Dashboard: a secretária agora tem acesso e vê só o recorte operacional "Exames pendentes" (`canSeeAlert`).
- Conteúdos e configurações clínicas: só a médica administradora.
- Financeiro geral, configurações da clínica e usuários: só perfis administradores.

### Validação executada
- Varredura automática dos 5 perfis em 14 páginas: nenhum erro de JavaScript ou de console, e os redirecionamentos estão de acordo com as rotas permitidas.
- Capturas conferidas: ficha (Consultas, Jornada e Relatório, também no mobile), mensagens (equipe, leitura, paciente, mobile), consulta (médica, secretária, paciente) e dashboard da secretária.

### Limitações que continuam
- Os dados são fictícios e locais (`localStorage`). Não há sincronização com o app Flutter.
- No Flutter, a secretária que abre uma paciente vê só a aba Jornada. No protótipo ela continua indo para o cadastro administrativo (`patient-registration`) e para a jornada (`journey`).
- Agenda, financeiro, diário, bioimpedância, score, risco CV, medicamentos, arquivos, conteúdos e configurações foram revisados quanto a menus, rotas e permissões por perfil. Ainda não foi feita a comparação tela a tela do conteúdo interno desses módulos com o Flutter (gráficos, campos, textos), que fica como próxima etapa.
- Os ícones da Timeline usam um glifo que não aparece em alguns navegadores. Esse problema já existia antes desta atualização.
