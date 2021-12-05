import * as vscode from 'vscode';
import * as path from 'path'; 
import * as fs from 'fs';
import { match } from 'assert';
import phploader from './loadAliases/PhpLoader';
import LoadAliases from './loadAliases/loadAliases';

export default class JumpRule {
    private documentUri;
    private kw;
    private kwType;
    private uri="";
    constructor(document: vscode.TextDocument,kw:string,kwType:string) {
        this.documentUri = document.uri;
        this.kw = kw;
        this.kwType = kwType;
        this.matchRule();
    }
    /**
     * 匹配 rule
    */
    private matchRule(){
        if(this.kwType === 'service' || this.kwType ==='dao'){
            let loader:LoadAliases =new phploader(this.kw,this.kwType);
            this.uri = loader.find();
        }
    }

    /**
     * 是否有效匹配判断
     * @returns  boolean true 匹配成功  false匹配失败
     */    
    public isMatch():boolean{
        if(this.uri === ""){
            return false;
        }
        return true;
    }

    /**
     * 获取匹配有效路径
     * @returns vscode.Uri 返回访问路径对象
     */
    public getUri():vscode.Uri{
        if(this.uri !== ""){
            return vscode.Uri.file(this.uri);
        }else{
            throw new Error(`kw:${this.kw},kwtype:${this.kwType},没能正确匹配类型却还在请求匹配路径`);
        }
    }
}