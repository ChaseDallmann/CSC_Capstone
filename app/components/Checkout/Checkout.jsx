import React from 'react';
import { useSearchParams } from 'next/navigation';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const Checkout = () => {
    const searchParams = useSearchParams();
    const total = searchParams.get('total');

    const onCreateOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    //total from cart
                    amount: {
                        value: total,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        });
    }

    return (
        <>

            <div className="checkout">
                
                <h1>Checkout Page</h1>
                <p>Total: ${total}</p>
                <PayPalScriptProvider options={{ "client-id": "AUB6eRliPXwyoXY81XNaML65RPGHWTavj1GcP1yEDAhq_L4DbmTzE4hWOmQY6LjTM1nOgEYgwchhcKUq", currency: "USD" }}>
                <p>Secure your payment with PayPal</p>
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </PayPalScriptProvider>
                
            </div>
        </>
    );
}

export default Checkout;