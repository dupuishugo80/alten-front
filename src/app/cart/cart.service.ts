import { Injectable, signal } from '@angular/core';
import { Product } from 'app/products/data-access/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _cart = signal<(Product & { quantity: number })[]>([]);
  public readonly cart = this._cart.asReadonly();

  add(product: Product) {
    this._cart.update((current) => {
      const index = current.findIndex(p => p.id === product.id);
      if (index > -1) {
        const updated = [...current];
        updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 };
        return updated;
      } else {
        return [...current, { ...product, quantity: 1 }];
      }
    });
  }

  decrease(productId: number) {
    this._cart.update(current => {
      const index = current.findIndex(p => p.id === productId);
      if (index === -1) return current;

      const product = current[index];
      if (product.quantity > 1) {
        const updated = [...current];
        updated[index] = { ...product, quantity: product.quantity - 1 };
        return updated;
      } else {
        return current.filter(p => p.id !== productId);
      }
    });
  }

  remove(productId: number) {
    this._cart.update(current => current.filter(p => p.id !== productId));
  }

  clear() {
    this._cart.set([]);
  }
}
