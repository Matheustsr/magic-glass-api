# MAGIC-GLASS (API)

1. Baixar o projeto: `git clone git@github.com:Matheustsr/magic-glass-api.git`
2. Rodar `nvm install 16`
3. Rodar `nvm use 16`
4. Rodar `npm i -g nodemon`
5. Renomear o arquivo `.env.example` para `.env`<br>
	5.1 toda a conexão com o banco deve ser colocada neste arquivo<br>
	5.2 Utilizei uma instancia do postgres no Heroku para o desenvolvimento. Caso precisem das credenciais para evitar este esforço basta me procurar<br>
6. Rodar o comando `yarn install` na raiz do projeto
7. Rodar o comando `yarn start:dev` na raiz do projeto
8. Rode todas as migrations.

Este é o link para a documentação da API: https://documenter.getpostman.com/view/15986286/UVsHUTMD
Este é o link para a collection no postman: https://www.getpostman.com/collections/7338bd2a8dd535d86168

Algumas permissões presentes:

Usuários do tipo `COMPANY_DIRECTOR` tem acesso completo ao sistema e pode executar todas as rotas.<br>
Apenas usuarios do tipo `MANAGER` e `COMPANY_DIRECTOR` podem criar novos usuários.<br>
Apenas usuarios do tipo `COMPANY_DIRECTOR` podem criar novos departamento.<br>
Apenas usuarios do tipo `COMPANY_DIRECTOR` podem criar novas empresas.<br>
Apenas usuarios do tipo `MANAGER` e `COMPANY_DIRECTOR` podem vincular o usuário do tipo EMPLOYEE a um setor.<br>
Apenas usuarios do tipo `MANAGER` e `COMPANY_DIRECTOR` podem vincular o usuário do tipo EMPLOYEE a uma empresa.<br>
Apenas usuarios do tipo `COMPANY_DIRECTOR` podem apagar um gestor.<br>
Apenas usuarios do tipo `COMPANY_DIRECTOR` podem apagar um setor.<br>
Apenas usuarios do tipo  `COMPANY_DIRECTOR` podem apagar uma empresa.<br>
Usuários do tipo `EMPLOYEE` só podem visualizar as empresas que ele mesmo faz parte.<br>
Usuários do tipo `MANAGER` são responsáveis por um departamento.<br>
Usuários do tipo `EMPLOYEE` podem fazer parte de um setor.<br>
Apenas usuarios do tipo `COMPANY_DIRECTOR` podem vincular um gestor a um departamento.<br>
Apenas usuarios do tipo `COMPANY_DIRECTOR` podem deletar um gestor.<br>
