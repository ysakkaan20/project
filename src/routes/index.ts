import express from 'express'
import images from './api/images'
import logger from '../utilities/logger'

const routes = express.Router()

routes.get('/', logger, (req, res) => {
  res.send('main routes')
})
routes.use('/images', images)

export default routes
