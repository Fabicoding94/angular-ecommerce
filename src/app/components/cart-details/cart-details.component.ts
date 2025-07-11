import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [[CommonModule], [RouterModule]],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent {


  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

 constructor(private cartService: CartService
  ) {}

  ngOnInit() {
    this.listCartDetails();
  }

  listCartDetails() {
    //get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data );

    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);

    //compute cart total price amd quantity
    this.cartService.computeCartTotals();
  }


  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }


  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }


  remove(theCartItem: CartItem){
    this.cartService.remove(theCartItem)
  }




}
