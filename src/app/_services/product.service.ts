
import { Injectable } from '@angular/core';
import { IProduct } from '../_models/product.model';
import { LoggerServivce } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

const BASE_URL='https://angular-7fe90-default-rtdb.firebaseio.com';

@Injectable()
export class ProductService{
    productList:IProduct[]=[];
      constructor(private loggerService:LoggerServivce,private http:HttpClient){}

      
      getProducts(){
          return this.http.get(BASE_URL+'/product.json').pipe(map((responseData)=>{
            const products=[];
            for(const key in responseData){
              if(responseData.hasOwnProperty(key)){
                const product={...responseData[key],id:key};
                products.push(product);
              }
            }
            return products;
          }
          ));

      }

      addProducts(product:IProduct){
        const customProduct={
          name:product.name,
          brand:product.brand,
          price:product.price,
          imageUrl:product.imageUrl,
          manufacturedYear:product.manufacturedYear
        }
        return this.http.post(BASE_URL+'/product.json',customProduct);

      }

      getProductById(id:string){
        return this.http.get(BASE_URL+'/product/'+id+'.json').pipe(map((responseData)=>{
          return{...responseData,id};
        }));
      }

      updateProduct(product:IProduct){
        const customProduct={
          name:product.name,
          brand:product.brand,
          price:product.price,
          imageUrl:product.imageUrl,
          manufacturedYear:product.manufacturedYear
        }

        return this.http.put(BASE_URL+'/product/'+product.id+'.json',customProduct);
      }

      deleteProduct(id:string){
        return this.http.delete(BASE_URL+'/product/'+id+'.json');
      }
}