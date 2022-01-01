const loginController = async(req,res) => { 
        res.render('login')    
}

const inicioController = async(req,res) => {
    res.render('index', { user: req.user })
}

const failLoginController = async(req,res) => {
    res.render('login-error')
}

const logoutController = async(req, res) => {
    res.render('adios', { user: req.user }) 
     req.logout();
}


module.exports = {
    login: loginController,   
    inicio: inicioController,
    failLogin: failLoginController,
    logout: logoutController
  };