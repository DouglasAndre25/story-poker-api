const yup = require('yup')
const messages = require('./messages')

const userValidation = yup.object({
    name: yup.string(messages.general.invalidType)
        .required(messages.general.required),
    email: yup.string(messages.general.invalidType)
        .required(messages.general.required)
        .email(messages.general.emailFormatInvalid),
    password: yup.string(messages.general.invalidType)
        .required(messages.general.required),
    confirmPassword: yup.string(messages.general.invalidType)
        .required(messages.general.required)
        .when('password', (password, schema) => {
            return schema.test({
                test: confirmPassword => password === confirmPassword,
                message: messages.user.errors.passwordsToBeEqual
            })
        }),
})

const loginValidation = yup.object({
    email: yup.string(messages.general.invalidType)
        .required(messages.general.required)
        .email(messages.general.emailFormatInvalid),
    password: yup.string(messages.general.invalidType)
        .required(messages.general.required),
})

module.exports = {
    userValidation,
    loginValidation
}
