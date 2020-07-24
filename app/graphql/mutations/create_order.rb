module Types
    class CartItemInputType < Types::BaseInputObject
        argument :product_id, ID, required: true
        argument :quantity, Int, required: true
    end

    class CreateOrderInputType < Types::BaseInputObject
        argument :billing_customer_id, Int, required: true
        argument :shipping_customer_id, Int, required: true
        argument :shipping_cost, Int, required: false
        argument :tax_cost, Int, required: true
        argument :unit_price, Int, required: true
        argument :cart, [Types::CartItemInputType], required: true
    end
end

module Mutations
    class CreateOrder < BaseMutation
        argument :input, Types::CreateOrderInputType, required: true

        field :order, Types::OrderType, null: false

        def resolve(input:)
            new_order = Order.create(
                billing_customer_id: input.billing_customer_id,
                shipping_customer_id: input.shipping_customer_id,
                shipping_cost: input.shipping_cost,
                tax_cost: input.tax_cost,
                unit_price: input.unit_price
            )

            input.cart.each do |item|
                OrderQuantity.create(
                    product_id: item.product_id,
                    order_id: new_order.id,
                    quantity: item.quantity
                )
            end

            { order: new_order }
        end
    end
end