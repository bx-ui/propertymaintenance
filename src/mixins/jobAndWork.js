// 获取职能 
// 根据职能获取岗位
import { getParentCodeList,getCodeList } from "@/api/maintenance/message.js";
export const mixinWork =  {
    data(){
        return{
            
        }
    },
    methods: {
        getParentCode(){
            return new Promise((resolve,reject) => {
                getParentCodeList().then(res => {
                    resolve(res.data);
                })
            })
        },
        getCode(parentCode){
            return new Promise((resolve,reject) => {
                getCodeList({parentCode}).then(res => {
                    resolve(res.data);
                })
            })
        }            
    },
    created(){
        
    }
}