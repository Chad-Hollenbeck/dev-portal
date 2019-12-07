import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AppService } from '@app/app.service';
import { userRouteNames } from '../_config/users.routes.names';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  isRTL: boolean;

  detailsRoute = `./`;

  constructor(private appService: AppService, private userService: UserService
  ) {
    this.appService.pageTitle = 'Users';
    this.isRTL = appService.isRTL;
  }

  ngOnInit() {
    this.loadData();
  }

  // Filters
  filterPending = 'Any';
  filterRole = 'Any';

  // Table

  // Options
  // dataUrl = 'assets/json/pages_users_list.json';
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'name';
  sortDesc = false;
  perPage = 20;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  usersData: Object[] = [];
  originalUsersData: Object[] = [];



  loadData() {
    this.userService.getAllUsers()
      .subscribe((data: any) => {
        this.originalUsersData = data.slice(0);
        this.update();
      });
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    const data = this.filter(this.originalUsersData);

    this.totalItems = data.length;

    this.sort(data);
    this.usersData = this.paginate(data);
  }

  filter(data) {
    const filter = this.filterVal.toLowerCase();
    return !filter ?
      data.slice(0) :
      data.filter(d => {
        return Object.keys(d)
          .filter(k => this.searchKeys.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(filter) !== -1 || !filter;
      });
  }

  sort(data) {
    data.sort((a: any, b: any) => {
      a = typeof (a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof (b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) { return this.sortDesc ? 1 : -1; }
      if (a > b) { return this.sortDesc ? -1 : 1; }
      return 0;
    });
  }

  paginate(data) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  setSort(key) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }

    this.currentPage = 1;
    this.update();
  }
}
