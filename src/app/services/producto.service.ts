import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  BASE_URL = 'http://localhost:4000/producto/'
  GET_ALL_PRODUCTOS=`${this.BASE_URL}allProductos`
  DELETE_PRODUCTO=`${this.BASE_URL}delete/`

  constructor(private httpClient: HttpClient) { }

  getProductos(): Observable<any>{
    return this.httpClient.get(this.GET_ALL_PRODUCTOS)
  }

  deleteProducto(id:string): Observable<any>{
    return this.httpClient.delete(this.DELETE_PRODUCTO+id)
  }
}
