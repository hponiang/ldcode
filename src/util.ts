import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';



/**
 * 获取当前所在工程根目录，有3种使用方法：<br>
 * getProjectPath(uri) uri 表示工程内某个文件的路径<br>
 * getProjectPath(document) document 表示当前被打开的文件document对象<br>
 * getProjectPath() 会自动从 activeTextEditor 拿document对象，如果没有拿到则报错
 * @param {*} document 
 */
 export function getProjectPath() {
    // let document = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document : null;

    // const currentFile = (document.uri ? document.uri : document).fsPath;
    // let projectPath = null;

    // let workspaceFolders = vscode.workspace.workspaceFolders?.map(item => item.uri.path);
    // // 由于存在Multi-root工作区，暂时没有特别好的判断方法，先这样粗暴判断
    // // 如果发现只有一个根文件夹，读取其子文件夹作为 workspaceFolders
    // if (workspaceFolders.length == 1 && workspaceFolders[0] === vscode.workspace.rootPath) {
    //     const rootPath = workspaceFolders[0];
    //     var files = fs.readdirSync(rootPath);
    //     workspaceFolders = files.filter(name => !/^\./g.test(name)).map(name => path.resolve(rootPath, name));
    //     // vscode.workspace.rootPath会不准确，且已过时
    //     // return vscode.workspace.rootPath + '/' + this._getProjectName(vscode, document);
    // }
    // workspaceFolders.forEach(folder => {
    //     if (currentFile.indexOf(folder) === 0) {
    //         projectPath = folder;
    //     }
    // });
    // if (!projectPath) {
    //     throw new Error("获取工程根路径异常！");
    // }
    return vscode.workspace.rootPath;
}

/**
 * 获取匹配的关键字，获取光标所在位置用",'包裹的字符串
 * @param text 内容
 * @param position 光标所在的位置
 * @returns 匹配字符，末匹配中时返回""
 */
export function getMathKeyword({ textLine, position }: { textLine: string; position: vscode.Position; }):{kwType:string,kw:string,kwRange: vscode.Range}{

    function checkType(k:string){
        let type = "";
        if(/^(([a-zA-Z]*)\:([a-zA-Z]*)){1,2}Service$/.test(k)){  // 匹配Servcie 
            return "service";
        }else if(/^(([a-zA-Z]*)\:([a-zA-Z]*)){1,2}Dao$/.test(k)){// 匹配Dao
            return "dao";
        }else{
            return "";
        } 
    }
    console.log("匹配到",textLine,"position:",position);

    let positionIndex = position.character;

    //匹配成对出现的单双引号
    var patt = /'((?:\\.|[^'])*)'|"((?:\\.|[^"])*)"/igm;
    var matcher;
    let range = new vscode.Range(0,0,0,0);
    while ( matcher = patt.exec(textLine)) {
        // 匹配成功，光标在引号对中的位置
        if(matcher.index <=positionIndex && positionIndex<= patt.lastIndex)  {
            let startIndex = matcher.index+1,endIndex = patt.lastIndex-1;
            let keyword = textLine.slice(startIndex, endIndex);
            let type =  checkType(keyword);
            if(type){
                // 光标匹配的关键字位置
                range = new vscode.Range(position.line, startIndex, position.line, endIndex);
                return {kwType:type,kw:keyword,kwRange:range};
            }
        }
      }
      return {kwType:"",kw:"",kwRange: range};
}