const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //checkear si tiene token
    if (!token) {
        return res.status(401).json({ msg: "No tienes token de autenticacion" })
    }

    try {
        //verificar token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        //agregar usuario al payload
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ msg: "El token no es valido" });
    }

}

module.exports = auth;