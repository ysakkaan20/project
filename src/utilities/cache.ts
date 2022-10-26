import express from 'express'
import fs from 'fs'
const cache = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const query = res.locals.query
  if (fs.existsSync(query.outputImagePath as string)) {
    res.sendFile(query.outputImagePath)
  } else {
    next()
  }
}
export default cache
