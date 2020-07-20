module Types
  class MutationType < Types::BaseObject
    field :update_cart, mutation: Mutations::Cart::UpdateCart
    field :create_shipping_customer, mutation: Mutations::CreateShippingCustomer
    field :create_billing_customer, mutation: Mutations::CreateBillingCustomer
  end
end
