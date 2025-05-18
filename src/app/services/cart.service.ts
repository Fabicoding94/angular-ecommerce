import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  //Subject i sa subclass of Observables and we can use it to publish event in our code. The
  //event will be sent to all of the subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {
    // Check if we have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0) {

    /*// find the item in the cart based on the item id
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break; // exit the loop early if we found it
        }
      }*/

      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id); //return the first element that passes else return undefined
      //check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

      if (alreadyExistsInCart) {
        // If the item already exists, increment the quantity
        if (existingCartItem) {
          existingCartItem.quantity++;
        }
      } else {
        // If the item does not exist, add it to the cart
        this.cartItems.push(theCartItem);
      }

      // Update the total price and quantity
      this.computeCartTotals();
    }


  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    // Loop through cart items to calculate totals
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // Publish the new values to subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue); //.next() publish/send event

    // Log the totals for debugging
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`Contents of the cart`);
    for (let tempCartItem of this.cartItems) {
      const subtotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subtotalPrice: ${subtotalPrice}`
      );
    }
    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQuantityValue}`
    );
    console.log('----------------------------');
  }
}
