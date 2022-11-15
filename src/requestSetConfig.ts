import type { RequestOptions } from '@@/plugin-request/request'
import type { RequestConfig } from '@umijs/max'
import { notification } from 'antd'
import { history } from '@umijs/max'

// // 错误处理方案： 错误类型
// enum ErrorShowType {
//   SILENT = 0,
//   WARN_MESSAGE = 1,
//   ERROR_MESSAGE = 2,
//   NOTIFICATION = 3,
//   REDIRECT = 9,
// }
// // 与后端约定的响应数据格式
// interface ResponseStructure {
//   success: boolean;
//   data: any;
//   errorCode?: number;
//   errorMessage?: string;
//   showType?: ErrorShowType;
// }

// /**
//  * @name 错误处理
//  * pro 自带的错误处理， 可以在这里做自己的改动
//  * @doc https://umijs.org/docs/max/request#配置
//  */
// export const errorConfig: RequestConfig = {
//   // 错误处理： umi@3 的错误处理方案。
//   errorConfig: {
//     // 错误抛出
//     errorThrower: (res) => {
//       const { success, data, errorCode, errorMessage, showType } =
//         res as unknown as ResponseStructure;
//       if (!success) {
//         const error: any = new Error(errorMessage);
//         error.name = 'BizError';
//         error.info = { errorCode, errorMessage, showType, data };
//         throw error; // 抛出自制的错误
//       }
//     },
//     // 错误接收及处理
//     errorHandler: (error: any, opts: any) => {
//       if (opts?.skipErrorHandler) throw error;
//       // 我们的 errorThrower 抛出的错误。
//       if (error.name === 'BizError') {
//         const errorInfo: ResponseStructure | undefined = error.info;
//         if (errorInfo) {
//           const { errorMessage, errorCode } = errorInfo;
//           switch (errorInfo.showType) {
//             case ErrorShowType.SILENT:
//               // do nothing
//               break;
//             case ErrorShowType.WARN_MESSAGE:
//               message.warn(errorMessage);
//               break;
//             case ErrorShowType.ERROR_MESSAGE:
//               message.error(errorMessage);
//               break;
//             case ErrorShowType.NOTIFICATION:
//               notification.open({
//                 description: errorMessage,
//                 message: errorCode,
//               });
//               break;
//             case ErrorShowType.REDIRECT:
//               // TODO: redirect
//               break;
//             default:
//               message.error(errorMessage);
//           }
//         }
//       } else if (error.response) {
//         // Axios 的错误
//         // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
//         message.error(`Response status:${error.response.status}`);
//       } else if (error.request) {
//         // 请求已经成功发起，但没有收到响应
//         // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
//         // 而在node.js中是 http.ClientRequest 的实例
//         message.error('None response! Please retry.');
//       } else {
//         // 发送请求时出了点问题
//         message.error('Request error, please retry.');
//       }
//     },
//   },

//   // 请求拦截器
//   requestInterceptors: [
//     (config: RequestOptions) => {
//       // 拦截请求配置，进行个性化处理。
//       const url = config?.url?.concat('?token = 123');
//       return { ...config, url };
//     },
//   ],

//   // 响应拦截器
//   responseInterceptors: [
//     (response) => {
//       // 拦截响应数据，进行个性化处理
//       const { data } = response as unknown as ResponseStructure;

//       if (data?.success === false) {
//         message.error('请求失败！');
//       }
//       return response;
//     },
//   ],
// };

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
import { SECURITY_OAUTH2_IGNORE_URL } from '@/constants/url'

/** 请求拦截 */
const requestInterceptor = (url: any, options: any): any => {
  const headers = {
    ...options.headers
  }
  const match = SECURITY_OAUTH2_IGNORE_URL.some((item) => url.indexOf(item) > -1)
  if (!match) {
    debugger
    // /* 非登录接口都要通过token请求 */
    // if (!url.includes('/oauth2/token')) {
    //   headers['Authorization'] = cacheGetSync('accessToken')
    // } else {
    //   headers['Authorization'] = 'Basic ' + (process.env.TARO_ENV === 'h5' ? process.env.APP_CLIENT : process.env.WX_CLIENT)
    // }
  }

  return {
    url: url,
    options: { ...options, headers: headers }
  }
}
/** 响应拦截 */
const responseInterceptors = (response: any): any => {
  if (response.status !== 200) {
    switch (response.status) {
      case 401:
        notification.warn({
          message: '登录超时，请重新登陆!'
        })
        history.push('/login')
        break
    }
  }
  return response
}
/** 异常处理程序 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
const errorHandler = (error: any, opts: any) => {
  if (opts?.skipErrorHandler) throw error
  const { response } = error
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status, url } = response
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText
    })
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常'
    })
  } else {
    // 发送请求时出了点问题
    notification.error({
      message: '发生位置异常'
    })
  }
  return response
}

console.log(`${API_URL}`)

// request运行时配置
export const request: RequestConfig = {
  timeout: 3000, //请求超时时间
  baseURL: `${API_URL}`,
  // prefix: process.env.NODE_ENV === "production" ? config.baseurl :'api/', // 统一的请求前缀

  // 自定义端口规范(可以对后端返回的数据格式按照我们的需求进行处理)
  errorConfig: {
    errorHandler: errorHandler
  },
  //请求错误处理
  requestInterceptors: [requestInterceptor], //请求拦截
  responseInterceptors: [responseInterceptors] //响应拦截
}
