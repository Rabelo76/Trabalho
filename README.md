# Delegacia Virtual

Projeto escolar de uma plataforma web para cadastrar, consultar e acompanhar boletins de ocorrência (B.Os).

## Objetivo

Organizar o fluxo entre cidadãos e policiais em uma interface simples. O usuário cria uma conta, registra ocorrências e acompanha seus próprios B.Os. O policial consulta todos os registros, adiciona um comentário e atualiza o status para **Em Andamento** ou **Resolvido**.

## Tecnologias

- HTML5 para a estrutura e semântica das páginas.
- CSS3 para layout, identidade visual e responsividade.
- JavaScript puro para validações, navegação e integração com a API.
- JSON Server e `db.json` como banco de dados local do projeto.
- VLibras para tradução de conteúdo para Libras.

## Como executar

1. Abra um terminal na pasta do projeto.
2. Inicie a API local:

   ```bash
   npx json-server --watch db.json
   ```

3. Abra o arquivo `index.html` no navegador.

O site espera que a API esteja disponível em `http://localhost:3000`.

## Páginas e fluxos

| Perfil | Página inicial após login | Ações disponíveis |
| --- | --- | --- |
| Usuário | `pages/home-usuario.html` | Criar B.O., visualizar seus B.Os e consultar perfil. |
| Policial (`papel: "admin"`) | `pages/home-policial.html` | Visualizar todos os B.Os e os usuários cadastrados. |

O login guarda o ID e CPF da sessão no navegador. O perfil é consultado pelo ID, e cada novo B.O. recebe o campo `cpf_usuario`; assim, a página “Meus B.Os” mostra somente os registros associados ao usuário logado.

## CRUD implementado

- **Create:** cadastro de usuário e criação de B.O.
- **Read:** listagem de usuários, todos os B.Os, B.Os do usuário e perfil.
- **Update:** policial altera `comentario_policial` e `processo_bo` do B.O.
- **Delete:** ainda não implementado.

## Decisões de design e UX

- A paleta de cinza escuro, branco e verde-azulado cria aparência institucional e mantém boa separação entre conteúdo e ações.
- A fonte Roboto foi escolhida pela leitura simples em formulários e tabelas.
- O escudo da PMESP reforça o tema do projeto.
- As duas homes separam as ações por perfil, reduzindo opções desnecessárias para cada público.
- Mensagens de erro e sucesso são exibidas na página, evitando alertas que interrompem a navegação.

## Acessibilidade e SEO

- Páginas em português brasileiro (`lang="pt-BR"`), títulos descritivos e `meta description`.
- Uso de `header`, `main`, `footer`, `nav`, títulos hierárquicos e textos alternativos nas imagens.
- Labels para login/cadastro, validação nativa com `required` e mensagens dinâmicas com `aria-live`.
- Modal policial identificado como diálogo por ARIA.
- Integração do VLibras em todas as páginas, para tradução de conteúdo em Libras.

## Problemas encontrados e soluções

- O formulário de ocorrência carregava um caminho de script incorreto; foi ajustado para `../scripts/ocorrencia.js`.
- O cadastro enviava o cabeçalho `application/json` com erro de escrita; o valor foi corrigido.
- O login não distinguia usuário de policial; a verificação do campo `papel` passou a direcionar cada perfil à sua Home.
- Alguns fluxos usavam `alert()`; foram substituídos por mensagens exibidas no conteúdo da página.

## Limitações do protótipo

Este é um projeto escolar com JSON Server local. As senhas não possuem criptografia e o controle de acesso é apenas demonstrativo; uma aplicação real exigiria backend com autenticação e autorização seguras.

## Documentação técnica

Consulte [DOCUMENTACAO_TECNICA.md](DOCUMENTACAO_TECNICA.md) para a descrição das soluções, evidências de código, problemas encontrados, roteiro de capturas de tela e demonstração.
