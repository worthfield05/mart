const  app  = require("./app")
const  dbConnection  = require('./configs/db.config')
const PORT = `${process.env.PORT || 5000}`

const startServer = async () => {
    try {
        await dbConnection();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    } catch (error) {
        console.log("Failed to start server")
        process.exit(1)
    }
}
startServer();
