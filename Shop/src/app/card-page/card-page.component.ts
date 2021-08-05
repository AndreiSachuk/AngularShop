import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../shared/order.service";

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent implements OnInit {

  cardProducts = []
  totalPrice = 0
  added = ""

  form: FormGroup
  submitted = false

  constructor(
    private productServ: ProductService,
    private orderServ: OrderService,
  ) { }

  ngOnInit(): void {
    this.cardProducts = this.productServ.cardProducts
    for (const product of this.cardProducts) {
      this.totalPrice += +product.price
    }
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price: this.totalPrice,
      date: new Date(),
      orders: this.cardProducts
    }

    this.orderServ.create(order).subscribe(res => {
      this.form.reset()
      this.added = "Delivery is framed"
      this.submitted = false
    } )
  }

  delete(product){
    this.totalPrice -= +product.price
    this.cardProducts.splice(this.cardProducts.indexOf(product),1)
  }

}
