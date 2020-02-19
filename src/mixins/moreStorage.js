export const mixinText =  {
    data(){
        return{
            moreStorageData: "",
        }
    },
    methods: {
        // 取
         getStore(name){
            console.log("进来了");
           this.moreStorageData = window.localStorage.getItem(name);
           
            if(this.moreStorageData){
                this.moreStorageData = JSON.parse(this.moreStorageData);
            }
            // console.log(this.moreStorageData)
            return this.moreStorageData;
        },
        // 存
        setStore(name,obj){
            console.log(name)
            console.log(obj);
            window.localStorage.setItem(name,JSON.stringify(obj))
        },
                    
    },
    created(){
        // this.getStore();
    }
}