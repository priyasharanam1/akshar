import axios from 'axios'
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config'

const API_URL = 'http://localhost:8000'

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout: 10000,
    headers:{
        "content-type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config){
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.request.use(
    function (response){
        //stop global loader here
        return processResponse(response)
    },
    function (error){
        //stop global loader here
        return Promise.reject(processError(error))
    }
)


//if success => return {isSuccess: true, data: Object}
//if error => return {isFailure: true, status:string, msg:string, code: int}


const processResponse = (response) =>{
    if(response && response.status===200){
        return {isSuccess: true, data: response.data}
    }
    else{
        return{
            isFailure:true,
            status: response ? response.status : '',
            msg: response ? response.msg : '',
            code: response ? response.code : ''
        }
    }
}

const processError = (error) =>{
    if(error.response){
      //request made but server responded with a status code other than 2.x.x
      console.log('ERROR IN RESPONSE', error.toJSON())
      return{
        isError: true,
        msg: API_NOTIFICATION_MESSAGES.responseFailure,
        code: error.response.status
      }
    }
    else if(error.request){
      //request made but no response is received
      console.log('ERROR IN REQUEST', error.toJSON())
      return{
        isError: true,
        msg: API_NOTIFICATION_MESSAGES.requestFailure,
        code: ""
      }
    }
    else{
      //something happened in setting up request that led to this error and connection is not built
      console.log('ERROR IN NETWORK', error.toJSON())
      return{
        isError: true,
        msg: API_NOTIFICATION_MESSAGES.networkFailure,
        code: ""
      }
    }
}

const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data:body,
            responseType: value.responseType,
            // headers: {
            //     authorization: getAccessToken(),
            // },
            // TYPE: getType(value, body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };