import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'moment';

@Injectable()
export class AppService {
  constructor(private titleService: Title) { }

  // Set page title
  set pageTitle(value: string) {
    this.titleService.setTitle(`${value}`);
  }

  // Check for RTL layout
  get isRTL() {
    return document.documentElement.getAttribute('dir') === 'rtl' ||
      document.body.getAttribute('dir') === 'rtl';
  }

  // Check if IE10
  get isIE10() {
    return typeof document['documentMode'] === 'number' && document['documentMode'] === 10;
  }

  // Layout navbar color
  get layoutNavbarBg() {
    return 'navbar-theme';
  }

  // Layout sidenav color
  get layoutSidenavBg() {
    return 'sidenav-theme';
  }

  // Layout footer color
  get layoutFooterBg() {
    return 'footer-theme';
  }

  // Animate scrollTop
  scrollTop(to: number, duration: number, element = document.scrollingElement || document.documentElement) {
    if (element.scrollTop === to) { return; }
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();

    // t = current time; b = start value; c = change in value; d = duration
    const easeInOutQuad = (t: any, b: any, c: any, d: any) => {
      t /= d / 2;
      if (t < 1) { return c / 2 * t * t + b; }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10);
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };

    animateScroll();
  }

  buildFormGroup(object: any, patchVal?: any): FormGroup {
    const controls = {};

    for (let key of Object.keys(object)) {
      if (Array.isArray(object[key])) {
        controls[key] = new FormArray([]);
      } else
        controls[key] = new FormControl(null, null);
    }

    const group = new FormGroup(controls);
    group.patchValue(patchVal || object);

    return group;
  }

  convertDateToNgbDate(d: Moment) {
    return {
      year: d.get('y'),
      month: d.get('M') +1,
      day: d.get('D')
    }
  }

  convertNgbDateToIsoDate(d: NgbDateStruct){
    const date = new Date(d.year, d.month -1, d.day);
    return date.toISOString().split('T')[0];
  }
}
