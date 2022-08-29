import * as yup from 'yup'

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email không hợp lệ.')
        .required('Vui lòng điển email của bạn.'),
    password: yup
        .string()
        .min(6, 'Mật khẩu ít nhất phải chứa 6 kí tự')
        .test(
            'must-have-number',
            'Mật khẩu phải chứa số và chữ cái.',
            (value) =>
                value.split('').some((v) => !isNaN(parseInt(v))) &&
                value.split('').some((v) => isNaN(parseInt(v)))
        )
        .required('Vui lòng điền mật khẩu của bạn.')
})

export default validationSchema
