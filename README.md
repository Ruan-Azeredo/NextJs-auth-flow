# Fluxo de autenticação com Next.js
O fluxo de autenticação desenvolvido neste projet, leva em consideração o padrão JWT (https://jwt.io/), e deve funcionar atravez da seguinte logica: O usuario raliza seu login, adicionando suas credenciais, neste caso são e-mail e senha, e o sistema, atravez da conexão com a API espera receber um **Toeken**, este token é importante por que ele é a chave, que ficará "guardada" no navegador e no sistema enquando o usuario estiver logado, e deve ser utilizada para fazer a requisição de outras chamadas dá API, desta forma, garantindo que apenas as chamadas das rotas da API, juntamente com o token de auutenticação possam ter acesso a dados sensiveis do usuario.
</br>
O segundo passo para a autenticação é garantir que enquanto o usuario estiver logado no sistema, ele deve ter acesso as rotas privadas, que neste projeto são as que estão no sistema. Caso constrario, ele deve ser redirecionado a página de login.

- Este projeto contem o arquivo **AuthService.js** que simula uma API, onde ele é referenciado, é um lugar onde deveria ser feita uma chamda ao Back-end.

## Dependencias
Para react, o o tailwind UI pede a instalação das seguintes dependencias:
-| https://tailwindui.com/documentation
```bash
npm install @headlessui/react @heroicons/react
```

Nookies para gerenciamento de cookies
- | https://github.com/maticzav/nookies#readme
```bash
npm i nookies
```

## Arquitetura
### /context/Auth.jsx
Neste arquivo, fica o Context de autenticação, que retorna as seguintes funções de maneira global para a aplicação:
#### signIn()
```JavaScript
async function signIn(email, password) {

    try {
        const auth = // chamada da API, { Token }
        const token = auth.token

        if (auth) {
            setCookie(null, 'auth-cookie-test', token, {
                maxAge: 60 * 60 * 24 * 30 * 3, // 3 meses
                path: '/'
            })

            router.push('/sistema/dashboard')
        }
    } catch (error) {
        setError(error)
    }
}
```
A função de signIn() recebe o email e a senha, que espera-se serem atribuidos na sua chamada na tela de *Login*, primeiramente a função irá chamar a API, para pegar o token JWT, que deve ser utilizado em outras chamadas da API, alem de ficar guardado nos cookies do navegador.
</br>
Sendo assim, caso a API identifique de maneira correta o email e senha do usuario, e retorne o token, este deve ser setado como cookie(que é o proposito da função setCookie()). Caso, o email e senha não correspondam a um cookie, a API retornará uma mensagem de *error*, que neste caso é setada no context para poder ser exibida ao usuario atravez de um alerta.
</br>
É importante ressaltar que está função tem o objetivo de apenas pegar o token, as informações do usuario são captadas por outra função que deve utilizar o token como chave de acesso.
</br>
Por fim, caso o token seja pego, deve redirecionar o usuario para uma rota protegida de dentro do sistema.

#### verifyToken()
```JavaScript
async function verifyToken(token) {
        
    await InfosDoUsuario(token)
    .then(resp => setAuthData(resp))
}
```
Está função basicamente é chamada quando o usuario entra na página protegida do sistema. Neste momento, a função vai verificar ser o usuario está logado, pegando o token da página, e o utilizando em uma chamada para **pegar as infos do usuario**. Caso pegue com sucesso essas informações, deve-se seta-las no *authData* que está global no context.

#### signOut()
```JavaScript
function signOut() {

    destroyCookie(null, 'auth-cookie-test', {
        path:'/'
    })
    setAuthData(undefined)
    router.push('/autenticacao/login')
}
```
Está função é chamada quando o usuario clica no botão *Sign Out*, dentro do sistema,  ela é responsavel por apagar o cookie no navegador, e setar as infos do usuario como undefined. Depois disso, qualquer *reload* deve enviar o usuario, que agora não está mais autenticado, para a página de login.

#### return()

A as respectivas variaveis e funções passadas como *value*, as quais o sistema todo terá acesso são:
```JavaScript
return (
    <AuthContext.Provider value={{authData, error, signIn, signOut, verifyToken}}>
        {children}
    </AuthContext.Provider>
)
```

- Vale ressaltar, que como todo context, deve-se envolver toda a aplicação com o Provider, neste caso, **<AuthProvider>**

### /sistema/layout.jsx
Este arquivo possui o componente *sistemaLayout()* que envolve todas as rotas que deve estar privadas na aplicação. Desta forma, dentro desta função, a cada atualização da página(useEffect), deve-se verificar se o token do usuario existe.
```JavaScript
    const { ['auth-cookie-test']: token } = nookies.get()
```
Caso exista, ele deve trazer os dados deste usuario, o que é feito atravez da função **verifyToken**, caso não exista, redirecionar para página de login.
```JavaScript
if (!token) {
    router.push('/autenticacao/login')
} else{
    verifyToken(token)    
}
```
Toda a lógica:
```JavaScript
const { verifyToken } = useContext(AuthContext)

const router = useRouter()

useEffect(() => {
    const { ['auth-cookie-test']: token } = nookies.get()

    if (!token) {
        router.push('/autenticacao/login')
    } else{
        verifyToken(token)    
    }
}, [])
```
### /autenticacao/layout.jsx
Este layout não é tão imprecindivel para a lógica de autenticação. Porem é util, por conta que bloqueia o usuario de acessar a rota de cadastro de novo usuario ou de login caso exista um token existente no navegador. Esta lógica visa tratar a possibilidade de um usuario logar em outra conta estando com uma conta já logada.
</br>
Para tal, toda vez que a rota for carregada(useEffext), confere-se se existe o cookie de token da aplicação. Caso exista o usuario será redirecionado para dentro do sistema.

```JavaScript
const router = useRouter()

useEffect(() => {
    const { ['auth-cookie-test']: token } = nookies.get()

    if (token) {
        router.push('/sistema/dashboard')
    }
}, [])
```