async function signIn(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (password == '1234') {
                resolve({
                    token: 'alsundmfaxlnsdkhfgsaku-token'
                })
            } else {
                reject(new Error('Email ou Senha incorreta'))
            }
        }, 500)
    })
}

async function recoverUserInfo(token) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (token == 'alsundmfaxlnsdkhfgsaku-token') {
                resolve({
                    name: 'Ruan Azeredo',
                    email: 'ruanazeredo@gmail.com',
                    photo: 'Ruan-Azeredo.png'
                })
            } else {
                reject(new Error('Token não encontrado'))
            }
        }, 500)
    })
}

export const authService = { signIn, recoverUserInfo }