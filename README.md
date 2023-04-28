# Fluxo de autenticação com Next.js
O fluxo de autenticação desenvolvido neste projet, leva em consideração o padrão JWT (https://jwt.io/), e deve funcionar atravez da seguinte logica: O usuario raliza seu login, adicionando suas credenciais, neste caso são e-mail e senha, e o sistema, atravez da conexão com a API espera receber um **Toeken**, este token é importante por que ele é a chave, que ficará "guardada" no navegador e no sistema enquando o usuario estiver logado, e deve ser utilizada para fazer a requisição de outras chamadas dá API, desta forma, garantindo que apenas as chamadas das rotas da API, juntamente com o token de auutenticação possam ter acesso a dados sensiveis do usuario.
</br>
O segundo passo para a autenticação é garantir que enquanto o usuario estiver logado no sistema, ele deve ter acesso as rotas privadas, que neste projeto são as que estão no sistema. Caso constrario, ele deve ser redirecionado a página de login.

## Dependencias
Para react, o o tailwind UI pede a instalação das seguintes dependencias:
```bash
npm install @headlessui/react @heroicons/react
```