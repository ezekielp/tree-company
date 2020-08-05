
module Types
  class MutationType < Types::BaseObject
    field :update_cart, mutation: Mutations::Cart::UpdateCart
    field :clear_cart, mutation: Mutations::Cart::ClearCart
    field :add_to_cart, mutation: Mutations::Cart::AddToCart
    field :create_shipping_customer, mutation: Mutations::CreateShippingCustomer
    field :create_billing_customer, mutation: Mutations::CreateBillingCustomer
    field :create_order, mutation: Mutations::CreateOrder
    field :create_payment_intent, mutation: Mutations::CreatePaymentIntent
    field :send_error_mailer, mutation: Mutations::SendErrorMailer
  end
end
