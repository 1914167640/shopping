import { v4 as uuidv4 } from 'uuid'

// 身份永久不变  本地存储
export const getUUID = () => {
  // 获取本地存储  
  let uuid = localStorage.getItem('uuid')
  //如果本地存储没有
  if(uuid === null){
    //就申请uuid , 并且向本地存储
    localStorage.setItem('uuid' , uuidv4())
  }
  return uuid
}