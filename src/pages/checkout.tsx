import { NextPage } from 'next';
import React, { useState } from 'react';

import { createCheckoutSession } from 'next-stripe/client';
import getStripe from 'lib/getStripeJS';

import { NextPageContext } from 'next';
import { Box, Button } from 'grommet';
import { formatAmountForStripe } from 'utils/stripeHelpers';
import { CURRENCY } from 'config/stripeConfig';
import { FormEvent } from 'react';
import axios from 'axios';

interface CheckoutProps {

}

const Checkout = function checkoutComponent<checkoutProps>({}) {
  const handleCheckout = async (e: FormEvent) => {
    e.preventDefault();

    const amount = req.query.amount;

    const stripeSession = await createCheckoutSession({
      success_url: window.location.origin + '/thankyou?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: window.location.href,
      line_items: [
        {
          quantity: 1,
          name: 'Beanie',
          images: ['https://images.unsplash.com/photo-1576861048192-fa56cf0a8161?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'],
          amount: formatAmountForStripe(amount, CURRENCY),
          currency: CURRENCY,
        },
      ],
      payment_method_types: [
        'card'
      ],
      mode: 'payment'
    });

    try {
      const stripe = await getStripe();

      /** 
       * if Stripe session exists, redirect to checkout
       * 
       */
      if (stripe) {
        stripe.redirectToCheckout({
          /** 
           * .id specifically on the stripe session instance from createCheckoutSession()
           */
          sessionId: stripeSession.id
        });
      }
    } catch (error) {
      /** 
       * If stripe.redirectToCheckout fails,
       * display a localized error message
       */
      console.warn(error.message);
    }
    
  };

  return (
    <Box>
      <Button onClick={handleCheckout}>Checkout</Button>
    </Box>
  );
}

Checkout.getInitialProps = async ({ req }: NextPageContext) => {
  return {

  };
};

export default Checkout;