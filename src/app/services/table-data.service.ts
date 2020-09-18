import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  private btnSubject = new Subject<any>();
  public btnState = this.btnSubject.asObservable();
  private rowsToBeShown;

  constructor() { }

  /**
   * set number of rows to be shown
   * @param val 
   */
  setRowsToBeShown(val){
    this.rowsToBeShown = val;
  }

  /**
   * get number of rows to be shown
   */
  getRowsToBeShown(){
    return this.rowsToBeShown;
  }

  /**
   * next button
  */
  nextHandler() {
    this.btnSubject.next('next');
  }

  /**
   * prev button
   */
  prevHandler() {
    this.btnSubject.next('prev');
  }
  
  /**
   * page number handler
   * @param pageNum 
   */
  pageHandler(pageNum) {
    this.btnSubject.next(pageNum);
  }
}
