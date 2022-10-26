import express from 'express'
import sharp from 'sharp'
import createHttpError from 'http-errors'
import { resizeData } from './types'

export function resizeImage(query: resizeData): Promise<boolean> {
  return new Promise(function (resolve, reject) {
    const image = query.imagePath as string
    const output = query.outputImagePath as string
    sharp(image)
      .resize(query.width, query.height)
      .toFile(output)
      .then(() => {
        resolve(true)
      })
      .catch(err => {
        console.log(err)
        reject(false)
      })
  })
}
const imageResize = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const query = res.locals.query
  resizeImage(query)
    .then(() => {
      next()
    })
    .catch(() => {
      res
        .send(
          createHttpError(
            404,
            'there is an error to resize your image try again later'
          )
        )
        .status(404)
    })
}

export default imageResize
