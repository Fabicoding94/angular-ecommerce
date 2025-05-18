import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [ [ CommonModule], [RouterModule]],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.updateCartStatus();

  }
  updateCartStatus() {
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);

    //subscribe to the Cart totalQuantity
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
  }

  logClick() {
  console.log('CLICK SU ROUTERLINK');
}

}
