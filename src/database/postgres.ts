import { Sequelize } from 'sequelize'
import config from '@/common/configs/config'
import {logger} from "@/common/logger/logger";

interface Database {
    sequelize: Sequelize
}

class PostgreSqlDatabase {
    private db: Database = {} as Database

    connect() {
        const connectConfig = config.PostgreConfig
        const sequelize = new Sequelize(
            connectConfig.DB,
            connectConfig.user,
            connectConfig.password,
            {
                host: connectConfig.host,
                dialect: 'postgres',
                pool: { ...connectConfig.pool },
            }
        )
        logger.info('connect successfully')
        Object.assign(this.db, { sequelize })
    }

    get postgresQLInstance() {
        return this.db
    }
}

const postgreSqlDatabase = new PostgreSqlDatabase()
postgreSqlDatabase.connect();
export default postgreSqlDatabase
