const generateCode = (length) => {
    const charRandoms = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numRandoms = '1234567890';
    let code = '';
    for(let i = 0; i < length; i++){
        //làm tròn số ngẫu nhiên vừa tạo ra thành một số nguyên trong khoảng từ 0 đến độ dài của chuỗi charRandoms - 1.
        code += charRandoms.charAt(Math.floor(Math.random() * charRandoms.length));
    }
    //Nếu code là chuỗi "ABC" và numRandoms là chuỗi "0123456789", 
    //dòng mã này sẽ tạo ra một chuỗi mới bằng cách kết hợp giá trị "ABC" 
    //với một chữ số ngẫu nhiên từ 0 đến 9 và trả về chuỗi mới đó, chẳng hạn "ABC7".
    return `${code}${numRandoms.charAt(Math.floor(Math.random() * charRandoms.length))}`;
}

module.exports = {
    generateCode
}