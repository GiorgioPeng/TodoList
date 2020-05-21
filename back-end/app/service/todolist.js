// service -> user.js
const Service = require('egg').Service

class TodolistSevice extends Service {
    async find() {
        const result = await this.ctx.model.Todolist.find()
        return result
    }
    async modify(data) {
        console.log(data)
        await this.ctx.model.Todolist.updateOne({ 'title': data.title }, { $set: { 'desc': data.desc } })
    }
    async delete(data) {
        console.log(data)
        let a = await this.ctx.model.Todolist.deleteOne({ 'title': data.title });
        console.log(a)
    }
    async add(data) {
        console.log(data)
        let admin = new this.ctx.model.Todolist(data);
        admin.save()
        // let a = await this.ctx.model.Todolist.create(data)
        // console.log(a)
    }
}

module.exports = TodolistSevice
