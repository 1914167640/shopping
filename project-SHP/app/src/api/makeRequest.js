// 对于axios进行了二次封装
import axios  from "axios"
// 引入进度条
import nProgress from "nprogress"
// 引入进度条样式
import 'nprogress/nprogress.css'

// 1:利用axios对象的方法create,去创建一个axios实例
// 2:requests就是axios , 只不过稍微配置一下
const requests = axios.create({
	// 配置对象
	// 基础路径，发请求的时候，路径当中会出现api
	baseURL : '/mock' , 
	// 代表请求超时的时间
	timeout : 5000 
})

// 请求拦截器:在发请求之前 , 请求拦截器可以检测到 , 可以在请求发出去之前做一些事情
// config:配置对象 , 对象里面有一个属性很重要 , header请求头
requests.interceptors.request.use(config => { 
	//进度条开始动
	nProgress.start()
	return config
})

// 响应拦截器
// 成功的回调函数：服务器相应的数据回来以后 , 响应拦截器可以检测到 , 可以做一些事情 , 响应失败的抛出异常
requests.interceptors.response.use(res => {
	// 进度条结束
	nProgress.done()
	return res.data
} , error => Promise.reject(new Error('faile')))

// 暴露axios
export default requests