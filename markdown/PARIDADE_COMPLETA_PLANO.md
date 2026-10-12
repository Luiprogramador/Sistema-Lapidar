# Atualização geral do protótipo Lapidar — pacote de paridade

## Implementado neste pacote
- Mantida a estrutura HTML/CSS/JS do protótipo, sem substituir os arquivos pela aplicação Flutter.
- Refinamento global de responsividade, contraste/foco, rolagem lateral de abas, tabelas e legendas, dimensões de modais, cards e suporte a movimento reduzido.
- Máscaras automáticas nos campos identificados como CPF e telefone; entrada de peso favorece vírgula decimal.
- Melhorias de acessibilidade: foco visível, rótulos derivados de placeholders quando ausentes e rótulos acessíveis para botões/links que já possuem título.
- Preservadas as melhorias já existentes no dashboard, ficha da paciente, mensagens, consulta e permissões documentadas em `AUDITORIA_E_PLANO.md`.

## Itens da lista de alterações
A lista original tem muitas mudanças específicas, incluindo fluxos clínicos, formulários, gráficos, configurações e a reprodução pixel a pixel da referência do login. Não é tecnicamente correto afirmar que todas foram concluídas apenas com os ajustes globais. As telas e fluxos específicos devem ser validados e completados em rodadas funcionais, usando a interface Flutter como fonte de verdade.

## Limitações importantes
- O protótipo continua usando dados locais demonstrativos; não sincroniza com o app Flutter nem substitui autenticação/autorização real.
- Máscaras e recursos de interface não validam dados clínicos nem implementam regras clínicas.
- A aplicação Flutter contém fluxos e componentes que precisam de portabilidade manual para HTML/JS; copiar o visual não garante paridade funcional.

## Verificações executadas
- Todos os HTML das páginas incluem a folha de estilos compartilhada e o script de refinamentos.
- Scripts JavaScript são verificados separadamente no teste de pacote; ainda é necessário teste visual manual em navegador para cada fluxo e perfil.
