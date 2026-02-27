<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input placeholder="请输入用户名" v-model="formInline.keyWord"></el-input>
            </el-form-item>
             <el-form-item >
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="tableData" style="width: 100%">
            
            <el-table-column 
            v-for="item in tableLabel" 
            :key="item.name" 
            :prop="item.prop" 
            :label="item.label" 
            :width="item.width?item.width:125" 
            />
           
            <el-table-column fixed="right" label="Operations" min-width="120">
                <template #="scope">
                    <el-button  type="primary" size="small" @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button  type="danger" size="small" @click="handleDelete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
         class="pager"
         background
         layout="prev, pager, next" 
         size="large"
         :total="config.total" 
         :current-page="config.page"
         @current-change="handlePage"
         />
    </div>
    <!-- 弹窗 -->
    <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
       <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
		在css进行处理-->
    <el-form :inline="true"  :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性别" prop="sex">
            <el-select  v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" :value=1 />
              <el-option label="女" :value=0 />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit()">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
import {ref,onMounted, reactive, nextTick} from "vue"
import { ElMessage,ElMessageBox } from "element-plus";   //用来做提示的element-plus组件
import { deleteUser, getUserData ,addUser,editUser} from "../api/apiData/userUserData";


const tableData = ref([])
const formInline = reactive({
    keyWord:""
})

const config = reactive({
    name:'',
    total:0,
    page:1
})

const getData = async()=>{
    let data = await getUserData(config)
    // console.log(data);
    
    // console.log(data.list);
    tableData.value=data.list.map((item)=>({
        ...item,
        sexLabel:item.sex==1?'男':'女'
    }))
    config.total = data.count
} 
const tableLabel = reactive([
    {
        prop:"name",
        label:"姓名",
    },
    {
        prop:"age",
        label:"年龄",
    },
    {
        prop:"sexLabel",
        label:"性别",
    },
    {
        prop:"birth",
        label:"出生日期",
        width:200
    },
    {
        prop:"addr",
        label:"地址",
        width:400
    },
])

// 查询
const handleSearch = () => {
    config.name = formInline.keyWord
    getData()
}

// 换页
const handlePage = (value)=>{
    config.page=value
    getData()
}

// 删除
const handleDelete =async (val)=>{
    ElMessageBox.confirm("你确定要删除吗？")
    .then(async ()=>{
        await deleteUser({id:val.id})
        ElMessage({
            showClose:true,
            message:'删除成功',
            type:'success'
            })
        getData()
    })
    .catch((error)=>{
            console.log(error);
            
    })
    
}
// 新增
const dialogVisible=ref(false)
const action=ref('add')
const formUser= reactive({})
//表单校验规则
const rules = reactive({
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项" }],
  addr:[{ required: true, message: '地址是必填项' }]
})
const handleClose = ()=>{
    dialogVisible.value = false
    userForm.value.resetFields()
}
const handleCancel = ()=>{
    dialogVisible.value = false
    userForm.value.resetFields()
}
const handleAdd = ()=>{
    dialogVisible.value = true
    action.value='add'
}
const userForm = ref(null)
const onSubmit = async () => {
    try{
        await userForm.value.validate()
        let res = null
        // console.log(formUser);
        if(action.value==='add') {
            res = await addUser(formUser)
            // console.log(res);  
        }
        if(action.value==='edit') {
            res=await editUser(formUser)
        }
        if(res) {
            dialogVisible.value=false
            userForm.value.resetFields()
            getData()
        }
        
    }catch{
        ElMessage({
            showClose:true,
            message:'请输入正确的内容',
            type:'error'
        })
    }
}
// 编辑用户
const handleEdit = (val)=>{
    
        dialogVisible.value = true
        action.value='edit'
        // console.log(val);
        nextTick(()=>{
            Object.assign(formUser,val)
        })
        
   
}
onMounted(getData)
</script>

<style lang="less" scoped>
.user-header{
    display: flex;
    justify-content: space-between;
}
.table{
    :deep(.el-table .cell){
        font-size: 20px;
    }
    .pager{
        margin-top: 10px;
        display: flex;
        justify-content: flex-end
    }
}
.select-clearn{
    display: flex;
}
</style>