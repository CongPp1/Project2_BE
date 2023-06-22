const db = require('../../models/index.js');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
const chothuecanho = require('../../data/chothuecanho.json')
const { generateCode } = require('../utils/generateCode.js');
dotenv.config();

const dataBody = chothuecanho.body;

const hashPassword = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

export const insert = async () => new Promise(async (resolve, reject) => {
    console.log('insert');
    try {
        dataBody.forEach(async (item) => {  
            let labelCode = generateCode(5);
            let postId;
            let attributesId;
            let overviewId;
            let imagesId;
            let userId;
            let created = new Date();
            let expire = new Date();
            await db.Post.create({
                id: postId,
                title: item?.header?.title,
                star: item?.header?.star,
                labelCode,  
                address: item?.header?.address,
                attributesId,
                categoryCode: 'Cho thue can ho',
                description: JSON.stringify(item?.mainContent?.content),
                userId,
                overviewId,
                imagesId,
            });
            await db.Attribute.create({
                id: attributesId,
                price: item?.header?.price,
                acreage: item?.header?.acreage,
                published: item?.header?.published,
                hashtag: item?.header?.hashtag
            });
            await db.Images.create({
                id: imagesId,
                images: JSON.stringify(item.images),
            });
            await db.Label.create({
                code: labelCode,
                value: item?.header?.class?.classType
            });
            await db.Overview.create({
                id: overviewId,
                code: item?.overview?.content.find((item) => item.name === 'Mã tin:')?.content,
                area: item?.overview?.content.find((item) => item.name === 'Khu vực:')?.content,
                target: item?.overview?.content.find((item) => item.name === 'Đối tượng thuê:')?.content,
                type: item?.overview?.content.find((item) => item.name === 'Loại tin rao:')?.content,
                bonus: item?.overview?.content.find((item) => item.name === 'Gói tin:')?.content,
                created,
                expire
            });
            await db.User.create({
                id: userId,
                name: item?.contact?.content.find((item) => item.name === 'Liên hệ:')?.content,
                password: hashPassword('123456'),
                phone: item?.contact?.content.find((item) => item.name === 'Điện thoại:')?.content,
                zalo: item?.contact?.content.find((item) => item.name === 'Zalo')?.content,
            });
        })
        resolve('Insert done');
    } catch (error) {
        console.log('error')
        reject(error);
    }
});