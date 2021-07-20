import { getRequest } from "./http";
    // 获取省份
    export const getProvince = () => {
      // axios.post:返回一个promise对象
      // promise(reslove,reject)
      // then中调用的函数本质就是reslove，它会将返回结果返回给promise对象的reslove函数
      return getRequest('Company/getProvince').then((res) => {
        return res.data.data
      })
    }

    // 获取城市
    export const getCity = (name) => {
      return getRequest(`Company/getCity?name=${name}`).then((res) => {
        return res.data
      })
    }
