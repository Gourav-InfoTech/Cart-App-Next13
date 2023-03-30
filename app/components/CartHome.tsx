"use client"
import { getData } from '@/store/slices/productSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Cart from './Cart';
import Footer from './Footer';
import Navbar from './Navbar';
import ProductCard from './ProductCard';

const CartHome = () => {
    const { products } = useSelector((state: any) => state.products);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(getData());
    }, []);
    return (
        <>
            <Navbar />
            <div className="flex">
                <ProductsDiv className="products gap-4">
                    {products.map((el: any, indx: number) => {
                        return <ProductCard key={indx + "ded"} el={el} />;
                    })}
                </ProductsDiv>
                <Cart />
            </div>
            <Footer />
        </>
    )
}

export default CartHome;

const ProductsDiv = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 1100px) {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 600px) {
  grid-template-columns: repeat(1, minmax(0, 1fr));
  }
   
`;