
'use client';

import React from 'react';
import { redirect, useRouter } from 'next/navigation';
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";
import { AuthContext } from '../Context/AuthContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Checkout from '../components/Checkout/Checkout';
import { Suspense } from 'react';


/* Insert client-id from Paypal sandbox*/
const initialOptions = {
    "client-id": "AUB6eRliPXwyoXY81XNaML65RPGHWTavj1GcP1yEDAhq_L4DbmTzE4hWOmQY6LjTM1nOgEYgwchhcKUq",
    currency: "USD",
    intent: "capture",
};

const CheckoutPage = () => {
    return (
      <>
        <NavbarBasic />
        <PayPalScriptProvider options={initialOptions}>
          <Suspense fallback={<div>Loading checkout...</div>}>
            <Checkout />
          </Suspense>
        </PayPalScriptProvider>
      </>
    );
  };
  
export default CheckoutPage;