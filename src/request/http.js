import axios from "axios";
import router from "../router/index";
// 服务器ip
const baseUrl = `${process.env.VUE_APP_BASE_API}api/v1/`
console.log(baseUrl,process.env.VUE_APP_BASE_API,'baseUrl')


// 拦截器---------------------------------------------------------
// 请求拦截
axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(err) {
    // alert("请求超时");
    return Promise.resolve(err);
  }
);

// 响应拦截
axios.interceptors.response.use(
  function(data) {
    var code = data.data.code;
    // 拦截禁用状态
    if (code == -10004) {
      router.push({ name: "login", params: { msg: data.data.msg } });
    }
    if (code == 401) {
      window.localStorage.setItem("token", "");
      router.push({ name: "login", params: { msg: data.data.msg } });
    }
    // 登录挤下线
    if (code == -10010) {
      router.push({ name: "login", params: { msg: "账号已在其他设备登录" } });
      return;
    }
    return data;
  },
  function(err) {
    // this.$message.error(err);
    console.log("请求错误！");
    if (
      err.response.status === 504 ||
      err.response.status === 404 ||
      err.response.status == 500
    ) {
      router.push({
        name: "error",
        params: { tip: "服务器出现错误，请重新刷新页面" },
      });
    } else
     if (err.response.status === 401) {
      window.localStorage.setItem("token", "");
      router.push({ name: "Login", params: { msg: "登录超时" } });
    } else if (err.response.status == 403) {
      router.push({ name: "error", params: { tip: "您没有权限访问" } });
    }
    return Promise.resolve(err.response);
  }
);
// ---------------------------------------------------------

// 请求封装
export function postRequest(url, params) {
  return axios({
    method: "post",
    url: baseUrl + url,
    data: params,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      },
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      token: window.localStorage.getItem("token") || "",
      // token:'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxNTIwMDAwMDAxMCIsInNjb3BlIjpbImFsbCJdLCJicmFuZElkIjoiMSIsIm5hbWUiOiJzc3DmtYvor5XotKblj7ciLCJpZCI6IjE0MTQ4MzMwNDg0OTAzNDg1NDUiLCJleHAiOjE2MjY1MTczNjUsImF1dGhvcml0aWVzIjpbIkNPTU1PTiJdLCJqdGkiOiI1YTczZjMyNy0yMjYzLTRiYzYtOTk3Zi0xZjg0ZDNkYzFjN2UiLCJ0bWNIb3RlbElkIjoiNTYxNzk0IiwiY2xpZW50X2lkIjoiY2xpZW50LWFwcCIsInVzZXJuYW1lIjoiMTUyMDAwMDAwMTAiLCJ0bWNIb3RlbENvbnRyYWN0IjoiIn0.bGbDzubr6YysFeAVu2eOUoviO4LfSUziYqq4p_8O7lLurGfXBT2iF714itzvpKiLN1-wLQpNh_qV0Z0aDaQ2I-Nv48lBY3Zs05W2BiDSW5RyT4vmx87kD7IJIFwAZ4GvSVE9RGaTHociqGWv65AHqVuZZC5ZEhxGCvFMMLHFauY'
    },
  });
}
export function postRequestJSON(url, params) {
  return axios({
    method: "post",
    url: baseUrl + url,
    data: params,
    headers: {
      "Content-Type": "application/json",
      token: window.localStorage.getItem("token") || "",
    },
  });
}
// 接收文件流
export function postRequestBolob(url, params) {
  return axios({
    method: "post",
    url: baseUrl + url,
    data: params,
    responseType: "blob",
    headers: {
      "Content-Type": "application/json",
      token: window.localStorage.getItem("token") || "",
    },
  });
}
//formData形式 append
export function postRequesFile(url, params) {
  return axios({
    method: "post",
    url: baseUrl + url,
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
      token: window.localStorage.getItem("token") || "",
    },
  });
}
export function putRequest(url, params) {
  return axios({
    method: "put",
    url: baseUrl + url,
    data: params,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      },
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      token: window.localStorage.getItem("token") || "",
    },
  });
}
export function putRequestJSON(url, params) {
  return axios({
    method: "put",
    url: baseUrl + url,
    data: params,
    headers: {
      "Content-Type": "application/json",
      token: window.localStorage.getItem("token") || "",
    },
  });
}

export function deleteRequest(url) {
  return axios({
    method: "delete",
    url:baseUrl + url,
    headers: {
      token: window.localStorage.getItem("token") || "",
    },
  });
}

export function getRequest(url) {
  return axios({
    method: "get",
    url: baseUrl + url,
    headers: {
      token: window.localStorage.getItem("token") || "",
    },
  });
}
// 后台返回图片img显示---------------------------------
export function getFileRequest(url) {
  return axios({
    method: "get",
    url: baseUrl + url,
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      token: window.localStorage.getItem("token") || "",
    },
  });
}
