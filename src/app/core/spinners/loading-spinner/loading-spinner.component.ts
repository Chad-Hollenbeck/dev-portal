import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {

  // private validSpinnerTypes: Array<string>;
  // private validTextTypes: Array<string>;
  private isShowing = false;

  @Input() spinnerType: string;
  @Input() textType: string;
  @Input() id: string;
  @Input() group: string;
  @Input()
  get show(): boolean {
    return this.isShowing;
  }

  @Output() showChange = new EventEmitter();
  set show(val: boolean) {
    this.isShowing = val;
    this.showChange.emit(this.isShowing);
  }

  constructor(private spinnerService: SpinnerService) {
    // this.validSpinnerTypes = ['border', 'grow'];
    // this.validTextTypes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
    this.show = false;
  }

  ngOnInit() {
    if (!this.id) throw new Error("Spinner must have an ID.");
    if (!this.spinnerType) throw new Error("Spinner must have a type. Valid values: ('border'|'grow')");
    if (!this.textType) throw new Error("Text must have a type. Valid values: ('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')");

    // Default values
    if (!this.group) this.group = 'default';
    if(typeof this.show == undefined) this.show = true;
    // Register spinner with service
    this.spinnerService._register(this);
  }

  ngOnDestroy() {
    this.spinnerService._unregister(this);
  }

}
