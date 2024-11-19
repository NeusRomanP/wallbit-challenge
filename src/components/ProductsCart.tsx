import CartProduct from "../interfaces/CartProduct";
import { CartItem } from "./CartItem";
import './ProductsCart.css'

type Props = {
  products: CartProduct[];
  decreaseAmount: (id: number) => void;
  increaseAmount: (id: number) => void;
  date: Date | undefined
}
export function ProductsCart({products, decreaseAmount, increaseAmount, date}: Props) {
  const newDate = new Date(date ?? new Date());
  return (
    <section className="cart">
      <h3>Productos del carrito</h3>
      {
        date ? (
          <p>
            Creado en {`${newDate?.getDate()}`.padStart(2, '0') + '-' + `${newDate?.getMonth() + 1}`.padStart(2, '0') + '-'
              + `${newDate?.getFullYear()} `}
            a las {`${newDate?.getHours()}`.padStart(2, '0') + ':' + `${newDate?.getMinutes()}`.padStart(2, '0')
              + ':' + `${newDate?.getSeconds()}`.padStart(2, '0')}
          </p>
        ) : ''
      }
      { products.length ?
        products.map(product => (
          <CartItem product={product}
                    decreaseAmount={decreaseAmount}
                    increaseAmount={increaseAmount}
                    key={product.id}/>
        )) :
        (
          <p>El carrito està vacío</p>
        )
      }
      <article className="totals">
        <strong>
          Total productos:
          <span>
            {products.reduce((acc, item) => acc + item.amount, 0)}
          </span>
        </strong>
        <strong>
          Total precio:
          <span>$
            {
              products.reduce((acc, item) => acc + (item.amount * item.price), 0).toFixed(2)
            }
          </span>
        </strong>
      </article>
    </section>
  )
}