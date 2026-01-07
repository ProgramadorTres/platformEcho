import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Gender, Product, ProductsResponse } from '@products/interfaces/product.interface';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
  search?: string;
}


const emptyProduct : Product ={
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User
}

@Injectable({ providedIn: 'root' })

export class ProductsSErvice {
  private http = inject(HttpClient);

  /*
  getProducts (options:Options): Observable<ProductsResponse> {
    const {limit=10,offset=0,gender=''} = options;
    return this.http.get<ProductsResponse>(`${baseUrl}/products`,{
      params :{
        limit,
        offset,
        gender
      }
    }).pipe(
      tap((resp)=>  console.log(resp)
      )
    )

  }*/

  private productsCache = new Map<string, ProductsResponse>();
  //singular
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> { // ⬅️ CORRECCIÓN AQUÍ
    //
    const { limit = 10, offset = 0, gender = '',search = '' } = options;
    //console.log("GEnder ", gender);
    //almacenar paginacion en cache 
    //const key = `${limit}-${offset}-${gender}-${search} || 'all' `;
    const key = `${limit}-${offset}-${gender}-${search || 'all'}`;
    console.log(this.productsCache.entries());



    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    // 2. Construimos los parámetros dinámicamente
    const params: any = { limit, offset };
    if (gender) params.gender = gender;
    if (search) params.search = search;

    /*
    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    }).pipe(
      tap((resp) => console.log(resp)),
      tap((resp) => this.productsCache.set(key, resp))
    )*/
   return this.http.get<ProductsResponse>(`${baseUrl}/products`, { params })
    .pipe(
      tap((resp) => {
        // Solo guardamos en cache si NO es una búsqueda muy específica 
        // o guárdalo siempre, pero con la llave que incluye 'search'
        this.productsCache.set(key, resp);
      })
    );
  }

  getProdyctByIdSlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(
        delay(2000),
        tap((product) => this.productCache.set(idSlug, product))
      )

  }

  getProductById(id: string): Observable<Product> {

    if(id==='new') {
      return of (emptyProduct);
    }

    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`)
      .pipe(
        delay(150),
        tap((product) => this.productCache.set(id, product))
      )
  }

  createProduct( productLike: Partial<Product>): Observable<Product>  {
    //interceptro valido autenticacion
    return this.http.post<Product>(`${baseUrl}/products/`,productLike).pipe(
      //disparo efecto secundario 
      tap( (product)=> this.updateProductCache(product) ) //envio producto del tap
    );
  }


  updateProduct(id: string, productLike: Partial<Product>): Observable<Product> {
    //console.log("Actrualizando producto");
    return this.http.patch<Product>(`${baseUrl}/products/${id}`, productLike)
    .pipe(
      //disparo efecto secundario 
      tap( (product)=> this.updateProductCache(product) ) //envio producto del tap
    );
  }


  updateProductCache(product: Product) {
    const productId = product.id;
    this.productCache.set(productId, product);
    if (productId !="new") {
      console.log("entra a actualizar");
      
        this.productsCache.forEach(productResponse => {
      productResponse.products = productResponse.products.map((currentProduct) => {
        return  currentProduct.id === productId ? product : currentProduct;
      });
    });
    }
  
    console.log("Cache actualizado.");
    
  }



  //=>concatenacion



  /*
  getProducts (options:Options): Observable<ProductsResponse> {

      const {limit=10,offset=0,gender=''} = options;
      return this.http.get<ProductsResponse>
        (`${baseUrl}/products`)
        .pipe(
          tap (
            (response) => console.log(response)
          )
        ) ; //<asi luce>
  }*/


  //almacenar paginacion en cache


}
