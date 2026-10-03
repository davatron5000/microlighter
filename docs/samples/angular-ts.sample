import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <button type="button" [routerLink]="'/cart'">
      @if (cartService.length > 0) {
        <div>
          @let hello = "world";
          {{ cartService.length }}
        </div>
      }
      Cart
    </button>
  `,
  styles: `
    div { display: block; }
  `,
})
export class CartButtonComponent {
  protected cartService = inject(CartService);
}

// From https://github.com/niklas-wortmann/signals-observable-example/blob/main/src/app/cart/cart-button.component.ts
