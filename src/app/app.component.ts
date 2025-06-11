import { Component, inject, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartService } from "./cart/cart.service";
import { DialogModule } from 'primeng/dialog';
import { CartComponent } from "./cart/cart.component";
import { Product } from "./products/data-access/product.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, DialogModule, CartComponent],
})
export class AppComponent {
  title = "ALTEN SHOP";

readonly cartService = inject(CartService);
  isCartVisible = signal(false);

  openCart() {
    this.isCartVisible.set(true);
  }

  closeCart() {
    this.isCartVisible.set(false);
  }

  increaseQuantity(product: Product) {
    this.cartService.add(product);
  }

  decreaseQuantity(product: Product & { quantity: number }) {
    if (product.quantity > 1) {
      this.cartService.decrease(product.id);
    } else {
      this.cartService.remove(product.id);
    }
  }

  removeProduct(product: Product) {
    this.cartService.remove(product.id);
  }
}
