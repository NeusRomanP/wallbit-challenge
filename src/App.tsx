import { ProductForm } from './components/ProductForm'
import { useState, useEffect } from 'react'
import './App.css'
import Product from './interfaces/Product';
import CartProduct from './interfaces/CartProduct';
import { ProductsCart } from './components/ProductsCart';
import logo from './assets/logo.png';

function App() {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [date, setDate] = useState<undefined|Date>(undefined);

  const addProduct = (product: Product, amount: number) => {
    const cartProduct = products.find(p => p.id === product.id);
    const totalAmount = cartProduct ? cartProduct.amount + amount : amount;

    if (totalAmount <= 99 && totalAmount >= 1) {
      if (cartProduct) {
        setProducts((prevProducts: CartProduct[]) => {
          return prevProducts.map(p => {
            return p.id === product.id
              ? {...product, amount: cartProduct.amount + amount} 
              : p;
          });
        });
      } else {
        setProducts((prevProducts: CartProduct[]) => {
          return [...prevProducts, {...product, amount: amount}];
        });
      }
    }
  }

  const decreaseAmount = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts
        .map(p => 
          p.id === id 
            ? { ...p, amount: p.amount - 1 }
            : p
        )
        .filter(p => p.amount > 0)
    );

    if (products.length === 1 && products[0].amount === 1) {
      localStorage.removeItem('cart');
      setDate(undefined);
    }
  }

  const increaseAmount = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map(p =>
        p.id === id && p.amount < 99
          ? { ...p, amount: p.amount + 1 }
          : p
      )
    );
  }

  const addProductsFromStorage = () => {
    const storedProducts = localStorage.getItem('cart');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts).products);
    }
  }

  const setProductsStorage = () => {
    if (localStorage.getItem('cart')) {
      const cart = {
        date: JSON.parse(localStorage.getItem('cart') ?? 'null')?.date ?? undefined,
        products: products
      }
      setDate(cart.date)
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      const date = new Date();
      setDate(date);
      const cart = {
        date: date,
        products: products
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  useEffect(() => {
    if (!products.length) {
      addProductsFromStorage();
    } else {
      setProductsStorage();
    }
  }, [products]);

  return (
    <>
      <header>
        <h1>NeRoPi</h1>
        <h2>Carrito de compra</h2>
        <img src={logo} alt="Logo carrito" />
      </header>
      <main>
        <ProductForm addProduct={addProduct}/>
        <ProductsCart products={products}
                      decreaseAmount={decreaseAmount}
                      increaseAmount={increaseAmount}
                      date={date}/>
      </main>
    </>
  )
}

export default App
