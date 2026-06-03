const app = require('./src/app')
const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`ELLO API running on http://localhost:${port}`)
})
