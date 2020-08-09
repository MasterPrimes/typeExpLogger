import { Router, Request, Response } from 'express'
import logger from '../app_modules/logger'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  logger.debug('debug')
  logger.info('info')
  res.status(200).send({
    message: 'Hello Express for TypeScript',
  })
})

export default router
