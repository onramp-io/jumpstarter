import { NextPageContext } from 'next';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutProps {

}

const Checkout = function checkoutComponent<checkoutProps>({}) {
  return (

  );
}

Checkout.getInitialProps = async ({ req }: NextPageContext) => {

};

export default Checkout;