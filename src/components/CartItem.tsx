import CartProduct from "../interfaces/CartProduct";
import "./CartItem.css"

type Props = {
  product: CartProduct;
  decreaseAmount: (id: number) => void;
  increaseAmount: (id: number) => void;
}
export function CartItem({product, decreaseAmount, increaseAmount}: Props) {
  return (
    <article className="product">
      <span className="amount">
        <button className="remove" onClick={() => decreaseAmount(product.id)}>
          <span>-</span>
        </button>
        <span>x{product.amount}</span>
        <button className="add" onClick={() => increaseAmount(product.id)}>
          <span>+</span>
        </button>
      </span>
      <span title={product.title} className="title">
        {product.title}
      </span>
      <span className="unit-price">
        ${product.price.toFixed(2)}
      </span>
      <span className="total-price">
        ${(product.price * product.amount).toFixed(2)}
      </span>
      <span className="image">
        <div className="image-container">
          <img src={product.image} alt={product.title} />
        </div>
      </span>
    </article>
  )
}