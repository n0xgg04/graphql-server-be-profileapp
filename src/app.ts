import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import baseExceptionHandler from '@/common/exceptions/handler/BaseExceptionHandler'
import config from './common/configs/config'
import { logger } from './common/logger/logger'
import postgreSqlDatabase from './database/postgres'
import {ApolloServer} from 'apollo-server-express'
import userGraphQL from './graphql/users'


export class App {
    public app
    public apolloserver

    constructor() {
        this.app = express()
        this.middlewares()
        this.initializeErrorHandle()
    }


    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.initGraphql().then();
    }

    async initGraphql() {
        //! init graphql
          this.apolloserver = new ApolloServer({
              modules: [
                  userGraphQL
              ]
          });
        await this.apolloserver.start();
        this.apolloserver.applyMiddleware({app: this.app });
    }



    initializeErrorHandle() {
        this.app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
            baseExceptionHandler.handleError(err, res)
        })
    }

    routes() {
     //   this.app.use('/api', router)
    }
}

const createInstance = async () => {
    const instance = new App()
    postgreSqlDatabase.connect()
    postgreSqlDatabase.postgresQLInstance.sequelize
        .sync({ force: false, alter: true })
        .then(() => {
            logger.info('Synced db.')
        })
        .catch((err) => {
            logger.info('Failed to sync db: ' + err.message)
        })
    const HOST = config.hostServer
    const PORT = config.portServer

    instance.app.listen(PORT, () => {
        logger.info('server is ' + instance.app.get('env'))
        logger.info(
            `\`Server running at http://${HOST}:${PORT}${config.contextPath}\``
        )
    })
    return instance
}

export default createInstance
