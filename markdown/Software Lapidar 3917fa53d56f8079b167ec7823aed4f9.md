# Software Lapidar

---

# Referencias

[Diario_Lapidar_Briefing_Desenvolvimento.pdf](Diario_Lapidar_Briefing_Desenvolvimento.pdf)

- calculadora de risco cardiovascular (prevent) ([https://professional.heart.org/en/guidelines-and-statements/prevent-calculator?utm_source=chatgpt.com](https://professional.heart.org/en/guidelines-and-statements/prevent-calculator?utm_source=chatgpt.com))

## TODO:

- local habitos de vida (check diario)
    - alimentação:
        - fibras, proteinas e hidratação
    - atv fisica:
        - cardio, musculação
    - horas sono/dormir (hora que foi e duração)
    - comemoração por meta (individual)
- Risco cv dados faltantes.

---

# Arquitetura

[arquitetura-dominio-lapidar.md](arquitetura-dominio-lapidar.md)

[arquitetura-dominio-lapidar](https://app.notion.com/p/arquitetura-dominio-lapidar-3997fa53d56f80f98ededa74050d6492?pvs=21) 

![diagrama_logico_lapidar.png](diagrama_logico_lapidar.png)

---

# Logo

1. Logo 1 (texto e transparente)

![logo_escrita_tp.png](logo_escrita_tp.png)

1. Logo 2 (texto)

![logo_escrita.png](logo_escrita.png)

1. Logo 3 (simbolo)

![logo_lapidar.png](logo_lapidar.png)

1. Logo 4 (simbolo e transparente)

![logo_lapidar_tp.png](logo_lapidar_tp.png)

---

# ESTILO VISUAL

- Identidade visual:
    - vinho (#5B2333)
    - bege (#F4EFE7)
    - dourado discreto (#C6A15B)
    - verde oliva (#66724A)
- Fontes:
    - Playfair display
    - Montserrat

## Design / estilo:

![mudado chat (1).png](mudado_chat_(1).png)

---

# Páginas

### Base

- Nav fixo para facilitar navegação
- notificações, mensagens, configurações e perfil de facil acesso e intuitivo no nav.
- telas:
    - todos:
        - Conteudos
        - perfil
        - configurações
    - medica:
        - Dashboard
        - pacientes
        - agenda
        - consultas
        - financeiro
    - paciente:
        - minha ficha
        - minhas consultas
    - secretaria:
        - Dashboard
        - pacientes
        - agenda
        - financeiro

---

## Login

*A tela de login é a primeira e que todos veem, deve apresentar o “**Lapidar**”, mostrar o diferencial de forma elegante e disponibilizar uma área de login.*

### Componentes:

- Lado esilo:
    - Logo 1 (Texto e transparente)
    - Texto (ainda n informado pela cliente)
    - Dra. Andressa Gomide - crm xxxxx (alterado para ter crm, ainda não informado)
- Lado login:
    - Email
    - Senha
    - Esqueci minha senha
    - Entrar
    - Entrar com o Google

![login_modelo_chat.jpeg](login_modelo_chat.jpeg)

*modelo feito pela cliente no gpt.*

*Texto para mobile abaixo.*

![1000167645.jpg](1000167645.jpg)

---

## DASHBOARD

*A tela de dashboard será apenas para a médica e sua secretaria, tem o proposito de controle e gerenciamento.*

### Componentes:

- Número de pacientes
- Pacientes ativas
- Pacientes por protocolo
    - Lapidar 40+
    - Lapidar SOP
    - Lapidar Fertilidade
    - Pocket
    - …
- Consultas da semana
- Próximos contatos de terça-feira (médica faz estilo de consullta semanal as terças)
- Alertas clinicos (permitir filtro):
    - Exames pendentes
    - Bioimpedâncias pendentes
    - Pacientes com LDL acima da meta
    - Pacientes com vitamina D baixa
    - Pacientes sem atividade física
- Gráficos automáticos

---

## Pacientes

*A tela pacientes é para apenas a secretaria e a médica ver a lista de pacientes para gerenciamento, controle e acompanhamento, deve ser possivel filtrar por protocolos e nome. Será uma pagina de conexão portanto não possui conteudo programatico, mas um resumo basico da paciente no card.*

### Componentes:

- Cards por paciente
- Filtros
- Link para pacientes
- Cadastro

### CADASTRO DE PACIENTES

*Uma tela ou popup de cadastro, somente a medica e a secretaria podem adicionar.*

- NOVA PACIENTE
- Dados:
    - *Será validado com a cliente  a necessidade de mais dados no cadastro.*
    - Nome
    - Telefone
    - CPF
    - Data nascimento
    - Objetivo
    - Protocolo
    - Consulta atual
    - Peso inicial
    - Meta
    - TRH
    - Contraceptivo
    - Observações
    - Origem lead (opcional)

*Ao salvar:*

- *Criar automaticamente uma ficha completa da paciente.*

---

### FICHA DA PACIENTE

*Cada paciente terá sua própria ficha, um pequeno resumo breve apenas para a médica e a secretaria.*

#### Componentes:

- Foto opcional.
- Nome.
- Idade calculada e data de nascimento.
- Telefone.
- Objetivo.
- Peso inicial.
- Peso atual.
- Meta (lista).
- Percentual atingido (numero de metas completas pelo total de metas, em %).
- Consulta atual.

*Novo caminho: ao clicar em card em “Pacientes” vai aparecer o respectivo popup da paciente para leitura rapida, em baixo um botão “Abrir ficha” que encaminha para as abas de cada paciente como uma capa da ficha.*

---

### PAINEL CLÍNICO

*Tela responsavel por analise rapida, dados resumidos e importantes a primeira vista para facilitar entendimento rápido da situação. Para todos os cards é recomendavel grafico, sem barra de progresso para ser visualmente mais rapido e direto.*

#### Componentes:

- Peso
- IMC
- Massa gorda
- Massa magra
- Circunferência abdominal
- Pressão
- TRH
- Contraceptivo
- Medicamentos atuais
- Suplementos atuais
- Bioimpedância (arquivo / imagem)
- Última consulta
- Próxima consulta

---

### Bioimpedância

*Tela propria de bioimpedância para destrinchar as informações melhor. Para todos os cards é recomendavel grafico e barra de progresso.*

#### Componentes:

- Data da ultima Bioimpedância
- Peso (com grafico)
- MÚSCULO ESQUELETICO (com grafico)
- MASSA GORDA (com grafico)
- IMC
- TX DE GORDURA CORPORAL (com grafico)
- ÁGUA CORPORAL
- GORDURA VISCERAL (com grafico)
- TAXA METABOLICA BASAL
- NOTA (com grafico)
- Bioimpedância (arquivo / imagem)
- *Nova Bioimpedância*
    - *Popup para inserir esse dados, apenas para a médica*

---

### SCORE LAPIDAR

#### Componentes:

- *Novo Score:*
    - *Apenas para a paciente e de forma diaria adicionar dados.*
- Data do último
- Escala de 0-10.
    - Saciedade
    - Fome
    - Energia
    - Sono
    - Humor
    - Libido
    - Fogachos
    - Perda urinária
    - Constipação
    - Atividade física
    - Adesão
- *Graficos para visualizar esses dados separadamente, em grupo e ao longo do tempo, similar aos cards em bioimpedancia, mas diario.*

***Gerar automaticamente gráfico radar mostrando evolução.***

---

### Risco cardiovascular

*Tela responsavel por mostrar o risco e os niveis dele assim como possiveis medidas.*

#### Componentes:

- risco cv ('Baixo', 'Intermediário', 'Alto', 'Muito Alto', 'Extremo')
- ldl
- meta ldl
- não hdl
- meta não hdl
- redução ldl
- sugestões de estrategia
- Fatores de risco
- HAS
- DM
- Tabagismo
- História familiar
- ApoB
- Lp(a)
- PCR-us
- Meta atingida

---

### Medicamentos e Suplementos

*Tela que mostra tudo que a paciente esta tomando, permitindo filtros e servido para tanto a paciente quanto a medica monitorarem.*

#### Componentes:

- Nome
- Tipo:
    - Medicamento
    - Suplemento
    - …
- Dose
- Frequencia
- Data inicio
- Motivo
- Data fim (poder ser vazio)
- Receita (arquivo, pode ser vazio)
- observações

---

### Timeline

*Tela de linha do tempo, deve mostrar tudo que aconteceu a paciente desde que começou, como consultas, exames, progresso, metas batidas,… cada um tem seu icone e estilo.*

#### Componentes:

- Card por evento na linha do tempo
- Dinamico e pegara dados de outras tabelas, como a tabela de eventos.
- dados:
    - Tipo
        - Consulta
        - WhatsApp
        - Ligação
        - Mensagem
    - Data
    - Peso
    - Bioimpedância
    - check diario
    - Mudança de medicamentos e suplementos
    - Exames solicitados
    - Plano até próximo contato

*A Timeline deve ser organizada do mais recente para o mais antigo.*

---

### Arquivos

*Tela para a paciente ver tudo que ela mandou e recebeu de forma compactada para facilitar visualização. Para visualizar e não enviar.*

#### Componentes:

- Cards por arquivo estilo revista
- Filtros por enviado ou recebido e por tipo (receitas, pedidos, exames,…)

---

### Checklist jornadas operacional

*Tela apenas para a medica e secretaria para não esquecerem de nada, fica na aba de pacientes por ser um checklist por paciente onde cada paciente tem o seu.*

[jornada-lapidar.html](jornada-lapidar.html)

*Site referencia feito pela cliente com ia, por estar dentro de paciente n vai ser necessario o filtro de busca.*

#### Componentes:

- Lista de checklists por paciente, separados por blocos e com progresso salvo individualmente.
- Médica acompanha o método completo; secretaria acompanha as tarefas administrativas de contato, agendamento, onboarding e follow-up.

---

## AGENDA

*Tela para organização e visualização de consultas, para a medica e secretaria.*

### Componentes:

- Mostrar consultas.
- Mostrar pacientes que precisam receber mensagem na terça-feira.
- Mostrar pacientes sem resposta há mais de 7 dias.
- calendario e lista para visualização
- Calendario permite filtro por data
- calendario, ao lado uma lista de consultas, ao clicar na consulta vai para sua página.

---

## Minhas consultas

*Tela similar a agenda, mas para o paciente e para ter controle e organização de suas consultas.*

### Componentes:

- Mostrar consultas.
- calendario e lista para visualização
- Calendario permite filtro por data
- calendario, ao lado uma lista de consultas, ao clicar na consulta vai para sua página.

---

## Consultas

*Tela de consulta, cada consulta possui sua pagina, será usada para organizar e fazer consultas e corelacionados.*

- Abas (por consulta):
    - Checklist (medica)
        - *Auxiliar a medica a não esquecer nada.*
    - Exames (ambos)
        - *Pedido e envio, estilo entrega de atividade no espaço aluno.*
    - Anotações (medica)
        - *Anotações da medica e preenchimento dos dados da consulta.*
    - Analises (ambos)
        - Area onde a medica ira passar as informaçõs do que aconteceu na consulta para a paciente de acordo com o que achar necessario.
        - EXAMES:
            - Criar painel apenas com exames importantes para visualizar (templates dinamicos).
                - LDL
                - Meta LDL
                - HDL
                - Triglicerídeos
                - ApoB
                - Lp(a)
                - HbA1c
                - Insulina
                - Glicemia
                - Vitamina D
                - Vitamina B12
                - Ferritina
                - Homocisteína
                - PCR-us
                - TGO
                - TGP
                - Creatinina
                - TSH
                - T4 Livre
                - Estradiol
                - Progesterona
                - Testosterona
                - SHBG
            - Todos com:
                - Meta
                - Valor atual
                - Valor anterior
                - Data
                - Aplicar formatação condicional.
                    - Verde.
                    - Amarelo.
                    - Vermelho.

*Criar gráficos automáticos.*

### Consultas geral

*Na tela geral onde tem todas as consultas dapaciente tbm deve ter uma visibilidade boa e um resumo das consulta, assim como uma area de exames onde mostra esses ultimos exames importantes e o resultado obitido neles.*

---

## FINANCEIRO

*Tela responsavel por mostrar os lucros e despesas da clinica, permite filtro por destino e origem, usuario, tipo, data e por ai vai, para mais informações leia o BD.*

### Componentes:

- Plano
- Valor
- Parcelas
- Pagamentos
- Pendências
- Receita mensal.

---

# RELATÓRIO DA PACIENTE

IMPRIMIR RESUMO

- Gerar PDF contendo:
    - Resumo clínico
    - Peso
    - Gráfico
    - Bioimpedância
    - Exames
    - Medicamentos
    - Suplementos
    - Timeline resumida
    - Plano atual

[arquitetura-dominio-lapidar](https://app.notion.com/p/arquitetura-dominio-lapidar-3997fa53d56f80f98ededa74050d6492?pvs=21)