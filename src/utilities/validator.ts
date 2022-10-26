import express from 'express'
import path from 'path'
import fs from 'fs'
import creatHttpError from 'http-errors'
import { queryData, resizeData } from './types'
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
const validator = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const query = req.query

  if (checkSize(query as queryData)) {
    if (checkImage(query.name as string)) {
      res.locals.query = getResizeData(query as queryData)

      next()
    } else {
      res
        .send(creatHttpError(404, 'image file not exsited in our server'))
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

export default validator
