require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(
  fileUpload({
    useTempFiles: true,
  })
)

// Import Routes
const UserRoutes = require('./routes/UserRoutes')
const CategoryRoutes = require('./routes/CategoryRoutes')
const ProductRoutes = require('./routes/ProductRoutes')
const UploadRoutes = require('./routes/UploadRoutes')

// Routes
app.use('/user', UserRoutes)
app.use('/api', ProductRoutes)
app.use('/api', CategoryRoutes)
app.use('/api', UploadRoutes)

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the API!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
