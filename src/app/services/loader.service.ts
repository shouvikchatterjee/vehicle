import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private subject = new Subject<any>();

  showLoader() {
    this.subject.next({ status: true });
  }

  hideLoader() {
    this.subject.next({ status: false });
  }

  onLoaderStatus(): Observable<any> {
    return this.subject.asObservable();
  }

}