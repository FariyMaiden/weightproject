<template>
  <div>
    <div>
      <h1>项目权重管理</h1>
    </div>

    <div>
      <el-input v-model="userid" placeholder="工号" class="input1"></el-input>
      <el-input v-model="name" placeholder="姓名" class="input1"></el-input>

      <el-select v-model="value" placeholder="请选择项目" @change="xitongIDD">
        <!-- <el-option v-for="(item,index) in projectName" :key="index" :label="item" :value="item" disabled=""></el-option> -->
        <el-option
          v-for="(item,index) in projectNameandid"
          :key="index"
          :label="item.projectname"
          :value="item.projectname"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
      <el-input
        v-model="weightNum"
        placeholder="0.1~1权重"
        class="input1"
        type="number"
        max="1"
        min="0.1"
        step="0.1"
      ></el-input>
      <el-date-picker
        v-model="Month"
        type="month"
        placeholder="选择月"
        format="yyyy-MM"
        value-format="yyyy-MM"
      ></el-date-picker>
      <el-button type="primary" @click="addList">添加+</el-button>
    </div>

    <div>
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="userid" label="工号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="Weight" label="权重"></el-table-column>
        <el-table-column prop="Month" label="月份"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        @click="sendTable"
        class="sendTable"
        id="sentbtn"
        v-if="show"
      >{{result}}提交</el-button>
    </div>

    <h2>本月已提交权重</h2>
    <div>
      <el-date-picker
        v-model="Monthchaxun"
        type="month"
        placeholder="选择月"
        format="yyyy-MM"
        value-format="yyyy-MM"
      ></el-date-picker>
      <el-button type="primary" @click="btngethistory">查询月历史数据</el-button>
      <el-button type="primary" @click="everybtngethistory">查询所有历史数据</el-button>
    </div>

    <div>
      <el-table :data="oldtableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="userID" label="工号" width="180"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="Weight" label="权重"></el-table-column>
        <el-table-column prop="Month" label="月份"></el-table-column>
        <el-table-column prop="Datetime" label="提交日期"></el-table-column>
      </el-table>
      <el-button
        type="primary"
        @click="xiugaiweightbtn"
        class="sendTable"
        v-if="xiugaishow"
      >{{result2}}修改</el-button>
    </div>

    <div v-if="showIF">
      <h3>所有历史数据</h3>
      <el-table :data="everyoldtableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="userID" label="工号" width="180"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="Weight" label="权重"></el-table-column>
        <el-table-column prop="Month" label="月份"></el-table-column>
        <el-table-column prop="Datetime" label="提交日期"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xitongID: [], //项目id
      projectName: [], //项目名称
      value: "",

      sendxitongID: "", //提交的系统id
      name: "", //用户名称
      weightNum: "", //项目权重
      userid: "", //用户id

      datas: "",

      tableData: [], //表格显示数据

      Month: "", //年月
      Datetime: "",
      result: "",

      yixuanp: [], //已选项目名称

      projectNameandid: [], //展示的下拉框数据（下拉框供选择的项目名称）
      oldtableData: [], //获取到的历史数据
      show: true,
      xiugaishow: false,
      result2: "",
      Monthchaxun: "",
      everyoldtableData: [],
      showIF: false
    };
  },

  created() {
    //获取当前日期
    this.Datetime = this.riqi();
    console.log(this.Datetime.substring(0, 7));
    this.Month = this.getPreMonth(this.Datetime);

    //获取缓存的数据
    this.name = window.sessionStorage.getItem("username");

    //获取所有项目数据
    this.$axios({
      method: "GET",
      url: "http://172.0.0.116:82/projectManagement1",
      type: "json"
    })
      .then(res => {
        console.log(res);

        for (let i = 0; i < res.data.recordsets[0].length; i++) {
          this.projectName.push(res.data.recordsets[0][i].projectName);
          this.xitongID.push(res.data.recordsets[0][i].xitongID);

          let msg = {
            disabled: false,
            projectname: res.data.recordsets[0][i].projectName,
            xitongID: res.data.recordsets[0][i].xitongID
          };
          this.projectNameandid.push(msg);
        }
        console.log(this.projectName);
        console.log(this.xitongID);
        this.gethistory();
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    //查询所有历史数据
    everybtngethistory() {
      this.showIF = true;
      let params = { userid: window.sessionStorage.getItem("userid") };

      this.$axios({
        method: "GET",
        url: "http://172.0.0.116:82/everybtngethistory",
        params: params,
        type: "json"
      })
        .then(res => {
          this.everyoldtableData = res.data.recordsets[0];
          for (let j = 0; j < this.everyoldtableData.length; j++) {
            for (let i = 0; i < this.xitongID.length; i++) {
              if (this.everyoldtableData[j].xitongID === this.xitongID[i]) {
                this.everyoldtableData[j].projectName = this.projectName[i];
                this.everyoldtableData[j].userName = this.name;
              }
            }
          }

          console.log(this.everyoldtableData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    xiugaiweightbtn() {
      if (this.oldtableData.length === 0) {
        window.alert("未有修改数据");
      } else {
        console.log(this.oldtableData);
        // this.oldtableData[0].userid = this.userid;
        this.result2 = "正在";
        this.tableData = [];
        this.name = this.oldtableData[0].userName;
        this.xiugaiweight(0);
      }
    },

    xiugaiweight(index) {
      if (index < this.oldtableData.length) {
        console.log(this.oldtableData[index].userID);
        let params = {
          userid: this.oldtableData[index].userID,
          xitongID: this.oldtableData[index].xitongID,
          Weight: this.oldtableData[index].Weight,
          Month: this.oldtableData[index].Month,
          Datetime: this.oldtableData[index].Datetime
        };
        this.$axios({
          method: "POST",
          url: "http://172.0.0.116:82/delect",
          params: params,
          type: "json"
        })
          .then(response => {
            // console.log(response);

            if (response.status === 200) {
              console.log(response);
              if (index + 1 === this.oldtableData.length) {
                this.oldtableData[index].userid = this.userid;
                this.oldtableData[index].name = this.name;
                this.oldtableData[index].Datetime = this.Datetime;
                this.tableData.push(this.oldtableData[index]);
                for (let k = 0; k < this.tableData.length; k++) {
                  for (let m = 0; m < this.projectNameandid.length; m++) {
                    if (
                      this.tableData[k].projectName ===
                      this.projectNameandid[m].projectname
                    ) {
                      this.projectNameandid[m].disabled = true;
                    }
                  }
                }
                this.show = true;
                window.alert("提交修改请求成功！！！");
                this.result2 = "";
                this.xiugaishow = false;
                this.oldtableData = [];
              } else {
                this.oldtableData[index].userid = this.userid;
                this.oldtableData[index].name = this.name;
                this.oldtableData[index].Datetime = this.Datetime;
                this.tableData.push(this.oldtableData[index]);
                this.xiugaiweight(index + 1);
              }
            } else {
              console.log("失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //获取上个月月份
    getPreMonth(date) {
      var arr = date.split("-");
      var year = arr[0]; //获取当前日期的年份
      var month = arr[1]; //获取当前日期的月份
      var day = arr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      var year2 = year;
      var month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
      var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      // var t2 = year2 + "-" + month2 + "-" + day2;
      var t2 = year2 + "-" + month2;
      return t2;
    },
    //输入月份点击查询历史数据
    btngethistory() {
      if (this.Monthchaxun === "") {
        window.alert("请输入查询的月份");
      } else {
        this.oldtableData = [];
        this.userid = window.sessionStorage.getItem("userid");
        let upMonth = this.Monthchaxun;
        let params = {
          userid: this.userid,
          Month: upMonth
        };
        this.$axios({
          method: "GET",
          url: "http://172.0.0.116:82/gethistory",
          params: params,
          type: "json"
        })
          .then(response => {
            console.log(response.data.recordsets[0].length);
            if (response.data.recordsets[0].length !== 0) {
              this.xiugaishow = true;
              this.show = false;
              for (let f = 0; f < response.data.recordsets[0].length; f++) {
                this.oldtableData.push(response.data.recordsets[0][f]);
              }

              console.log(this.oldtableData);
            } else {
              window.alert("暂无数据");
              this.show = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //获取当前这个工号在这个月已经填了的权重数据
    gethistory() {
      this.userid = window.sessionStorage.getItem("userid");
      let subMonth = this.Datetime.substring(0, 7);
      //获取上一个月的月份
      let upMonth = this.getPreMonth(this.Datetime);

      let params = {
        userid: this.userid,
        Month: upMonth
      };
      this.$axios({
        method: "GET",
        url: "http://172.0.0.116:82/gethistory",
        params: params,
        type: "json"
      })
        .then(response => {
          console.log(response.data.recordsets[0].length);
          if (response.data.recordsets[0].length !== 0) {
            this.xiugaishow = true;
            this.show = false;
            for (let f = 0; f < response.data.recordsets[0].length; f++) {
              this.oldtableData.push(response.data.recordsets[0][f]);
            }

            console.log(this.oldtableData);
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    riqi() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    send(j) {
      this.$axios({
        method: "POST",
        url: "http://172.0.0.116:82/postWeight",
        params: {
          userid: this.tableData[j].userid,
          xitongID: this.tableData[j].xitongID,
          Weight: this.tableData[j].Weight,
          Month: this.tableData[j].Month,
          Datetime: this.tableData[j].Datetime
        },
        type: "json"
      })
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            if (j + 1 === this.tableData.length) {
              window.alert("提交成功！！！");
              this.result2 = "";
              this.result = "";
              this.tableData = [];
              for (let m = 0; m < this.projectNameandid.length; m++) {
                this.projectNameandid[m].disabled = false;
              }
              this.gethistory();
            } else {
              this.send(j + 1);
            }
          } else {
            console.log("失败");
          }
        })
        .catch(err => {
          window.alert("提交失败，请联系管理员");
          this.result2 = "";
          this.result = "";
          console.log(err);
        });
    },

    sendTable() {
      let weightAdd = 0;
      for (let i = 0; i < this.tableData.length; i++) {
        weightAdd += Number(this.tableData[i].Weight);
      }
      if (
        Number(weightAdd.toFixed(2)) > 0.91 &&
        Math.round(weightAdd) === 1 &&
        Number(weightAdd.toFixed(1)) === 1.0
      ) {
        console.log(this.tableData);
        if (this.tableData === []) {
          window.alert("不能提交空的数据");
        } else {
          this.result = "正在";
          this.send(0);
        }
      } else {
        if (weightAdd.toFixed(1) > 1) {
          window.alert("权重值不能大于1");
        } else if (weightAdd.toFixed(1) < 1) {
          window.alert("权重值不能小于1");
        }
      }
    },
    removeByValue(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    deleteRow(index, rows) {
      console.log(index);
      console.log(rows[index]);
      console.log(rows[index].projectName);

      for (let m = 0; m < this.projectNameandid.length; m++) {
        if (rows[index].projectName === this.projectNameandid[m].projectname) {
          this.projectNameandid[m].disabled = false;
        }
      }

      rows.splice(index, 1);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    addList() {
      if (this.value === "" || this.weightNum === "" || this.Month === "") {
        window.alert("所有空格都需要填写~");
      } else {
        if (
          this.weightNum > 1 ||
          this.weightNum < 0.1 ||
          this.weightNum.length > 3
        ) {
          window.alert("权重只能在0~1之间,且小数点背后不能超过1位数");
        } else {
          for (let i = 0; i < this.projectName.length; i++) {
            if (this.value === this.projectName[i]) {
              this.sendxitongID = this.xitongID[i];
              console.log(this.xitongID[i]);
            }
          }

          let objmsg = {
            userid: this.userid,
            name: this.name,
            projectName: this.value,
            Weight: this.weightNum,
            xitongID: this.sendxitongID,
            Month: this.Month,
            Datetime: this.Datetime
          };
          this.tableData.push(objmsg);
          this.weightNum = "";
          console.log(objmsg);

          for (let k = 0; k < this.projectNameandid.length; k++) {
            if (this.value === this.projectNameandid[k].projectname) {
              this.projectNameandid[k].disabled = true;
            }
          }
          this.value = "";
        }
      }
    },
    xitongIDD() {
      console.log(this.value);
    }
  }
};
</script>

<style scoped>
h1,
h2,
h3 {
  text-align: center;
}

table {
  border: 1px solid gray;
}
.input1 {
  width: 200px;
}
/* .project {
  width: 500px;
} */
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.sendTable {
  margin-left: 90%;
  display: block;
}

.project {
  height: 500px;
}
.sendTable2 {
  margin-left: -10px;
}
</style>
