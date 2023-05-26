import React,{createContext, useState, useEffect} from 'react';

export const CartContext = createContext()

const CartProvider = ({children}) => {
  //cart state
  const [cart, setCart] = useState([]);
  
  //item amount state
  const [itemAmount, setItemAmount] = useState(0); 

  //total price state
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    const total = cart.reduce((acc, currentItem)=>{
      return acc + currentItem.price * currentItem.amount;
    }, 0)
    setTotal(total);
  });

//update item amount
  useEffect(()=>{
    if(cart) {
      const amount = cart.reduce((accumulator, currentItem) =>{
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  //add to cart
  const addToCart= (product, id)=>{

    const newItem = { ...product, amount: 1};
    //checking if the item already exits in the cart
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    console.log(cartItem);
    //if cart item already exists in the cart
    if(cartItem){
      const newCart = [...cart].map(item =>{
        if(item.id === id) {
          return {
            ...item, amount: cartItem.amount + 1
          };
        }else{
          return item;
        }
      });
      setCart(newCart);
    }else{
      setCart([...cart, newItem]);
    }
  
  };

  //remove from cart
  const removeFromCart = id =>{
    const newCart = cart.filter(item=>{
      return item.id !== id;
    });
    setCart(newCart);
  }

  //clear cart
  const clearCart = ()=>{
    setCart([]);
  }

//increase amount
const increasedAmount = (id) =>{
  const CartItem = cart.find(item => item.id === id);
  addToCart(CartItem, id);
  
}

//decrease amount
const decreaseAmount = (id) =>{
  const CartItem = cart.find(item=> item.id === id);
 if(CartItem){
  const newCart = cart.map(item =>{
    if(item.id === id){
      return {...item, amount: CartItem.amount - 1};
    }else{
      return item;
    }
  });
  setCart(newCart);
 }

  if(CartItem.amount < 2){
    removeFromCart(id);
  }
 
}

  return <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, increasedAmount, decreaseAmount, itemAmount, total}}>
    {children}
    </CartContext.Provider>;
};

export default CartProvider;
