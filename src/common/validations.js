const yup = require('yup')
const { participantTypes, roomTypes } = require('./constants')
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

const participantValidation = yup.object({
    nickname: yup.string(messages.general.invalidType)
        .required(messages.general.required),
    type: yup.mixed().oneOf(participantTypes)
        .required(messages.general.required),
    user_id: yup.number(messages.general.invalidType),
    room_id: yup.number(messages.general.invalidType)
        .required(messages.general.required)
})

const roomValidation = yup.object({
    name: yup.string(messages.general.invalidType)
        .required(messages.general.required),
    type: yup.mixed().required(messages.general.required).oneOf(roomTypes),
    owner_id: yup.number(messages.general.invalidType)
        .required(messages.general.required),
})

module.exports = {
    userValidation,
    loginValidation,
    participantValidation,
    roomValidation
}
