import dotenv from 'dotenv'
import { Environment } from '@/common/interface/Env'
import * as process from 'process'
import { get } from 'lodash'

dotenv.config()

class ConfigService {
  getEnv<T = string>(key: keyof Environment): T {
    if (!process.env[key])
      throw new Error(key + ' environment variable does not set ')

    return process.env[key]! as unknown as T
  }

  get isProduction(): boolean {
    return this.getEnv<string>('NODE_ENV') === 'production'
  }

  get isDevelopment(): boolean {
    return this.getEnv<string>('NODE_ENV') === 'development'
  }

  get portServer(): number {
    return Number.parseInt(this.getEnv('PORT'))
  }
  get hostServer(): string {
    return this.getEnv('HOST')
  }

  get contextPath(): string {
    return this.getEnv('CONTEXT_PATH')
  }

  get PostgreConfig() {
    return {
      host: 'localhost',
      user: this.getEnv('USERNAME_DB'),
      password: this.getEnv('PASSWORD_DB'),
      DB: this.getEnv('DATABASE'),
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  }
}

const config = new ConfigService()

export default config
