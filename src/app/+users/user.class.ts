
export class UserVM {
  id: string;
  name: string;
  email: string;
  roles: UserPermission;
  isPending: boolean;
  isActive: boolean;
  isEmployee: boolean;
  lastLoginTimestamp: string;
  photoURL: string;

  constructor(){
    this.id = null;
    this.name = null;
    this.email = null;
    this.isPending = true;
    this.isActive = true;
    this.isEmployee = true;
    // this.roles = new UserPermission();
  }
}

export class UserPermission{
  'OWL-ADMIN' : boolean;
  // 'OWL-EMPLOYEE': boolean;
  'TIME-ENTRY-APPROVER': boolean;
  'DOOR-ACCESS-24-7' : boolean;

  constructor(){
    this["DOOR-ACCESS-24-7"] = false;
    this["OWL-ADMIN"] = false;
    this["TIME-ENTRY-APPROVER"] = false;
  }
}
