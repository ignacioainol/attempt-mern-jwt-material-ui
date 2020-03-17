const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user model
const User = require('../models/User');

router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    //simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Ingresa todos los campos" });
    }

    //check si user existe
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "El usuario ya existe" });

            const newUser = new User({
                name,
                email,
                password
            });

            //crear un salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
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

        })
})

module.exports = router;