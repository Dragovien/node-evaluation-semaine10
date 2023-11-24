// import userModel from '../model/users.js'

const onError = (res) => {
    return (err) => {
        console.log('Something broke with DB:')
        console.log(err.message)
        res.status(501).json({message: err.message})
    }
}


export const home = (req,res) => {
    res.render('user/home', {title: 'Home'})
    return
}

export const login = (req,res) => {
    res.render('user/login', {title: "Login"})
    return
}

export const dashboard = (req,res) => {
    res.render('user/dashboard', {title: "Dashboard"})
    return
}

// export const show = (req,res) => {
//     const {name} = req.params
//     productModel.findOne({ society : name }).then(prod => {
//         res.render('shop/show', {prod})
//     }).catch(onError(res))
// }
