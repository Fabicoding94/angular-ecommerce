import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { CommonModule } from '@angular/common';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [[CommonModule], [RouterModule]],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    //get the 'id' param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart() {
    console.log( `Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);

    const theCartItem = new CartItem(this.product);

    this.cartService.addToCart(theCartItem);


  }
}
