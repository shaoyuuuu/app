<template>
    <div>
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="活动标题" :label-width="formLabelWidth" prop="title">
                <el-input v-model="form.title" placeholder="请输入标题" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动简介" :label-width="formLabelWidth" prop="synopsis">
                <el-input v-model="form.synopsis" placeholder="请输入简介" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动内容" :label-width="formLabelWidth" prop="details">
                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.details">
                </el-input>
            </el-form-item>
            <el-form-item label="开始日期" prop="startTime" :label-width="formLabelWidth">
                <el-date-picker v-model="form.startTime" type="datetime" format='yyyy-MM-dd' value-format="yyyy-MM-dd"
                    placeholder="开始日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期" prop="endTime" :label-width="formLabelWidth">
                <el-date-picker v-model="form.endTime" type="datetime" format='yyyy-MM-dd' value-format="yyyy-MM-dd"
                    placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="活动图片" :label-width="formLabelWidth">
                <el-upload class="upload-demo" ref="upload" :limit="limitNum" :class="{ hide: hideUploadEdit }"
                    :on-remove="handleRemove" :on-change="handleEditChange" :http-request="handleUpload"
                    :before-upload="uploadPreview" :with-credentials="true" :auto-upload="true" accept=".png" action=""
                    list-type="picture-card" :file-list="fileList">
                    <i slot="trigger" class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="参与人数" :label-width="formLabelWidth" prop="max">
                <el-input-number v-model="form.max" :min="1" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
                <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import axios from 'axios';
import { mapGetters } from 'vuex'
export default {
    props: {
        type: String
    },
    data() {

        let validateStartTime = (rule, value, callback) => {
            if (!value) {
                callback(new Error("起始日期不能为空"));
            } else {
                // 如果结束日期没选
                if (!this.form.endTime) {
                    callback();
                } else {
                    // 结束日期有进行判断
                    if (this.compareDate(value, this.form.endTime)) {
                        // 如果起始在结束之前
                        callback();
                    } else {
                        callback(new Error("起始日期不能再结束日期之后，请重新选择"));
                    }
                }
            }
        };
        let validateEndTime = (rule, value, callback) => {
            if (!value) {
                callback(new Error("结束日期不能为空"));
            } else {
                if (!this.form.startTime) {
                    callback();
                } else {
                    // 起始日期有
                    if (this.compareDate(this.form.startTime, value)) {
                        callback();
                    } else {
                        callback(new Error("结束日期不能在起始日期前，请重新选择"));
                    }
                }
            }
        };
        return {
            formLabelWidth: '120px',
            //表单数据
            form: {
                title: '',
                startTime: '',
                endTime: '',
                synopsis: '',
                details: '',
                imgUrl: '',
                max: 50
            },
            rules: {
                title: [{ required: true, message: '请输入活动标题', trigger: 'blur' }],
                synopsis: [{ required: true, message: '请输入活动简介', trigger: 'blur' }],
                details: [{ required: true, message: '请输入活动内容', trigger: 'blur' }],
                max: [{ required: true, message: '请输入活动内容', trigger: 'blur' }],
                startTime: [
                    {
                        trigger: ["blur"],
                        validator: validateStartTime,
                    },
                    { required: true }
                ],
                endTime: [
                    {
                        trigger: ["blur"],
                        validator: validateEndTime,
                    },
                    { required: true }
                ],
            },
            hideUploadEdit: false, // 隐藏'上传按钮'
            limitNum: 1, // 图片数量
            fileList: [] // 图片列表
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submitUpload();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //比较两个日期
        compareDate(start, end) {
            return new Date(end).getTime() > new Date(start).getTime();
        },
        handleEditChange(file, fileList) {
            this.hideUploadEdit = fileList.length >= this.limitNum;
        },

        handleRemove(file, fileList) {
            if (fileList.length === 0) {
                this.fileList = [];
            } else {
                let dl = this.fileList.indexOf(file);
                this.fileList.splice(dl, 1);
            }
            this.hideUploadEdit = fileList.length >= this.limitNum;
        },

        uploadPreview(file) {
            const isPNG = /^.png$/.test(file.name.substring(file.name.lastIndexOf('.')));
            const isJPG = /^.jpg$/.test(file.name.substring(file.name.lastIndexOf('.')));
            const isLt5MB = file.size / 1024 / 1024 < 5;

            if (!isPNG && !isJPG) {
                this.$message.error("上传图片只能是 PNG或JPG 格式!");
                return false;
            };
            if (!isLt5MB) {
                this.$message.error("上传图片不能超过5MB！");
                return false;
            }

            return (isPNG || isJPG) && isLt5MB;
        },

        handleUpload(param) {
            this.param = param;
            // 这里可以进行上传
            // let formData = new FormData(); //formdata格式
            // formData.append("fileName", this.param.file);
            // 将formData 作为 body 上传即可， 有额外的参数可携带
        },

        async submitUpload() {
            if (!this.param) {
                this.$message("请选择图片");
            } else {
                let formData = new FormData(); //formdata格式
                formData.append("img", this.param.file);
                formData.append("type", this.type);
                formData.append("adminId", this.userInfo.id)
                formData.append("startTime", this.form.startTime)
                formData.append("endTime", this.form.endTime);
                formData.append("content", this.contentJson);
                formData.append("max", this.form.max)
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Token': localStorage.getItem('TOKEN')
                    }
                }
                axios.post('/api/addActivity', formData, config)
                    .then((res) => {
                        Message({
                            showClose: true,
                            duration: 1500,
                            message: '添加活动成功',
                            type: 'success'
                        })
                        this.$emit('success')
                        console.log(res);
                    })
                    .catch((res) => {
                        console.log(res);
                    })
            }
        },
    },
    computed: {
        ...mapGetters(['userInfo']),
        contentJson() {
            let content = {
                title: this.form.title,
                synopsis: this.form.synopsis,
                details: this.form.details
            }
            return JSON.stringify(content)
        }
    },
    mounted() {
    }
}
</script>

<style scope lang="less">
.hide .el-upload--picture-card {
    display: none;
}

.el-upload-list__item {
    transition: none !important;
}
</style>