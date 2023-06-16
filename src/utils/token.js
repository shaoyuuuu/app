//对外暴露一个函数
export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token)
  }
  //删除token
  export const removeToken=()=>{
    localStorage.removeItem('TOKEN')
  }