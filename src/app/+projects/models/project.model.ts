export class ProjectVM {
  id: string;
  title: string;
  tasks: number;
  completedTasks: number;
  shortDescription: string;
  created: string;
  deadline: string;
  status: string;

  constructor(){
    this.id = null;
  }
}
