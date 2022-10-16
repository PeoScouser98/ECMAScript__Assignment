
import jsonServer from "json-server"
import auth from "json-server-auth"
import jwt from "jsonwebtoken"
import cors from "cors"

const app = jsonServer.create()
const router = jsonServer.router('db.json')

app.db = router.db
app.use(cors())
// You must apply the auth middleware before the router
app.use(auth)
app.use(router)
const SECRET_KEY = "json-server-auth-123456"



app.get("/users/:id", (req, res) => {
    try {
        let accessToken = req.headers.authorization
        if (accessToken && accessToken != "") {
            accessToken = accessToken.replace("Bearer ", "")
            const payload = jwt.verify(accessToken, SECRET_KEY)
            console.log(payload);
            const { users } = router.db.__wrapped__
            const account = users.find(user => user.id === +payload.id || user.id === +payload.sub)
            delete account.password
            return res.status(200).json(account)
        }
    } catch (error) {
        return res.status(200).json({
            error: error,
            statusCode: 401
        })
    }

})

app.post("/refresh-token/:id", (req, res) => {
    try {
        const newAccessToken = jwt.sign({ sub: req.params.id }, SECRET_KEY, { expiresIn: "1h" })
        console.log("New access token: ", newAccessToken);
        return res.status(201).json({
            accessToken: newAccessToken
        })
    } catch (error) {
        return res.status(400).json({
            message: "Cannot generate refresh token"
        })
    }
})




app.listen(3001, () => {
    console.log("Server is listening on Port: 3001")
})