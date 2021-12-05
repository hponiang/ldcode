import LoadAliases from "./loadAliases";


export default class PhpLoader extends LoadAliases{
    private namespace:string = "";
    /**
     * 将 kw 展开，变成路径
    */
    pathUnfold():string{
        let parts = this.kw.split(":");
        if(parts.length===3){
            this.namespace = parts[0];
            return this.getAliaseMeta(parts[1],parts[2]);
        }else if(parts.length===2){
            this.namespace = "";
            return this.getAliaseMeta(parts[0],parts[1]);
        }else{
            throw new Error(`无法解析 错误的 kw：${this.kw}`);
        }
    }

    /**
     * 将 kw 展开，变成路径,暂时中支持service dao  如果要支持其它类型要重写该方法
    */
    getAliaseMeta(middle:string,name:string):string{

        let aliaseMeta = `${this.getNamespacePrefix(middle)}/Impl/${name}Impl.php`;
        return aliaseMeta;
        
    }

    getNamespacePrefix(middle:string){
        let prefix = 'Dao';
        if(this.kwType === 'service'){
            prefix = 'Service';
        }
        let namespace =  "";
        // if(this.namespace !==""){
        //     namespace = this.namespace+"/Biz";
        // }
        return `${middle}/${prefix}`;
    }

    /**
     * 返回需要查询找路径
    */
    locationPath():string[]{
        let paths = [];
        // 为空时说明可能在vendor/codeages/biz-framework/src/ 或 src 下
        if(this.namespace === ""){
            // 注意顺序很重要
            paths.push("src/CustomBundle/Biz" ,"vendor/codeages/biz-framework/src","vendor/codeages/biz-item-bank/src","vendor/codeages/biz-order-pay/src","vendor/codeages/biz-rate-limiter/src","src/Biz");
        }else if(this.namespace === "CustomBundle"){
            paths.push("src/CustomBundle/Biz");
        }else if('Plugin'.indexOf(this.namespace)){ // 插件目录 
            paths.push("plugins/"+this.namespace+ "/Biz");
        }else{
            throw new Error(`无法解析namespace:${this.namespace}`);
        }

        return paths;
    }
}