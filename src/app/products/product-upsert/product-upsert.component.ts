import { Component } from '@angular/core';
import { IProduct } from '../../_models/product.model';
import { ProductService } from '../../_services/product.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-upsert',
  templateUrl: './product-upsert.component.html',
  styleUrl: './product-upsert.component.css',
  //providers:[ProductService]
})
export class ProductUpsertComponent {
  product:IProduct={id:'',name:'',brand:'',price:'',imageUrl:'',manufacturedYear:''};
  id:string;
  idEditMode:boolean=false;
  form:FormGroup;

  constructor
  (private productService:ProductService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(){
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
    });

    this.initForm();

    if(this.id){
      this.productService.getProductById(this.id).subscribe((responseData:IProduct)=>{
        this.product=responseData;
        this.idEditMode=true;
        this.populateForm();
      });

    }

  }

  initForm(){
    this.form=new FormGroup({
      name:new FormControl(null,Validators.required),
      brand:new FormControl(null),
      price:new FormControl(null),
      imageUrl:new FormControl(null),
      manufacturedYear:new FormControl(null,[Validators.required,Validators.maxLength(4),Validators.minLength(4)]),
    })
  }

  onSubmit(){
    this.product.name=this.form.value.name;
    this.product.price=this.form.value.price;
    this.product.brand=this.form.value.brand;
    this.product.manufacturedYear=this.form.value.manufacturedYear;
    this.product.imageUrl=this.form.value.imageUrl;
    if(!this.idEditMode){
      this.product.id=Math.random().toString();
      this.productService.addProducts(this.product).subscribe(()=>{
        this.router.navigate(['/']);
      });
    }
    else{
      this.productService.updateProduct(this.product).subscribe(()=>{
        this.router.navigate(['product',this.product.id]);
      });     
    }

  }

  populateForm(){
    this.form.patchValue({
      name:this.product.name,
      price:this.product.price,
      brand:this.product.brand,
      imageUrl:this.product.imageUrl,
      manufacturedYear:this.product.manufacturedYear
    })
  }
  /*onSubmit(){
    console.log(this.product);
    this.product.id=Math.random().toString();
    this.productService.addProducts(this.product);
    this.product={id:'',name:'',brand:'',price:'',imageUrl:'',manufacturedYear:''};
    this.router.navigate(['/']);
  }*/

  onBack(){
    if(this.idEditMode){
      this.router.navigate(['product',this.product.id]);
    }else{
      this.router.navigate(['/']);
    }
  }

}
