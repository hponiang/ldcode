import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';
import {getProjectPath} from "../util";

export default abstract class LoadAliases{
    protected kwType:string;
    protected kw:string;
    private docroot = getProjectPath();
    constructor(kw:string,kwType:string){
        this.kw = kw;
        this.kwType = kwType;
    }

    /**
     * 按目录查询是否包括含有文件
     * @param 文件路径数组形，比如可以同时查找 /Users/ismedt/Downloads/ldcode/src/，/Users/ismedt/Downloads/ldcode/plugins ,/Users/ismedt/Downloads/ldcode/vendor
     * @param 文件路径 可以是文件相对路径的一部分  Announcement/Service/Impl/AnnouncementServiceImpl
    */
    public find():string{
        // for( let path in paths){
        //     if(fs.existsSync(path)){
        //         const files = fs.readdirSync(path).filter(f => {
        //             if (filePaht.indexOf(f) > -1) {return false;}
        //             if (f.includes('.')) {return false;}
        //             return true;
        //           });
        //           return files;
        //     }
        // }workspaceFile

        let aliasePath = this.pathUnfold();
        let paths = this.locationPath();
        let files = [];
        
        for(let f in paths){
            let file =   this.docroot+"/"+paths[f]+"/"+aliasePath;
            console.log('查找文件：' + file);
            if(fs.existsSync(file)){
                return file;
            }
        };
        return "";
    }

    abstract pathUnfold():string;

    /**
     * 返回应该查询的路径
     * @returns 返回不同 type 应该查询的路径
    */
    abstract locationPath():string[];

}