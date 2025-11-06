# Produtividade06-10

# Página de Cadastro (Nome, Email, Senha)

Arquivos criados:
- `index.html` — formulário de cadastro com validação no cliente.
- `css/styles.css` — estilos básicos e responsivos.
- `js/app.js` — validação adicional, toggle de senha e simulação de envio.

Como testar localmente (Windows PowerShell):
1. Abra o diretório do projeto:

   cd "c:\Users\lorrany_eloisa\Documents\prod06-11"

2. Abra `index.html` no navegador (comando opcional):

   start .\index.html

Observações e próximos passos:
- Atualmente o envio é simulado (setTimeout). Para integrar a um backend real, substitua a parte do `setTimeout` por um `fetch('/sua-rota', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })` e trate as respostas.
- Posso adicionar um backend exemplo em Node/Express + persistência (SQLite ou MongoDB) se quiser.
- Posso também incluir checagem de força de senha, confirmação de senha, orquestração de mensagens de erro internacionalizadas, ou testes automatizados.

Atualizações recentes:
- Confirmação de senha adicionada (`passwordConfirm`).
- Medidor de força de senha em tempo real (`pwdStrength`) com rótulos: Muito fraca / Fraca / Média / Boa / Forte.
- Validação no cliente que impede submissão quando as senhas não coincidem.

Se quiser que eu implemente a integração com backend (Node/Express) ou características extras, diga qual opção prefere.
