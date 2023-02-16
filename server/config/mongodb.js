const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect('mongodb+srv://mayur:mayuranklekar@cluster0.azwltys.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
        console.log("Connected to database")
    })
        .catch((err) => {
            console.log(err)
        })
}
module.exports = connectDB