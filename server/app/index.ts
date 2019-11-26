import express from 'express'
import moment from 'moment'
import fetch from 'node-fetch'

const app = express()
const port = 8080
const fileUrl =
  'https://storage.googleapis.com/king-assignment/data.json'

async function getFile() {
  const response = await fetch(fileUrl)
  return await response.json()
}

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json')
  next()
})

app.get('/data', (req, res) => {
  getFile().then((data) => {
    data.output.forEach((row: { createdOn: moment.MomentInput; }) => {
      if (typeof row.createdOn === 'string') {
        if (moment(row.createdOn).isValid()) {
          row.createdOn = moment(row.createdOn, 'YYYY-MM-DD').unix()
        }
      }
    })
    res.send(JSON.stringify(data.output))
  })
})

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`)
})
