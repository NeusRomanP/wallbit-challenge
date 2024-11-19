import { useState } from 'react';
import './ProductForm.css';
import Product from '../interfaces/Product';

type Props = {
  addProduct: (product: Product, amount: number) => void;
}

export function ProductForm({ addProduct }: Props) {
  const [amount, setAmount] = useState('');
  const [productId, setProductId] = useState('');
  const [displayError, setDisplayError] = useState(false);

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleChangeProductId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProductId(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setDisplayError(false);
      const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await res.json();
  
      addProduct(data, Number(amount));
    } catch (e) {
      setDisplayError(true);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <p>Agrega los productos al carro de compra</p>
      <div className='form-items'>
        <div className='inputs'>
          <input type="number"
                 placeholder="Cantidad"
                 id='amount'
                 min={1}
                 max={99}
                 value={amount}
                 required
                 onChange={handleChangeAmount} />
          <input type="text"
                 placeholder="ID del Producto"
                 id='productId'
                 value={productId}
                 required
                 onChange={handleChangeProductId} />
        </div>
        <button type="submit">Agregar</button>
      </div>
      {
        displayError && (
          <div>
            <small className='error'>El producto no existe</small>
          </div>
        )
      }
    </form>
  )
}