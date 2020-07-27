module Types
    class CreatePaymentIntentInputType < Types::BaseInputObject
        argument :amount, Int, required: true
    end
end

module Mutations
    class CreatePaymentIntent < BaseMutation
        argument :input, Types::CreatePaymentIntentInputType, required: true

        field :stripe_payment_intent, Types::StripePaymentIntentType , null: false

        def resolve(input:)
            new_payment_intent = Stripe::PaymentIntent.create(
                amount: input.amount,
                currency: 'usd'
            )

            {
                stripe_payment_intent: {
                    id: new_payment_intent.id,
                    amount: new_payment_intent.amount,
                    client_secret: new_payment_intent.client_secret,
                    description: new_payment_intent.description,
                    receipt_email: new_payment_intent.receipt_email,
                    status: new_payment_intent.status
                }
            }
        end
    end
end