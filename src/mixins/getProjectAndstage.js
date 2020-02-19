import { getProject } from "@/api/maintenance/three.js";
export const mixinText =  {
    data(){
        return{
            option: "",
        }
    },
    methods: {
        getPro(){
            return new Promise((resolve,reject) => {
                getProject({type: 1}).then(res => {
                    console.log(res);
                    this.option = res.data.data;
                    resolve(res.data.data);
                })
            })
        },
        changePro(parentCode){
           return new Promise((resolve,reject) => {
                getProject({type: 2, parentCode}).then(res => {
                    resolve(res.data.data);
                })
           })
        },
                    
    },
    created(){
        // this.getStore();
    }
}