import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { Subscription } from 'rxjs';
import { ClassConfigVM } from '../models/class-config.model';
import * as _ from 'lodash';
import { ClassAttributeVM } from '../models/class-attribute.model';

@Component({
  selector: 'app-class-mapper',
  templateUrl: './class-mapper.component.html',
  styleUrls: []
})
export class ClassMapperComponent implements OnInit, OnDestroy {

  loading: boolean;

  subs: Subscription;

  languages: string[];

  fromLanguage: string;
  toLanguage: string;

  sourceCode: string;
  convertedCode: string;

  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Class Mapper';

    this.subs = new Subscription();

    this.languages = ['C#', 'Typescript']
  }

  ngOnInit() {
  }

  convertClass(){
    const sourceLines = this.sourceCode.split('\n');

    let sourceConfig = null;
    let parsedCode = null;

    switch (this.fromLanguage) {
      case this.languages[0]:
        sourceConfig = this.parseSourceCSharp(sourceLines);
        break;
      default:
        sourceConfig = this.parseSourceTypescript(sourceLines);
        break;
    }

    switch (this.toLanguage) {
      case this.languages[0]:
        this.convertedCode = this.exportSourceCSharp(sourceConfig);
        break;
      default:
      this.convertedCode = this.exportSourceTypescript(sourceConfig);
        break;
    }
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
    if(line.indexOf('class')){
      // We found the class name
      return line.replace(' ', '').split('class')[1];
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
      newType = t+'VM';
    }

    if(isArray){
      return newType + '[]';
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
    let results = 'export class ' + config.className + 'VM {\n';
    let constructor = 'constructor() {\n';

    // Append attributes
    _.each(config.attributes, (attr) => {
      results += attr.name + ' : ' + attr.type + ';\n';
      constructor += 'this.' + attr.name + '= null;';
    });

    results += '\n' + constructor + '} \n }'; // constructor and closing brackets

    return results;
  }

  ngOnDestroy(){
    if(this.subs && !this.subs.closed){
      this.subs.unsubscribe();
    }
  }

}
