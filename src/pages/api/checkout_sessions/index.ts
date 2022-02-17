import { NextApiRequest, NextApiResponse } from "next";

import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config/stripeConfig';

import Stripe from 'stripe';
import getStripe from "lib/getStripeJS";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const amount: number = req.body.amount;

    try {
      if (amount < 0 
        || amount < MIN_AMOUNT 
        || amount > MAX_AMOUNT) {
        throw new Error('Invalid amount');
      } else {
        const params: Stripe.Checkout.SessionCreateParams = {
          submit_type: 'donate',
          payment_method_types: [
            'card',
          ],
          line_items: [
            {
              name: 'Custom amount donation',
              amount: formatAmountForStripe(amount, CURRENCY),
              currency: CURRENCY,
              quantity: 1,
            },
          ],
          success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/checkout`,
        };
      }
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: err.message
      })
    }
  } else {
    res.status(403).json({
      statusCode: 403,
      message: '403 (Forbidden)'
    });
  }
}


const params: Stripe.Checkout.SessionCreateParams = {
  submit_type: 'donate',
  payment_method_types: [
    'card'
  ],
  line_items: [
    {
      name: 'Custom amount donation',
      amount: formatAmountForStripe(amoung, CURRENCY),
      currency: CURRENCY,
      quantity: 1,
    },
  ],
  success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
};

const checkoutSession: Stripe.Checkout.Session =
  (async () => {
    await Stripe.checkout.sessions.create(params)
  })();