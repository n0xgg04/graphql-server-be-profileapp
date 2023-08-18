import createInstance from './app'
import { logger } from './common/logger/logger'

createInstance().catch((err) => {
    logger.error(err)
})
