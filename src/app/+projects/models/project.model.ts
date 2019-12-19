export class ProjectVM {
  id: string;
  isActive: boolean;
  createDate: string;

  constructor(){
    this.id = null;
    this.isActive = true;
    this.createDate = new Date().toISOString();
  }
}
