export class BreadcrumbVM {
  name: string;
  url: string;
  isLast: boolean;

  constructor() {
    this.name = null;
    this.url = null;
    this.isLast = false;
  }
}
