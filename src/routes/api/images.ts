import express from 'express'
import imageResize from '../../utilities/imageResize'
import cache from '../../utilities/cache'
const images = express.Router()

images.get('/', cache, imageResize, (req, res) => {
  res.sendFile(res.locals.user)
})

export default images
