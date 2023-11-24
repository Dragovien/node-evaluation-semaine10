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

  const { firstname, lastname, email, password } = req.body

  if (firstname === '' ||
    lastname === '' ||
    email === '' ||
    password === ''
  ) {
    console.log('empty')
    // res.redirect('/')
    res.render('user/register', { emptyField: true, title: 'Register' })
    return
  }

  let safeFirstName = escapeOutput(firstname)
  let safeLastName = escapeOutput(lastname)
  let safeEmail = escapeOutput(email)
  let safePassword = escapeOutput(password)

  let emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

  if(emailRegExp.test(safeEmail) === false) {
    console.log('incorrect email format')
    // res.redirect('/')
    res.render('user/register', {incorrectEmail: true, title: 'Register' })
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