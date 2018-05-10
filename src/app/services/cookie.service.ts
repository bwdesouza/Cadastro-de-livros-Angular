import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  constructor() { }

  set(name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + encodeURIComponent(value) +

    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
    document.cookie = curCookie;
  }

  get(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
           begin = dc.indexOf(prefix);
           if (begin != 0) return null;
    } else
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    end = dc.length;
    return decodeURIComponent(dc.substring(begin + prefix.length, end));
  }

  delete(name, path, domain) {
    if (this.get(name)) {
           document.cookie = name + "=" + 
           ((path) ? "; path=" + path : "") +
           ((domain) ? "; domain=" + domain : "") +
           "; expires=Thu, 01-Jan-70 00:00:01 GMT";
           history.go(0);
    }
  }
}