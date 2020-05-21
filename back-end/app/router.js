'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/todolist/list',controller.todolist.list);
  router.post('/todolist/modify',controller.todolist.modify);
  router.post('/todolist/delete',controller.todolist.delete);
  router.post('/todolist/add',controller.todolist.add)
};
