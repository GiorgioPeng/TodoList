<template>
  <el-container>
    <el-header>
      <p>待办任务列表</p>
    </el-header>
    <el-main>
      <el-button type="primary" @click="add()">新建</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="title" label="任务名称" width="150"></el-table-column>
        <el-table-column prop="desc" label="任务详情"></el-table-column>
        <el-table-column prop="ddl" label="截止日期"></el-table-column>
        <el-table-column prop="weight" label="紧急程度"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleModify(scope.$index,scope.row)" type="warning" size="small">修改</el-button>
            <el-button @click="handleDelete(scope.$index,scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog :title="isCreate?'新建':'修改'" :visible.sync="isOpenModifyDialog">
      <el-form :model="form">
        <el-form-item label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" :disabled="isCreate?false:true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="任务详情" :label-width="formLabelWidth">
          <el-input v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="截止日期" :label-width="formLabelWidth">
          <el-input v-model="form.ddl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="紧急程度" :label-width="formLabelWidth">
          <el-input v-model="form.weight" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOpenModifyDialog = false">取 消</el-button>
        <el-button type="primary" @click="isCreate?create():modify()">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  name: "TodoList",
  components: {},
  created() {
    fetch("http://127.0.0.1:7001/todolist/list")
      .then(e => e.json())
      .then(e => {
        console.log(e.data)
        this.tableData = e.data;
      });
  },
  methods: {
    add() {
      this.isCreate = true;
      this.form.title = "";
      this.form.desc = "";
      this.form.ddl = "";
      this.form.weight = "";
      this.isOpenModifyDialog = true;
    },
    create() {
      let temp = {};
      temp.title = this.form.title;
      temp.desc = this.form.desc;
      temp.ddl = this.form.ddl;
      temp.weight = this.form.weight;
      fetch("http://127.0.0.1:7001/todolist/add", {
        method: "POST",
        mode: "cors",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title:temp.title,
          desc:temp.desc,
          ddl:temp.ddl,
          weight:temp.weight
        })
      }).then(function(response) {
        console.log(response);
      });
      this.tableData.push(temp);
      this.isOpenModifyDialog = false;
      this.isCreate = false;
    },
    handleModify(index, row) {
      this.form.title = row.title;
      this.form.desc = row.desc;
      this.form.ddl = row.ddl;
      this.form.weight = row.weight;
      this.form.index = index;
      this.isOpenModifyDialog = true;
    },
    handleDelete(index, row) {
      let deleteOne = this.tableData[index]
      this.tableData.splice(index, 1);
      fetch("http://127.0.0.1:7001/todolist/delete", {
        method: "POST",
        mode: "cors",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title:deleteOne.title,
          desc:deleteOne.desc,
          ddl:deleteOne.ddl,
          weight:deleteOne.weight
        })
      }).then(function(response) {
        console.log(response);
      });
      console.log(row);
    },
    modify() {
      this.tableData[this.form.index].title = this.form.title;
      this.tableData[this.form.index].desc = this.form.desc;
      this.tableData[this.form.index].ddl = this.form.ddl;
      this.tableData[this.form.index].weight = this.form.weight;
      fetch("http://127.0.0.1:7001/todolist/modify", {
        method: "POST",
        mode: "cors",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title:this.form.title,
          desc:this.form.desc,
          ddl:this.form.ddl,
          weight:this.form.weight
        })
      }).then(function(response) {
        console.log(response);
      });
      console.log(this.tableData)
      this.isOpenModifyDialog = false;
    }
  },
  data() {
    return {
      isOpenModifyDialog: false,
      isCreate: false,
      tableData: [],

      form: {
        title: "",
        desc: "",
        ddl: "",
        weight: "",
        dataIndex: 0
      },
      formLabelWidth: "120px"
    };
  }
};
</script>
<style scoped>
</style>