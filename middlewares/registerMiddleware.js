import CryptoJS from "crypto-js";

function escapeOutput(toOutput){
  return toOutput.replace(/\&/g, '&amp;')
      .replace(/\</g, '&lt;')
      .replace(/\>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
}

export const registerMiddleware = (req, res, next) => {
  const { firstname, lastname, email, password, passwordConfirmation } = req.body

  if (firstname.trim() === '' ||
    lastname.trim() === '' ||
    email.trim() === '' ||
    password.trim() === ''||
    passwordConfirmation.trim() === ''
  ) {
    console.log('empty')
    res.status(400).render('user/register', { emptyField: true, title: 'Register' })
    return
  }

  let safeFirstName = escapeOutput(firstname)
  let safeLastName = escapeOutput(lastname)
  let safeEmail = escapeOutput(email)
  let safePassword = escapeOutput(password)
  let safePasswordConfirm = escapeOutput(passwordConfirmation)

  if(safePassword !== safePasswordConfirm) {
    console.log('password different from confirmation')
    res.status(400).render('user/register', { notConfirmed: true, title: 'Register' })
    return
  }

  let noNumberRegExp = new RegExp(/^[^0-9]*$/)

  if(
    noNumberRegExp.test(safeFirstName) === false ||
    noNumberRegExp.test(safeLastName) === false
  ) {
    console.log('number in name')
    res.status(400).render('user/register', { numbersInName: true, title: 'Register' })
    return
  }

  let emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

  if(emailRegExp.test(safeEmail) === false) {
    console.log('incorrect email format')
    res.status(400).render('user/register', {incorrectEmail: true, title: 'Register' })
    return
  }

  req.newUser = {
    firstName: safeFirstName,
    lastName: safeLastName,
    email: safeEmail,
    password: CryptoJS.SHA256(safePassword).toString()
  }

  next()
}