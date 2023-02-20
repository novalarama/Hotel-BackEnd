const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const port = 8080


app.use(cors())
app.use(express.static(__dirname))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


let routes = [
    {prefix: `/room-type`, route: require(`./routes/room_type_route`)},
    {prefix: `/room`, route: require(`./routes/room_route`)},
    {prefix: `/room-photo`, route: require(`./routes/room_photo_route`)},
    {prefix: `/room-facility`, route: require(`./routes/room_facility_route`)},
    {prefix: `/user`, route: require(`./routes/user_route`)},
    {prefix: `/booking`, route: require(`./routes/booking_route`)},
    {prefix: `/booking-detail`, route: require(`./routes/booking_detail_route`)},
]

routes.forEach((router) => app.use(router.prefix, router.route))

app.listen(port, () => {
    console.log(`Server di Port ${port}`);
})
