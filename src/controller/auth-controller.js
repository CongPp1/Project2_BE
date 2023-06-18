const authService = require('../service/auth-service.js');

const register = async (req, res) => {
    const { name, phone, password } = req.body;
    try {
        if (!name || !phone || !password) {
            console.log('aaa')
            return res.status(400).send({
                error: 1,
                message: 'Invalid phone, password or name, Please enter a valid phone number or password.'
            });
        }
        const response = await authService.register(req.body);
        return res.status(200).send({ message: 'Registration successful', response: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error: " + error.message });
    }
}

const login = async (req, res) => {
    const { phone, password } = req.body;
    try {
        if( !phone || !password ) {
            return res.status(401).send({ message: 'Missing phone or password, please try again' });
        }
        const response = await authService.login(req.body)
        return res.status(200).send({ message: 'Login successfully', response: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error: " + error.message });
    }
};

module.exports = {
    register,
    login
}