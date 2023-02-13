O Projeto Final de Módulo 5 da Resilia consiste no desenvolvimento de uma API para um site de Filmes, onde o objetivo é salvar seus filmes em sua conta. Nesse processo é obrigatório:
- Padrão MVC
- Implementação de operações de CRUD
- Utilização de banco de dados SQL

## Tecnologias utilizadas :computer:
- HTML
- CSS
- NodeJS
- JavaScript
- MySQL2

## Dependências necessárias  
 As dependências para a execução da aplicação estão listadas [aqui](https://github.com/Marlon-Dantas/projeto-grupo-mod5/filmesApi/package.json)
 
 Para instalação, é necessário rodar no terminal o seguinte comando para cada: ``` npm install nomeDaDependencia ```

 ```
 "dependencies": {
    "bcryptjs": "^2.4.3",
    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.6",
    "cookie-session": "^2.0.0",
    "express": "^4.18.1",
    "express-flash": "^0.0.2",
    "express-handlebars": "^6.0.6",
    "express-session": "^1.17.3",
    "mysql2": "^2.3.3",
    "nodemon": "^2.0.20",
    "sequelize": "^6.23.2",
    "session-file-store": "^1.5.0"
    "file-system": "^2.2.2"
  } 
  ```


## Inicialização da aplicação via terminal 

Antes de tudo é necessário criar uma base de dados chamada "films" no terminal do shell pelo seguinte comando:

```
mysql -u root

create database films;
```

Para iniciar a aplicação, é necessário rodar no terminal o seguinte comando:
```
npm start
```
Ao rodar o comando, a mensagem abaixo deverá aparecer:
"Logado com sucesso!"

## Rotas configuradas neste projeto 

**Rotas da FilmesAPI**

Indicada por cada entidade:
```
"/Login"
"/Register"
"/sobre"
"/add"
"/wishlist"
"/"
```

**IDEALIZADORES:**
[Marlon Dantas](https://github.com/Marlon-Dantas)
[Thierry]()
