import { Injectable } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@Injectable()
export class SpinnerService {

  private spinnerCache = new Set<LoadingSpinnerComponent>();

  _register(spinner: LoadingSpinnerComponent): void {
    this.spinnerCache.add(spinner);
  }

  _unregister(spinnerToRemove: LoadingSpinnerComponent): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner === spinnerToRemove) {
        this.spinnerCache.delete(spinner);
      }
    });
  }

  show(spinnerId: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.id === spinnerId) {
        spinner.show = true;
      }
    });
  }

  hide(spinnerId: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.id === spinnerId) {
        spinner.show = false;
      }
    });
  }

  showGroup(spinnerGroup?: string): void {
    if (!spinnerGroup) spinnerGroup = 'default';
    this.spinnerCache.forEach(spinner => {
      if (spinner.group === spinnerGroup) {
        spinner.show = true;
      }
    });
  }

  hideGroup(spinnerGroup?: string): void {
    if (!spinnerGroup) spinnerGroup = 'default';
    this.spinnerCache.forEach(spinner => {
      if (spinner.group === spinnerGroup) {
        spinner.show = false;
      }
    });
  }

  showAll(): void {
    this.spinnerCache.forEach(spinner => spinner.show = true);
  }

  hideAll(): void {
    this.spinnerCache.forEach(spinner => spinner.show = false);
  }

  isShowing(spinnerId: string): boolean | undefined {
    let showing = undefined;
    this.spinnerCache.forEach(spinner => {
      if (spinner.id === spinnerId) {
        showing = spinner.show;
      }
    });
    return showing;
  }
}
