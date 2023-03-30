"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  clearCart,
  quantityDecrease,
  quantityIncrease,
  removeFromCart,
} from "../../store/slices/cartSlice";
import { TiPlusOutline, TiMinusOutline } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";

interface cartItem {
  image: string;
  price: number;
  id: number;
  title: string;
  quantity: number;
}

interface CartDivD {
  visible?: string,
  right?: any,
  opacity?: number,
}

const Cart = () => {
  const { cart, showCart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();


  const opacity = showCart ? 1 : 0;
  const right = showCart ? "0" : "-1000px";

  useEffect(() => {
    document.body.style.overflow = showCart ? "hidden" : "auto";
  }, [showCart])


  // delete, incerase, decrese
  function deleteIt(id: number) {
    dispatch(removeFromCart(id));
  }
  function IncreaseIt(id: number) {
    dispatch(quantityIncrease(id));
  }
  function DecreaseIt(id: number) {
    dispatch(quantityDecrease(id));
  }


  // total price
  const TotalPrice = () => {
    let total: any = 0;
    cart.map((e: cartItem) => (total += e?.quantity * e.price));
    return Number(total).toFixed(2);
  };

  return (
    <CartDiv
      opacity={opacity} right={right}
    >
      <div className="cartTitle text-center text-2xl lg:text-6xl mt-7 font-['Shantell_Sans'] underline underline-offset-8">
        <h1>Your Cart</h1>
      </div>
      <div className="total flex justify-between my-[30px] font-semibold">
        <p>Total :- $ {TotalPrice()}</p>
        <p>Total items :- {cart.length}</p>
      </div>

      {cart.length < 1 && <img className="emptyCart" src="/empty-cart.png" alt="cart" />}

      {cart.map((el: cartItem, indx: number) => {
        const { image, price, title, id, quantity } = el;
        return (
          <div className="cardInnerDiv" key={indx}>
            <div className="item_info flex items-start gap-2">
              <div className="image flex items-center">
                <img src={image} alt="image" />
              </div>

              <div className="cartItemButtons flex flex-1 items-center justify-between ">
                <div className="title max-w-[150px]">
                  <h1 className="flex-1">{title}</h1>
                </div>
                <p>${price}</p>
                <div className="quantity flex">
                  <button onClick={() => DecreaseIt(id)}> <TiMinusOutline /></button>
                  <p>{quantity}</p>
                  <button onClick={() => IncreaseIt(id)}> <TiPlusOutline /> </button>
                </div>
                <button className="deleteBtn"
                  onClick={() => {
                    deleteIt(id);
                  }}
                >
                  <MdDeleteOutline />
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <button className="checkout flex items-center gap-3 " style={{ backgroundColor: "#EF5350" }} onClick={() => dispatch(clearCart(null))}> <IoBagCheckOutline />CLear Cart</button>
      <button className="checkout flex items-center gap-3"> <IoBagCheckOutline />Checkout</button>
    </CartDiv>
  );
};

export default Cart;

const CartDiv = styled.div<CartDivD>`
  height: 80vh;
  max-height: 100vh;
  font-family: Quicksand;
  overflow-y: auto;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 40px;
  background-color: #EEF1FF;
  position: fixed;
  right: ${({ right }) => right};;
  width: 50vw;
  margin-bottom:10px;
  transition: opacity .5s linear, right .8s ease-in-out;
  opacity: ${({ opacity }) => opacity};


  .cardInnerDiv {
    padding: 10px 20px;
  }

  .item_info {
    & .image img{
      width: 60px;
      margin-right: 10px;
    }
  }

  .emptyCart{
    margin: auto;
  }

  .deleteBtn {
    display: flex;
    align-items:center;
    gap: 10px;
    font-weight: 600;
    color:  #f6f6f6;
    background-color: #e46f62;
    border: 2px solid #f5b7b1;
    padding: 4px 15px;
    border-radius: 10px;
    transition: all 0.2s linear;

    &:hover {
      border: 2px solid #f5b7b1;
      transition: all 0.2s linear;
      color: #f5b7b1;
    }
  }

  .quantity{
    align-items: center;
    p{
      font-weight: 600;
      margin: 0px 10px;
    }
    
    button{
      padding: 2px 5px;
      border-radius: 5px;
      background-color: #D6DBDF;
      color: #666666;
      border: none;
      transition: all 0.1s linear;


      &:hover{
        background-color: #F2F4F4;
        color: black;
        border: none;
        transition: all 0.1s linear;
      }
    }
  }

  .checkout{
    margin-left:auto;
    margin-top: 10px;
    font-family: Quicksand;
    font-weight: bold;
    background-color: #9575cd;
    color: white;
    border-radius: 7px;
    padding: 5px 15px;
  }

  @media (max-width: 820px){
    padding: 10px;
    width: 100vw;

    .cardInnerDiv{
      margin-bottom: 20px;
    }

    .item_info{
      justify-content: center;
    }

    
    .cartItemButtons{
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
      flex:0;

      .title h1{
        width: 200px;
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
`;



  // useEffect(() => {
  // total = cart.reduce((a: any, b: any) => a + b.price, 0);
  //   console.log(total, "MMMMMM");
  // }, [cart, total]);
