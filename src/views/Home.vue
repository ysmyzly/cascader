<template>
  <div class="home">
    <el-cascader
      :disabled="viewDetails"
      v-model="sendAddress"
      :options="provenceArray"
      @active-item-change="handleItemChange"
      ref="myCascader"
      @change="onProvincesChange"
      :props="props"
      size="small"
    >
    </el-cascader>
  </div>
</template>

<script>
import { getProvince, getCity } from "../request/enterprises";
export default {
  name: "Home",
  data() {
    return {
      sendAddress: ["AHI"],
      provenceArray: [], // 省区数组
      props: {
        label: "value",
        value: "name",
        children: "children",
      },
    };
    // };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // item
    onProvincesChange() {
      this.sendAddressName =
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels;
      // console.log(item, this.$refs.myCascader.getCheckedNodes()[0].pathLabels)
    },
    // 利用active-item-change事件，可以在用户点击某个省份时拉取该省份下的城市数据
    handleItemChange(val) {
      let value = val[0];
      getCity(value).then((res) => {
        let cities = res.data.resourceList || [];
        for (let i = 0; i < this.provenceArray.length; i++) {
          if (this.provenceArray[i].name === value) {
            this.provenceArray[i].children = cities; // 视图未更新
            this.$set(this.provenceArray[i], i, cities); // 更新视图
            break;
          }
        }
        console.log(this.provenceArray, 999);
      });
    },
    getUserInfo() {
      getProvince({}).then((res) => {
        this.provenceArray = res.resourceList || [];
        this.provenceArray.forEach((item, index) => {
          this.provenceArray[index].children = []; // 视图未更新
          // this.$set(this.provenceArray[index], 'cities', []) // right
        });
        // console.log(this.provenceArray, "this.provenceArray");
      });
    },
  },
};
</script>
<style lang="scss">
.home {
  padding: 30px;
}
</style>
