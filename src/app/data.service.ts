
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
  private sessionObj: any = {};

  constructor(private _http: Http) {
  }
  getSessionObj(){
    return this.sessionObj;
  }

  setSessionObj(_sessionObj) {
    for( const prop in _sessionObj ) {
      if (prop !== 'application' && prop !== 'status_cd') {
        this.setCookie(prop, _sessionObj[prop], 1);
        this.sessionObj[prop] = _sessionObj[prop];
      }
    }
  }

  callRestful(type:string,url:string,body?:any, headerObject?:any, includeHeader?:boolean) {
     var headerOption = {};
     if(includeHeader == null || includeHeader === true) {
       headerOption={
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
       };
     }
     if( headerObject ) {
       for( const prop in headerObject){
         headerOption[prop] = headerObject[prop];
       }
     }

    const headers = new Headers(headerOption);

    const options = new RequestOptions({ headers: headers});

    switch (type) {
      case 'GET':
        return this._http.get(url, options ).map(res => res.json()).catch(err => this.handleError(err));
      default:
        console.log('Debug at type request ' + type)
        return null;
    }

  }

  private handleError (error: Response | any, isNotError?: boolean) {
    if(!isNotError && !error.ok){
      if(error.status == 0)
        this.showMessage('error', 'Internet connection is not available.');
      else if(error.status == 502) this.showMessage('error', 'Something went wrong.');
      else if(error.status == 500) this.showMessage('error', 'Something went wrong.');
      else if(error.status == 400) {
        var msg = error.json() || '';
        this.showMessage('error', msg && msg['error_msg'] ? msg['error_msg'] : 'Something went wrong..');
      }
      else this.showMessage('error', 'Something went wrong.');
    }
    let errMsg: string;
    // TODO error message on screen
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body['error'] || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  showMessage(cssClass, msg) {
    const x = document.getElementById('alert-box');
    if(x) {
      var classType = '';
      x.innerHTML = msg;
      if (cssClass === 'error') classType = 'show-error';
      if (cssClass === 'success') classType = 'show-sucess';
      x.className = classType;
      setTimeout(function () {
        x.className = x.className.replace(classType, '');
      }, 3000);
    }
  }

  public deleteCookie(name) {
    this.setCookie(name, '', -1);
  }

  public setCookie(name: string, value: string, expireDays: number) {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + ';';
  }
}
