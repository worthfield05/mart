const mongoose = require('mongoose')
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully")

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        })

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("MongoDB connection closed due to app termination")
            process.exit(0)
        })
    } catch (error) {
        console.error("Database connection error:", error.message)
        process.exit(1)
    }
}
module.exports = dbConnection