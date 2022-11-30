const yup = require('./yup');


const formSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.required(),
    confirmPassword: yup.required(),
})

export default formSchema