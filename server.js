const express = require('express')
const app = express()
const cors = require('cors')
const port = 8080

app.use(cors())
app.use(express.static(__dirname))

let routes = [
    {prefix: `/room-type`, route: require(`./routes/room_type`)},
    {prefix: `/room`, route: require(`./routes/room`)},
]

routes.forEach((router) => app.use(router.prefix, router.route))

app.listen(port, () => {
    console.log(`Server di Port ${port}`);
})
