import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../shared/product.service";
import {switchMap} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../shared/interfaces";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup
  product: Product
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private prodServ: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap( params =>{
        return this.prodServ.getById(params['id'])
      })
    ).subscribe( products =>{
      this.product = products
      this.form = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        photo: new FormControl(this.product.photo, Validators.required),
        info: new FormControl(this.product.info, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.prodServ.update( {
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }).subscribe(res =>{
      this.submitted = false
      this.router.navigate(['/admin','dashboard'])
    } )
  }
}
