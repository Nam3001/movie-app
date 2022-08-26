import * as yup from 'yup'

const validationSchema = yup.object().shape({
    fullName: yup
        .string()
        .test(
            'two-word',
            'Tên phải có hai chữ trở lên.',
            (value) => value.split(' ').length >= 2
        )
        .required('Vui lòng điền tên của bạn.'),
    email: yup
        .string()
        .email('Email không hợp lệ.')
        .required('Vui lòng điển email của bạn.'),
    password: yup
        .string()
        .test(
            'must-have-number',
            'Mật khẩu phải chứa số và chữ cái.',
            (value) =>
                value.split('').some((v) => !isNaN(parseInt(v))) &&
                value.split('').some((v) => isNaN(parseInt(v)))
        )
        .required('Vui lòng điền mật khẩu của bạn.'),
    passwordAgain: yup
        .string()
        .test(
            'must-have-number',
            'Mật khẩu phải chứa số và chữ cái.',
            (value) =>
                value.split('').some((v) => !isNaN(parseInt(v))) &&
                value.split('').some((v) => isNaN(parseInt(v)))
        )
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp.')
        .required('Vui lòng nhập lại mật khẩu.')
})

export default validationSchema