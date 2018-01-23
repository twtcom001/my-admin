<template>
<div>
<div>
<span style="float:left;"> 
<el-button type="text" @click="dialogFormVisible = true">新增收支</el-button>
 总计：{{count}} 收入 
</span> 
<el-dialog title="收支" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="日期" :label-width="formLabelWidth">
    <el-date-picker
      v-model="form.date"
      type="date"
      value-format="yyyy-MM-dd">
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="收支" :label-width="formLabelWidth">
      <el-input v-model="form.total" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label=" 备注" :label-width="formLabelWidth">
    <el-input
      v-model="form.comment" 
      type="textarea"
      :rows="2"
      placeholder="请输入内容">
    </el-input>
     </el-form-item> 
    <el-form-item label="收支类型" :label-width="formLabelWidth">
      <el-select v-model="form.src" placeholder="普通用户">
        <el-option label="微信收入" value="微信收入"></el-option>
        <el-option label="淘宝收入" value="淘宝收入"></el-option>
        <el-option label="其他收入" value="其他收入"></el-option>
        <el-option label="支出" value="支出"></el-option>

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
<el-dialog title="编辑" :visible.sync="dialogForm1Visible">
  <el-form :model="form">
    <el-form-item label="日期" :label-width="formLabelWidth">
    <el-date-picker
      v-model="form1.date"
      type="date"
      value-format="yyyy-MM-dd">
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="收支" :label-width="formLabelWidth">
      <el-input v-model="form1.total" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label=" 备注" :label-width="formLabelWidth">
    <el-input
      v-model="form1.comment" 
      type="textarea"
      :rows="2"
      placeholder="请输入内容">
    </el-input>
     </el-form-item>    
    <el-form-item label="收支类型" :label-width="formLabelWidth">
      <el-select v-model="form1.src" placeholder="普通用户">
        <el-option label="微信收入" value="微信收入"></el-option>
        <el-option label="淘宝收入" value="淘宝收入"></el-option>
        <el-option label="其他收入" value="其他收入"></el-option>
        <el-option label="支出" value="支出"></el-option>

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
      prop="date"
      label="日期" 
      sortable>
    </el-table-column>
    <el-table-column
      prop="total"
      label="统计"
      sortable>
    </el-table-column>
    <el-table-column
      prop="src"
      label="收支类型">
    </el-table-column>
    <el-table-column
      prop="comment"
      label="备注">
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
                url: '/api/v1.0/account',
                tableData: [],
                dialogFormVisible: false,
                dialogForm1Visible: false,
                currentPage: 1,
                pageSize: 10,
                count: 0,
                src: 0,
                form: {
                  date: '',
                  total: '',
                  //src: '3',
                  account_type:'xhl'
                },
                form1: {
                  date: '',
                  total: '',
                  src: '',
                  account_type:'xhl',
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
                console.log(this.form.src);
                if (this.form.src == '支出' ){
                  this.form.total = "-"+ this.form.total;
                  console.log(this.form.total);
                }
                this.$axios.post(this.url, this.form).then((response) => {
                    // success callback
                    this.dialogFormVisible = false;
                    this.$message.success('提交成功！');
                    this.getData(this.currentPage,this.pageSize)
                }, (response) => {
                    // error callback
                    this.$message.success('提交失败！');
                });
                
            },
            form1onSubmit() {
                console.log(this.form1);
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
              let self = this;
              self.$axios.get(self.url,{params: { 'page':page,'size':size,account_type:'xhl'  }}).then((res) => {
                self.tableData = res.data.list;
                self.pageTotal = res.data.total;
                self.currentPage = res.data.page;
                self.pageSize = res.data.size;
                self.count = res.data.count;
                self.src = res.data.src;
              },res=>{
                console.log (self.url+'调用失败');      
              })
            },
            indexMethod(index) {
              return index+1;
            },
            handleEdit(index, row) {
              console.log(row);
              this.form1.date = row.date;
              this.form1.total = row.total;
              this.form1.src = row.src;
              this.form1.comment = row.comment;
              this.form1.id = row.id;
              this.dialogForm1Visible = true;
            },
            handleDelete(index, row, data) {
              console.log(index, row);
              this.$axios.get(this.url+"/del/"+row.id).then((res) => {
                this.$message.success(row.id+" 删除成功！");
                data.splice(index, 1);
                this.getData(this.currentPage,this.pageSize)
              },res=>{
                this.$message.success(row.id+" 删除失败！");      
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