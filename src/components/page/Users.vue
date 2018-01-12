<template>
<div>
<div>
<span style="float:left;"> 
<el-button type="text" @click="dialogFormVisible = true">新增用户</el-button>
</span> 
<el-dialog title="新增用户" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="昵称" :label-width="formLabelWidth">
      <el-input v-model="form.nickname" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色" :label-width="formLabelWidth">
      <el-select v-model="form.role" placeholder="普通用户">
        <el-option label="普通用户" value="2"></el-option>
        <el-option label="管理员" value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </div>
</el-dialog>
</div>

<div>
<el-dialog title="编辑用户" :visible.sync="dialogForm1Visible">
  <el-form :model="form">
    <el-form-item label="昵称" :label-width="formLabelWidth">
      <el-input v-model="form1.nickname" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form1.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色" :label-width="formLabelWidth">
      <el-select v-model="form1.role" placeholder="普通用户">
        <el-option label="普通用户" value="2"></el-option>
        <el-option label="管理员" value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="form1onSubmit">确 定</el-button>
  </div>
</el-dialog>
</div>

  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名" 
      sortable>
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称"
      sortable>
    </el-table-column>
    <el-table-column
      prop="head_img"
      label="头像">
    </el-table-column>
    <el-table-column
      prop="role_id"
      label="角色">
    </el-table-column>
    <el-table-column
      prop="last_login"
      label="最后登录"
      sortable>
    </el-table-column>    
    <el-table-column
      prop="head_img"
      label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row, tableData)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal">
    </el-pagination>
  </div>
</div>
</template>

<script>

    import Vue from 'vue'

    export default{
        data() {
            return {
                url: '/api/v1.0/users',
                tableData: [],
                dialogFormVisible: false,
                dialogForm1Visible: false,
                currentPage: 1,
                pageSize: 10,
                form: {
                  username: '',
                  nickname: '',
                  password: '',
                  role: '2'
                },
                form1: {
                  username: '',
                  nickname: '',
                  password: '',
                  role: '',
                  id: ''
                },
                formLabelWidth: '120px',
                pageTotal: 0
            }
        },
        created(){ 
            this.getData(this.currentPage,this.pageSize);
        },
        methods:{

            onSubmit() {
                //console.log(this.form);
                this.$axios.post(this.url, this.form).then((response) => {
                    // success callback
                    this.dialogFormVisible = false;
                    this.$message.success('提交成功！');
                    this.getData(this.currentPage,this.pageSize);
                    this.form.username = '';
                    this.form.nickname = '';
                    this.form.password = '';
                    this.form.role = '2';
                }, (response) => {
                    // error callback
                    this.$message.success('提交失败！');
                });
                
            },
            form1onSubmit() {
                //console.log(this.form1);
                this.$axios.put(this.url+"/"+this.form1.id, this.form1).then((response) => {
                    // success callback
                    this.dialogForm1Visible = false;
                    this.$message.success('提交成功！');
                    this.getData(this.currentPage,this.pageSize);
                }, (response) => {
                    // error callback
                    this.$message.success('提交失败！');
                });
                
            },
            getData(page,size){

              console.log(this.$axios.defaults.auth);
              console.log(localStorage.token);
              
              this.$axios.get(this.url,{params: { 'page':page,'size':size  }}).then((res) => {
                this.tableData = res.data.list;
                this.pageTotal = res.data.total;
                this.currentPage = res.data.page;
                this.pageSize = res.data.size;
              },res=>{
                console.log (this.url+'调用失败');      
              })
            },
            indexMethod(index) {
              return index+1;
            },
            handleEdit(index, row) {
              this.form1.username = row.username;
              this.form1.nickname = row.nickname;
              this.form1.role = row.role;
              this.form1.id = row.id;
              this.dialogForm1Visible = true;
            },
            handleDelete(index, row, data) {
              console.log(index, row);
              this.$axios.get(this.url+"/del/"+row.id).then((res) => {
                this.$message.success(row.username+" 删除成功！");
                data.splice(index, 1);
              },res=>{
                this.$message.success(row.username+" 删除失败！");      
              })
            },
            handleSizeChange(val) {
              console.log(`每页 ${val} 条`);
              this.$options.methods.getData.bind(this)(this.currentPage,val);
            },
            handleCurrentChange(val) {
              //作用域 绑定 this
              this.$options.methods.getData.bind(this)(val,this.pageSize);
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                  .then(_ => {
                    done();
                  })
                  .catch(_ => {});
              }
        }
    }


</script>