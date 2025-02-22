# servidor-otimizacao

## Requisitos
+ Usuário deve ser capaz de se registrar com email e senha;
+ Usuário deve ser capaz de se logar no servidor com email e senha;
+ Login do usuário deve durar por um período de tempo (1h), então exigir que o usuário faça login de novo;
+ Usuário deve ser capaz de submeter questões seguindo um determinado formato;
+ Usuário deve receber uma resposta associada a cada questão submetida;
+ Usuário deve ser capaz de acessar seu histórico de questões;
+ Usuário deve ser capaz de deletar uma questão de seu histórico;
+ Uma questão tem um enunciado submetido pelo usuário e uma resposta associada;

## Como rodar:
#### Inicializar node via fnm no Windows (opcional)
Clique duas vezes em start_node.bat ou rode o seguinte comando no Powershell, certificando-se de que está na pasta do projeto:

```
.\start_node.bat
```

#### Instalar dependências
+ bcrypt
+ nodemailer
+ jsonwebtoken

#### Configurar jwt
Rode o seguinte comando no terminal, então copie-o e cole-o na variável de ambiente JWT_SECRET:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Configurar .env
Ver .env_example.txt

#### Rodar servidor

```
npm run dev
```
