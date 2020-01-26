export class ProjectVM {
  id: string;

  createDate: number;
  description: string;
  isComplete: boolean;
  git_url: string;
  html_url: string;
  language: string;
  name: string;
  openIssues: number;
  size: number;
  updateDate: string;


  constructor(){
    this.id = null;
  }
}
