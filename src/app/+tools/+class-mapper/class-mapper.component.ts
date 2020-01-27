import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { Subscription } from 'rxjs';
import { ClassConfigVM } from '../models/class-config.model';
import * as _ from 'lodash';
import { ClassAttributeVM } from '../models/class-attribute.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-class-mapper',
  templateUrl: './class-mapper.component.html',
  styleUrls: []
})
export class ClassMapperComponent implements OnInit, OnDestroy {

  loading: boolean;

  subs: Subscription;

  sourceLanguages: string[];
  destinationLanguages: string[];

  fromLanguage: string;
  toLanguage: string;

  sourceCode: string;
  convertedCode: string;

  constructor(private appService: AppService, private toastr: ToastrService) {
    this.appService.pageTitle = 'Class Mapper';

    this.subs = new Subscription();

    const languages = ['C#', 'Typescript'];

    this.sourceLanguages = [languages[0]];
    this.destinationLanguages = [languages[1]];

    this.fromLanguage = languages[0]
    this.toLanguage = languages[1]
  }

  ngOnInit() {
  }

  convertClass(){
    const sourceLines = this.sourceCode.split('\n');

    let sourceConfig = null;
    let parsedCode = null;

    switch (this.fromLanguage) {
      case this.sourceLanguages[0]:
        sourceConfig = this.parseSourceCSharp(sourceLines);
        break;
      default:
        sourceConfig = this.parseSourceTypescript(sourceLines);
        break;
    }

    switch (this.toLanguage) {
      case this.destinationLanguages[0]:
      this.convertedCode = this.exportSourceTypescript(sourceConfig);
        break;
      default:
      this.convertedCode = this.exportSourceCSharp(sourceConfig);
        break;
    }
  }

  confirmCopy(){
    this.toastr.success("Code Copied to Clipboard");
  }

  private parseSourceCSharp(lines: string[]): ClassConfigVM {
    const config = new ClassConfigVM();

    _.each(lines, (line) => {
      const res = this.parseCSharpLine(line);

      if(typeof res == 'string' && res != ''){
        // We have a class line
        config.className = res;
      }

      if(typeof res == 'object'){
        config.attributes.push(res);
      }
    })

    return config;
  }

  private parseCSharpLine(line: string): ClassAttributeVM | string {
    if(line.indexOf('class') > -1){
      // We found the class name
      return line.replace(' ', '').split('class')[1].split(':')[0].trim();
    }

    if(line.indexOf('public') > -1 || line.indexOf('private') > -1){
      // we found an attribute
      const attrParts = line.trim().split(' ');

      return { name: attrParts[2].substr(0,1).toLowerCase() + attrParts[2].substr(1), type: this.getCSharpAttrType(attrParts[1])};
    }

    return '';
  }

  private getCSharpAttrType(type: string){
    const t = type.toLowerCase();
    let isArray = false;
    let newType: string = null;

    if(t.indexOf('array') > -1 || t.indexOf('list') > -1){
      isArray = true;
    }


    if (t === 'int' || t === 'double' || t === 'decimal') {
      newType = 'number';
    }

    if (t === 'string' || t === 'guid') {
      newType = 'string';
    }

    if (t === 'bool' || t === 'boolean') {
      newType = 'boolean';
    }

    if (newType === null) {
      newType = type;
    }

    if(isArray){
      newType = newType.split('<')[1].split('>')[0] + '[]';
    }

    return newType;

  }

  private parseSourceTypescript(lines: string[]): ClassConfigVM{
return null;
  }

  private exportSourceCSharp(config: ClassConfigVM): string{
    return '';
  }

  private exportSourceTypescript(config: ClassConfigVM): string{
    let results = 'export class ' + config.className + '{\n';
    let constructor = 'constructor() {\n';
    const space = '  ';
    const dblSpace = space + space;

    // Append attributes
    _.each(config.attributes, (attr) => {
      results += space + attr.name + ' : ' + attr.type + ';\n';
      constructor += dblSpace + 'this.' + attr.name + '= null;\n';
    });

    results += '\n' + space + constructor + space + '}\n}'; // constructor and closing brackets

    return results;
  }

  ngOnDestroy(){
    if(this.subs && !this.subs.closed){
      this.subs.unsubscribe();
    }
  }

}
