import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

/**
 * 获取匹配的关键字，获取光标所在位置用",'包裹的字符串
 * @param text 内容
 * @param position 光标所在的位置
 * @returns 匹配字符，末匹配中时返回""
 */
export function getMathKeyword({ TextLine, position }: { TextLine: string; position: vscode.Position; }):{kwType:string,kw:string,kwRange: vscode.Range}{

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
    console.log("匹配到",TextLine,"position:",position);

    let positionIndex = position.character;

    //匹配成对出现的单双引号
    var patt = /'((?:\\.|[^'])*)'|"((?:\\.|[^"])*)"/igm;
    var matcher;
    let range = new vscode.Range(0,0,0,0);
    while ( matcher = patt.exec(TextLine)) {
        // 匹配成功，光标在引号对中的位置
        if(matcher.index <=positionIndex && positionIndex<= patt.lastIndex)  {
            let startIndex = matcher.index+1,endIndex = patt.lastIndex-1;
            let keyword = TextLine.slice(startIndex, endIndex);
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