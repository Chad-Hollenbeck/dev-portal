import { ClassAttributeVM } from './class-attribute.model';

export class ClassConfigVM {
  className: string;
  attributes: ClassAttributeVM[]

  // Constructor
  constructor(){
    this.className = null;
    this.attributes = [];
  }
}
