import * as vscode from 'vscode';
import * as path from 'path';
import jumpRule from './JumpRule';
import {getMathKeyword} from "./util";


export default class DefinitionProvider implements vscode.DefinitionProvider {
    constructor() {
    }
    provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Definition> {
      // 当前行
      const textLine = document.lineAt(position);

      let {kwType,kw} = getMathKeyword({ textLine: textLine.text, position: position });

      if(kwType!== ""){
        let jumprule = new jumpRule(document,kw,kwType);
        if(jumprule.isMatch()){
            return  new vscode.Location(jumprule.getUri(),new vscode.Range(0, 0, 0, 0));
        }
      }else{
        console.log("没有识别",textLine.text);
      }

    //   let uri = vscode.Uri.file("filePath");
      
    //   let range = new vscode.Range(0, 0, 0, 0);
    //   return new vscode.Location(uri,range);
    }
}