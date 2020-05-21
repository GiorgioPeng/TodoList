module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        title: {
            type: String
        },
        desc: {
            type: String
        },
        ddl: {
            type: String
        },
        weight: {
            type: String
        }
    })
    return mongoose.model('todolist', UserSchema,'todolist')
}
