module Types
    class CreateOrderInputType < Types::BaseInputObject
        argument :billing_customer_id, Int, required: true
        argument :shipping_customer_id, Int, required: true
        argument :shipping_cost, Int, required: false
        argument :tax_cost, Int, required: true
        argument :unit_price, Int, required: true
    end
end

module Mutations
    class CreateOrder < BaseMutation
        argument :input, Types::CreateOrderInputType, required: true

        field :order, Types::OrderType, null: false
        field :order_quantities, [Types::OrderQuantityType], null: false
        field :shipping_customer, Types::ShippingCustomerType, null: false
        field :billing_customer, Types::BillingCustomerType, null: false

        def resolve(input:)
            new_order = Order.create(
                billing_customer_id: input.billing_customer_id,
                shipping_customer_id: input.shipping_customer_id,
                shipping_cost: input.shipping_cost,
                tax_cost: input.tax_cost,
                unit_price: input.unit_price
            )

            {
                order: new_order,
                order_quantities: new_order.order_quantities,
                shipping_customer: new_order.shipping_customer,
                billing_customer: new_order.billing_customer
            }
        end
    end
end