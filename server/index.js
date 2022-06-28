const express = require('express')
const fs = require('fs')
const gatsby = require('gatsby-plugin-nodejs')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(
  bodyParser.json({
    limit: '50mb',
  })
)
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
  })
)

gatsby.prepare({ app }, () => {
  var base = process.env.PWD

  app.post('/api/upload/image', (req, res) => {
    var base64Data = req.body.fileData.replace(/^data:image\/png;base64,/, '')
    var saveFilePath = base + '/static/content/' + req.body.saveFile

    fs.writeFile(saveFilePath, base64Data, 'base64', function(err) {
      res.send('/content/' + req.body.saveFile)
      if (err) {
        console.log(err)
      }
    })
  })

  app.post('/api/upload/md', (req, res) => {
    var fileData = req.body.fileData
    var saveDirectory = base + req.body.saveDirectory
    var saveFile = req.body.saveFile

    var saveFullPath = saveDirectory + saveFile
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true })
    }
    try {
      fs.unlinkSync(saveFullPath, function(err) {
        if (err) return console.log(err)
        console.log('file deleted successfully')
      })
    } catch (err) {
      console.error(err)
    }

    fs.writeFileSync(saveFullPath, fileData, function(err) {
      if (err) {
        console.log(err)
      }
    })

    res.send('ok')
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))
