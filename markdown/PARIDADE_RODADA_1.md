# Atualização do protótipo — rodada de paridade

## Aplicado nesta rodada
- Folha de estilos compartilhada `css/parity-overrides.css`, carregada nas páginas HTML, com ajustes de responsividade, largura mínima, rolagem horizontal de tabelas/gráficos, foco acessível e comportamento de modais em telas pequenas.
- Dashboard: seletor de protocolo compartilhado entre os cards e o gráfico/legenda de pacientes por protocolo.
- Dashboard: navegação entre semanas anteriores (com limite de 52 semanas) e exibição de segunda a domingo com nomes completos dos dias.
- Dashboard: gráfico semanal passa a usar as consultas demonstrativas da semana escolhida; a semana futura fica desabilitada para não sugerir dados que não existem.

## Validação técnica desta rodada
- Verificação sintática dos scripts inline das páginas HTML com Node.js: sem erros de sintaxe.
- Esta verificação não substitui testes visuais completos em navegador nem testes funcionais de todos os perfis.

## Ainda pendente da lista de alterações
A lista fornecida tem dezenas de mudanças específicas por tela. Esta rodada é uma primeira fatia e não deve ser interpretada como conclusão de todos os pedidos. Próximas prioridades recomendadas:
1. Login conforme a imagem de referência e revisão visual de todos os tamanhos de tela.
2. Dashboard: sanfona/rolagem dos cards de protocolo, filtros completos e validação do gráfico.
3. Pacientes: cadastro/edição, máscaras CPF/telefone, objetivos/tags pesquisáveis e cards padronizados.
4. Agenda/consultas: edição, remarcação, cancelamento, não comparecimento, tipos configuráveis e exames.
5. Ficha: timeline, painel clínico, bioimpedância, score, risco, medicamentos, arquivos, diário e gráficos.
6. Conteúdos, financeiro e configurações, respeitando as permissões por cargo.
7. Revisão final mobile, tablet, desktop e telas grandes.

## Limitações conhecidas
- O protótipo segue em HTML/CSS/JavaScript com dados locais demonstrativos. Não é uma conversão automática do Flutter e não sincroniza os dados com a aplicação principal.
- Recursos clínicos como calculadoras/indicadores devem ser tratados como interface demonstrativa até validação clínica e integração apropriada.
