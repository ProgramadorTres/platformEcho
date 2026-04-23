import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarruselComponent } from '@products/product-carrusel.component/product-carrusel.component';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabel } from "@shared/components/form-error-label/form-error-label";
import { ProductsSErvice } from '@products/services/products.services';
import { Router } from '@angular/router';


@Component({
  selector: 'product-detaills',
  imports: [ProductCarruselComponent, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-detaills.html',
})
export class ProductDetaills implements OnInit {

  product = input.required<Product>();

  fb = inject(FormBuilder);
  router =inject(Router);
  productService = inject(ProductsSErvice);
  wasSaved = signal(false);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)]
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kids|unisex/)]
    ],
  });

  sizes = ['XS', 'S', 'M', 'L', 'XXL', 'XL'];

  ngOnInit(): void {
   this.setFormValue(this.product());
  }

  setFormValue (formLike : Partial<Product>) {
    this.productForm.reset(this.product() as any);
    //this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({tags:formLike.tags?.join(',')})
  }


  onSizeClicked(size:string) {
    const currentSizes = this.productForm.value.sizes ?? [];
    if ( currentSizes.includes(size) ){
      currentSizes.splice(currentSizes.indexOf(size),1);
    }else{
      currentSizes.push(size);
    }

    this.productForm.patchValue({sizes:currentSizes});
  }
/*
  onSubmit() {
   
    //console.log(this.productForm.value, {isValid} );
    const formValue = this.productForm.value;
    
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();
    if(!isValid) return;

    const productLike : Partial<Product> = {
      ...(formValue as any),
      tags: 
        formValue.tags?.
        toLocaleLowerCase()
        .split(',')
        .map( (tag)=> tag.trim() ) ?? [],
    };
    console.log({productLike});

    if (this.product().id === 'new' ){
      //crear producto
      this.productService.createProduct(productLike)
      .subscribe( product=> {
        console.log("producto creado");
        this.router.navigate(['/admin/products',product.id]);

        this.wasSaved.set(true);
      });

    }else{
        
      this.productService.updateProduct( this.product().id ,productLike).subscribe(
        product=>{
          console.log("Producto actualizado");
          
        }
      );
    }


    
  }
*/


onSubmit() {
  const isValid = this.productForm.valid;
  this.productForm.markAllAsTouched();
  if (!isValid) return;

  const formValue = this.productForm.value;
  const productLike: Partial<Product> = {
    ...(formValue as any),
    tags: formValue.tags?.toLocaleLowerCase().split(',').map(tag => tag.trim()) ?? [],
  };

  // 1. Definimos el flujo (Stream)
  const productAction$ = (this.product().id === 'new')
    ? this.productService.createProduct(productLike)
    : this.productService.updateProduct(this.product().id, productLike);

  // 2. Encadenamos usando operadores
  productAction$.pipe(
    // Si quisieras hacer otra petición justo después usando el ID del producto:
    // switchMap(product => this.otroServicio.hacerAlgo(product.id)),
  ).subscribe({
    next: (product) => {
      console.log('Operación exitosa', product);
      
      // Acciones tras guardar
      this.wasSaved.set(true);

      if (this.product().id === 'new') {
        this.router.navigate(['/admin/products', product.id]);
      }
      
      // Opcional: Resetear el signal después de unos segundos
      setTimeout(() => this.wasSaved.set(false), 5000);
    },
    error: (err) => {
      console.error('Error al guardar:', err);
      this.wasSaved.set(false);
    }
  });
}

}
