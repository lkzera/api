const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const result = jwt.verify(token,process.env.JWT);
        req.usuario = result;
        next();
    } catch (error) {
        return res.status(401).send({
            Response: [],
            Message: 'Falha na autenticação',
            Sucess: false
        });
    }
}