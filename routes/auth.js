const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

require('dotenv').config();

//user model 
const User = require('../models/User');

router.post('/', (req, res) => {
    const { email, password } = req.body;

    //validacion
    if (!email || !password) {
        return res.status(400).json({ msg: "Ingrese todos los campos" });
    }

    //check si usuario existe
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "El usuario no existe" });

            //validar password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Credenciales invalidas" });

                    jwt.sign(
                        { id: user.id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
})

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router;