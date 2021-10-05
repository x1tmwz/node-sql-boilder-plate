const BaseModel  = require("./BaseModel");
const conn = require('../mysql');
const config = require('config');
const sqlHelperFunctions = require('../../utils/sqlHelperFunctions');
const bcrypt = require('bcryptjs');
const roles = require('../../data/roles.json');

class User extends BaseModel {
    constructor() {
        super(conn,'tools_users');
    }
    async init(){
        await this.createTable();
        return this.insertAdminUser();
    }
    async createTable() {
        return this.conn.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userName VARCHAR(10) unique,
                password VARCHAR(100),
                role INT(2)) CHARACTER SET = utf8`);
    }
    async insertAdminUser(){
        const password = await bcrypt.hash(config.get('system.password'), 8);
        return this.insert(sqlHelperFunctions.createQueryForInsert({userName:config.get('system.userName'),password,role:roles.ADMIN}));
    }
}

module.exports = User;