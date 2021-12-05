import * as vscode from 'vscode';
import * as path from 'path'; 
import * as fs from 'fs';
import { match } from 'assert';

export default class JumpRule {
    private _workspaceDir = vscode.workspace.rootPath;
    private documentUri;
    private keyword;
    private projectRootPath = vscode.workspace.workspaceFile;
    private kwType;
    private uri="";
    constructor(document: vscode.TextDocument,kw:string,kwType:string) {
        this.documentUri = document.uri;
        this.keyword = kw;
        this.kwType = kwType;
        this.matchRule();
    }
    /**
     * 匹配 rule
    */
    private matchRule(){
        
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
            throw new Error(`kw:${this.keyword},kwtype:${this.kwType},没能正确匹配类型却还在请求匹配路径`);
        }
    }
}