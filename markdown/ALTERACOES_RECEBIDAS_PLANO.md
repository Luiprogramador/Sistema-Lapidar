# Plano de implementação das alterações recebidas

Esta rodada aplica correções funcionais na biblioteca de Conteúdos, priorizada porque os fluxos de adicionar/editar/filtrar estavam quebrados.

## Aplicado nesta rodada
- Conteúdos: edição de materiais cadastrados, preservando tipo, descrição, tags, duração e link.
- Conteúdos: controle de permissão continua restrito a médica administradora via `Router.can('manageContent')`.
- Conteúdos: botão Tags agora recolhe/expande a lista de tags de verdade.
- Conteúdos: área de tags dos cards tem limite de altura e rolagem para não estourar o card.
- Conteúdos: “Tudo” mantém a biblioteca completa; “Ver tudo” em cada prateleira abre somente o tipo selecionado.
- Verificação: sintaxe JavaScript validada com `node --check`.

## Próximas etapas recomendadas
1. Agenda/consultas: pesquisar paciente, corrigir formulário/modal, editar/remarcar/cancelar/não compareceu e estados da consulta.
2. Dashboard: protocolos recolhíveis e filtráveis, gráfico por protocolo, semana anterior, remover resumo financeiro de secretária.
3. Pacientes e ficha: cadastro alinhado, tags pesquisáveis/recolhíveis, metas múltiplas, timeline navegável, bioimpedância, medicamentos e risco cardiovascular.
4. Configurações: abas por perfil, catálogos editáveis (tags, protocolos, objetivos, origem de lead e tipos), perfil/foto/logo e preferências.
5. Consultas clínicas: checklist/templates, exames/análises/anexos e edição segura de registros.
6. Financeiro, arquivos, jornada e gráficos do diário: corrigir fluxos, filtros, padronização e acessibilidade.
7. Validação visual e funcional de cada perfil (médica administradora, médica, secretária administradora, secretária e paciente).

As etapas acima não são declaradas como concluídas nesta versão. Recursos que dependem de banco de dados, autenticação Google, uploads persistentes ou calculadoras clínicas externas precisam de integração própria; o protótipo HTML usa armazenamento local e dados simulados.
