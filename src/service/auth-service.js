const db = require('../../models/index.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { isLabeledStatement } = require('typescript');
dotenv.config();

const hashPassword = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

const register = async ({ name, phone, password }) => new Promise(async (resolve, reject) => {
    console.log('register');
    try {
        const response = await db.User.findOrCreate({
            where: { phone },
            defaults: {
                name,
                phone,
                password: hashPassword(password),
            }
        })
        const token = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone },
            process.env.SECRET_KEY, { expiresIn: '2d' });
        resolve({
            error: token ? 0 : 1,
            message: token ? 'Sign up successfully' : 'Phone numner has already! Please try again',
            token: token || null
        })
    } catch (error) {
        console.log('error')
        reject(error);
    }
});

const login = async ({ phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { phone: phone },
            raw: true,
        })
        const isChecked = response && bcryptjs.compareSync(password, response.password);
        const token = isChecked && jwt.sign({ id: response.id, phone: response.phone }, process.env.SECRET_KEY, { expiresIn: '2d' });
        resolve({
            error: token ? 0 : 1,
            message: token ? 'Login successfully' : response ? 'Password is wrong !' : 'Phone number not found !',
            token: token || null
        })
    } catch (error) {
        console.log('error');
        reject(error);
    }
});



module.exports = {
    register,
    login
}



