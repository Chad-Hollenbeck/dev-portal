
export class SlimUserVM {
  id: string; // Document ID
  name: string; // Item Name


  /**
   * Add all params with a default value
   * that need to be included in the
   * associated reactive form generated
   * in the corresponding service
   */
  constructor(){
    this.id = null;
    this.name = null;
  }
}
