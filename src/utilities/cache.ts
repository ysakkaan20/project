import NodeCache from 'node-cache'
import { getResizeData, queryData, resizeData } from './imageResize'
import express from 'express'
const appCache = new NodeCache()
const cache = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const query: resizeData = getResizeData(req.query as unknown as queryData)

  const oldCaach = appCache.get(query.outputName as string)

  if (JSON.stringify(oldCaach) === JSON.stringify(query)) {
    res.sendFile(query.outputImagePath as string)
  } else {
    appCache.set(query.outputName as string, query, 10)
    next()
  }
}

export default cache
