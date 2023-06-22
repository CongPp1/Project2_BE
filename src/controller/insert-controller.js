const insertService = require('../service/insert-service.js');

const insert = async (req, res, next) => {
    try {
        const response = await insertService.insert();
        return res.status(200).send({ message: 'Inserted successfully', data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error inserting', error: error.message });
    }
};

module.exports = {
    insert,
}