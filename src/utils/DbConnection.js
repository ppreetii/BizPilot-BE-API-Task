const Sequelize = require("sequelize");
const dbConfig = require("../configs/dbConfig");

let dbInstance;

class DbConnection {
  constructor() {
    if (dbInstance) return dbInstance;
    return this.createDbInstance();
  }

  createDbInstance() {
    dbInstance = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        dialect: dbConfig.dialect,
        host: dbConfig.host,
        logging: dbConfig.logging
      }
    );

    return dbInstance;
  }
}

module.exports = new DbConnection();
