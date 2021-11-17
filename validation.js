const emailValidation = (email) => {
    const result = /\w+d*@{1}\w+.{1}\w+/g.test(email)
    return result
} 

const nameValidation = (name) => {
    const result = /\d+-*/g.test(name)
    return result
}

module.exports = {
    emailVal: emailValidation,
    nameVal: nameValidation
};