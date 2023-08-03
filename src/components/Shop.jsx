import { useState, useEffect } from "react";
import { API_URL } from "../config";
import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";

export function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });

      setOrder(newOrder);
      
    }
    setAlertName(item.title);
    console.log(item.title)
  };
  const addQuantity = (itemId) => {
    const newOrder = order.map((orderItem) => {
      if(orderItem.id === itemId) {
        return{
          ...orderItem,
          quantity: orderItem.quantity + 1
        }
      } else {
        return orderItem;
      }
    });
    setOrder(newOrder);
    
  }
  const removeQuantity = (itemId) => {
    const newOrder = order.map((orderItem) => {
      if(orderItem.id === itemId) {
        return{
          ...orderItem,
          quantity: orderItem.quantity > 0 ? orderItem.quantity - 1 : 0

        }
      } else {
        return orderItem;
      }
    });
    setOrder(newOrder);
  }
  const removeFromBasket = (itemId) => {
    const newOrder = order.filter(el => el.id !== itemId)
    setOrder(newOrder);
  }
  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };
  const closeAlert = () => {
    setAlertName('');
  }
  useEffect(function getGoods() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        data && setGoods(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? (
        <Preloader />
      ) : (
        <GoodsList goods={goods} addToBasket={addToBasket} />
      )}
      {isBasketShow && <BasketList order={order} handleBasketShow={handleBasketShow}  removeFromBasket={removeFromBasket} addQuantity={addQuantity} removeQuantity={removeQuantity}/>}
    {
      alertName && <Alert title={alertName} closeAlert={closeAlert}/>
    }
    </main>
  );
}
