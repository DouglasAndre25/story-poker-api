module.exports = {
    general: {
        required: 'Campo Obrigatório',
        invalidType: 'Campo com o tipo inválido',
        emailFormatInvalid: 'Email está com formato inválido'
    },
    user: {
        errors: {
            passwordsToBeEqual: 'Senha e confirmação de senha devem ser iguais',
            userAlreadyExists: 'Email já está em uso'
        }
    },
    login: {
        errors: {
            accountNotFound: 'Nenhuma conta cadastrada com o email informado',
            passwordNotMatch: 'As senhas não coincidem'
        }
    }
}
