import express from 'express'
import imageResize from '../../utilities/imageResize'
import cache from '../../utilities/cache'
import validator from '../../utilities/validator'
const images = express.Router()

images.get('/', validator, cache, imageResize, (req, res) => {
  const query = res.locals.query

  res.sendFile(query.outputImagePath)
})

export default images
