export const registerMiddleware = (req, res, next) => {

  const { firstname, lastname, email, password } = req.body

  if (firstname === '' ||
    lastname === '' ||
    email === '' ||
    password === ''
  ) {
    console.log('empty field')
    res.redirect('/')
    res.render('user/register', { emptyField: true, title: 'Register' })
    return
  }

  let NamesRegExp = new RegExp(
    /^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]+([-' ]?[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœA-Z]){1,30}$/,
    "i"
  );

  // escape characters
  if (
    NamesRegExp.test(firstname) === false ||
    NamesRegExp.test(lastname) === false ||
    NamesRegExp.test(email) === false ||
    NamesRegExp.test(password) === false
  ) {
    console.log('special characters')
    res.redirect('/')
    res.render('user/register', { title: 'Register' })
    return
  }
  let emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

  console.log(emailRegExp.test(email) === false)

  if(emailRegExp.test(email) === false) {
    console.log('incorrect email format')
    res.redirect('/')
    res.render('user/register', {incorrectEmail: true, title: 'Register' })
    return
  }


}