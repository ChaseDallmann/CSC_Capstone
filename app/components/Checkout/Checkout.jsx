import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { AuthContext } from '../../Context/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const searchParams = useSearchParams();
    const router = useRouter();
    const total = parseFloat(searchParams.get('total') || '0.00');
    const token = Cookies.get('authToken');
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total,
                    },
                },
            ],
        });
    }

    const addOrder = async () => {
        try {
            setLoading(true);
            let response;
            if (!user) {
                //TODO: In the future create a temp guest each time and add it to the database with endpoints
                response = await axios.put(`http://localhost:8080/cart/add-order/-1`, {}, {
                });
            } else {
            // Call the backend endpoint to create an order from cart items
            response = await axios.put(`http://localhost:8080/cart/add-order/${user?.id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            }
            
            if (response.status === 200) {
                console.log("Order added successfully", response.data);
                setOrderSuccess(true);
                return true;
            } else {
                console.error("Failed to create order");
                return false;
            }
        }
        catch (error) {
            console.error("Error adding order:", error);
            return false;
        }
        finally {
            setLoading(false);
        }
    }

    // Removing all the cart items
    const removeCartItems = async () => {   
        try {
            const response = await axios.delete(`http://localhost:8080/cart/remove-items/${user?.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            if (response.status === 200) {
                if (localStorage.getItem('guestCart')) {
                    localStorage.removeItem('guestCart')
                }
                console.log("Cart items removed successfully");
            } else {
                console.error("Failed to remove cart items");
            }
        }
        catch (error) {
            console.error("Error removing cart items:", error);
        }
    }

    const onApproveOrder = async (data, actions) => {
        try {
            // First capture the PayPal payment
            const details = await actions.order.capture();
            console.log("Payment completed successfully", details);
            
            // Then create the order in our database
            const orderCreated = await addOrder();
            
            if (orderCreated) {
                alert(`Transaction completed by ${user?.name || 'customer'}. Your order has been placed!`);
                // Redirect to an order confirmation page
                router.push('/Orders');
            } else {
                alert("Payment was processed but there was an issue creating your order. Please contact customer support.");
            }
        } catch (error) {
            console.error("Error processing payment or creating order:", error);
            alert("There was an error processing your payment. Please try again or contact customer support.");
        }
    }

    // Removing user check so a guest can checkout. Possible rework the logic for guest checkout later
    useEffect(() => {
        if (orderSuccess) {
            removeCartItems();
        }
    }, [ loading, router ]);

    if (orderSuccess) {
        return (
            <div className="checkout-success">
                <h1>Order Placed Successfully!</h1>
                <p>Thank you for your purchase.</p>
                <button onClick={() => router.push('/Product')}>Continue Shopping</button>
            </div>
        );
    }

    return (
        <div className="checkout">
            <h1>Checkout Page</h1>
            <p>Total: ${total}</p>
            {loading ? (
                <p>Processing your order...</p>
            ) : (
                <>
                    <p>Secure your payment with PayPal</p>
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                        disabled= {loading}
                    />
                </>
            )}
        </div>
    );
}

export default Checkout;