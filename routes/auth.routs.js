const {Router} = require ('express')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const bcrypt  = require('bcryptjs')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 симолов')
            .isLength({min:6})
        
    ], 
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некореектные данные'
            }) 
        }
        
        const {email, password} = req.body
        const candidate  = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message:'Такой юзер уже есть'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user  = new User({email, password:hashedPassword })
        await user.save()

        res.status(201).json({message:'Юзер создан'})

    } catch (error) {
        res.status(500).json({message:'Что то пошло не так'})
    }
})

// /api/auth/login
router.post('/login', (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message:'Что то пошло не так'})
    }
})

module.exports = router