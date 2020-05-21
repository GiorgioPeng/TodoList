// app/controller/news.js
const Controller = require('egg').Controller;

class TodoListController extends Controller {
    
    async list() {
        const result = await this.service.todolist.find()
        this.ctx.body = {
            code: 200,
            msg: 'success',
            data: result
        };
        return result;
    }
    async modify(){
        // console.log(this.ctx.request.body)
        await this.service.todolist.modify(this.ctx.request.body)
    }
    async delete(){
        await this.service.todolist.delete(this.ctx.request.body); 
    }
    async add(){
        await this.service.todolist.add(this.ctx.request.body);
    }
}

module.exports = TodoListController;
