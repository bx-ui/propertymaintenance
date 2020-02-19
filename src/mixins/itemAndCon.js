// 项目
// 根据项目获取供应商
// 根据供应商获取合同
import { getProject,getSupplier,getContract } from "@/api/maintenance/message.js";
export const mixinProject =  {
    data(){
        return{
            
        }
    },
    methods: {
        getPro(){
            return new Promise((resolve,reject) => {
                getProject().then(res => {
                    resolve(res.data.data)
                })
            })
        },
         getSupp(projectCode){
            return new Promise((resolve,reject) => {
                getSupplier({projectCode}).then(res => {
                    resolve(res.data.data)
                })
            })
        },
        getCon(supplierCode){
            return new Promise((resolve,reject) => {
                getContract({supplierCode}).then(res => {
                    resolve(res.data.data)
                })
            })
        }
        
    },
    created(){
        
    }
}