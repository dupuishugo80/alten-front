import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'app/products/data-access/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule],
})
export class CartComponent {
  @Input() cartItems: (Product & { quantity: number })[] = [];

  @Output() increase = new EventEmitter<Product>();
  @Output() decrease = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<Product>();

  onIncrease(product: Product) {
    this.increase.emit(product);
  }

  onDecrease(product: Product) {
    this.decrease.emit(product);
  }

  onRemove(product: Product) {
    this.remove.emit(product);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
}
