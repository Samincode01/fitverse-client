import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {

  try {

    const body = await req.json();

    const {

      classId,

      title,

      price,

    } = body;

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      mode: "payment",

      line_items: [

        {

          price_data: {

            currency: "usd",

            product_data: {

              name: title,

            },

            unit_amount: Math.round(price * 100),

          },

          quantity: 1,

        },

      ],

      metadata: {

        classId,

        title,

        price: price.toString(),

      },

      success_url:

        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?classId=${classId}&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:

        `${process.env.NEXT_PUBLIC_BASE_URL}/classes/${classId}`,

    });

    return Response.json({

      url: session.url,

    });

  }

  catch (error) {

    console.log(error);

    return Response.json(

      {

        error: error.message,

      },

      {

        status: 500,

      }

    );

  }

}