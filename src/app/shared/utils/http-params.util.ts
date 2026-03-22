
import { HttpParams } from '@angular/common/http';

export class HttpUtils {
  /**
   * Transforma un objeto plano en HttpParams de Angular,
   * eliminando automáticamente valores nulos, indefinidos o vacíos.
   */
  static buildParams(obj: any): HttpParams {
    let params = new HttpParams();

    if (!obj) return params;

    Object.keys(obj).forEach(key => {
      const value = obj[key];
     
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value).trim());
      }
    });

    return params;
  }
}
