export interface Environment {
  NODE_ENV: 'production' | 'development' | 'test'
  HOST: string
  PORT: string
  CONTEXT_PATH: string
  USERNAME_DB: string
  PASSWORD_DB: string
  DATABASE: string
}
