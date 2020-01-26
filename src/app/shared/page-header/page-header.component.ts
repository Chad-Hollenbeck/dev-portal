import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbVM } from '../breadcrumb.model';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  public breadcrumbs: BreadcrumbVM[];

  constructor(private router: Router) {
    this.breadcrumbs = [];
   }

  ngOnInit() {
    this.breadcrumbs = [];
    let sumParts = '';
    const parts = this.router.url.split('?')[0].split('/');
    for (let i = 0; i < parts.length; i++) {

      const segment = parts[i];

      // If the part is valid, add it to breadcrumb items
      if (segment && segment != '') {
        // Update the running total
        sumParts += '/' + segment;

        const name = segment.substr(0, 1).toUpperCase() + segment.substr(1);
        this.breadcrumbs.push({ name: name, url: sumParts, isLast: false });
      }
    }

    // Set last to active
    this.breadcrumbs[this.breadcrumbs.length -1].isLast = true;
  }

}
