# Backend

## Como rodar:
#### Inicializar node via fnm no Windows (opcional)
Primeiro, rode o seguinte comando em um terminal Powershell como administrador:

```
Invoke-Item $profile
```

Então, adicione a seguinte linha ao final do seu profile:

```
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

Por fim, feche o terminal, então clique duas vezes em start_node.bat ou rode o seguinte comando em um outro terminal Powershell, certificando-se de que está na pasta do projeto:

```
.\start_node.bat
```

#### Instalar dependências
+ bcrypt
+ nodemailer
+ jsonwebtoken

Para instalar as dependências do node, rode o comando:
```bash
npm install
```

Para instalar as dependências do script Python, rode:
```bash
source venv.sh
```

Ou, caso esteja no Windows:
```powershell
./venv.bat
```

#### Criar jwt secret key
Rode o seguinte comando no terminal, então copie-o e cole-o na variável de ambiente JWT_SECRET:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Configurar .env
Ver .env_example.txt

#### Rodar servidor
```bash
cd src/backend
npm run dev
```
