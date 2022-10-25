import express from 'express'
import routes from './routes/index'
const app = express()

app.use('/api', routes)

app.listen(3000, () => {
  console.log('The application is listening on port 3000!')
})
