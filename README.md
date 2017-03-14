# Demo Web Padrão do Time de Soluções
Uma demo simples em Angular para mostrar aos nossos clientes algumas das possibilidades recorrentes de uso do Pagar.me.

##Para você que nunca mexeu com Git

####Clone o repositório em uma pasta do seu PC mais adequada
git clone git@github.com:pagarme/solutions-demos.git

####Configure seu usuário e seu email (os que estão na conta do GitHub)
git config --global user.name "SEU NOME"

git config --global user.email "SEU EMAIL"

####Inicie o repositório e adicione suas mudanças
git init

git add .

####Dê commit nas mudanças
git commit -m "Sua mensagem"

####Para acesso via HTML (tem que digitar usuário e senha toda vez que for subir as mudanças)
git remote add origin https://github.com/pagarme/demo-web-padrao-solutions.git
####Para acesso via SSH (não precisa de usuário e senha toda vez, mas use um dos dois apenas, ou HTML ou SSH). Para criar uma chave SSH siga os passos dessas páginas aqui https://help.github.com/articles/generating-an-ssh-key/
git remote add origin git@github.com:pagarme/demo-web-padrao-solutions.git

####Suba as mudanças
git push origin master
