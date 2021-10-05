class BaseModel {
    tableName
    constructor(conn, tableName) {
        this.tableName = tableName
        this.conn = conn;
    }
    async insert({ query, values, emptyQuery }) {
        return this.conn.query(`INSERT IGNORE INTO ${this.tableName} (${query}) VALUES (${emptyQuery});`, values);
    }
    async get({ query, values }, ...restOfQuery) {
        for (let i = 0; i < restOfQuery.length; i++) {
            query += " AND " + restOfQuery.join(" AND ");
        }
        return this.conn.query(`SELECT * from ${this.tableName} where ${query};`, values);
    }
    async delete({ query, values }) {
        return this.conn.query(`DELETE from ${this.tableName} where ${query};`, values);
    }
    async update({ query, values }, { query: whereQuery, values: whereValues }) {
        return this.conn.query(`UPDATE ${this.tableName} SET ${query} where ${whereQuery};`, values.concat(whereValues));
    }
}

module.exports = BaseModel