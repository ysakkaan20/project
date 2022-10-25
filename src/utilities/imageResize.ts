import express from 'express'
import fs from 'fs'
import path from 'path'
import creatHttpError from 'http-errors'
import sharp from 'sharp'
export type queryData = {
  name: string
  width: string
  height: string
}
export type resizeData = {
  name: string
  width: number
  height: number
  imagePath?: string
  outputFolderPath?: string
  outputName?: string
  outputImagePath?: string
}
export function checkImage(name: string): boolean {
  const folderPath = path.join(__dirname, `../../assets/images`)
  const file = `${folderPath}/${name}.jpg`
  return fs.existsSync(file)
}

export function checkSize(query: queryData): boolean {
  const width = Number(query.width)
  const height = Number(query.height)

  if (width < 1 || height < 1 || isNaN(width) || isNaN(height)) {
    return false
  }
  return true
}
export function getResizeData(query: queryData): resizeData {
  const folderPath = path.join(__dirname, `../../assets/images`)
  const file = `${folderPath}/${query.name}.jpg`
  const outputFile = `${folderPath}/thumb`
  const outputname = `${query.name}-${query.width}x${query.height}.jpg`
  const outputImagePath = `${outputFile}/${outputname}`
  const data: resizeData = {
    name: query.name,
    width: Number(query.width),
    height: Number(query.height),
    imagePath: file,
    outputFolderPath: outputFile,
    outputName: outputname,
    outputImagePath: outputImagePath
  }
  return data
}

const imageResize = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  let data: resizeData
  const query = req.query

  if (checkSize(query as unknown as queryData)) {
    if (checkImage(query.name as unknown as string)) {
      data = getResizeData(query as unknown as queryData)

      if (fs.existsSync(data.outputImagePath as string)) {
        res.locals.user = data.outputImagePath as string
        next()
      } else {
        const image = data.imagePath as string
        const output = data.outputImagePath as string

        sharp(image)
          .resize(data.width, data.height)
          .toFile(output)
          .then(() => {
            res.locals.user = data.outputImagePath as string
            next()
          })
          .catch(err => {
            console.log(err)
            res
              .send(
                creatHttpError(
                  404,
                  'there is an error to resize your image try again later'
                )
              )
              .status(404)
          })
      }
    } else {
      res
        .send(creatHttpError(404, 'image file not exsited in our server '))
        .status(404)
    }
  } else {
    res
      .send(
        creatHttpError(
          404,
          'the width and height values shoulde be valid numbers'
        )
      )
      .status(404)
  }
}

export default imageResize
