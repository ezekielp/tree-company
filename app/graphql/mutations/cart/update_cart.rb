module Types
    class UpdateCartInputType < Types::BaseInputObject
        argument :product_id, ID, required: true
        argument :quantity, Int, required: true
    end
end

module Mutations
    module Cart
        class UpdateCart < BaseMutation
            argument :input, Types::UpdateCartInputType, required: true

            field :cart, [Types::CartItemType], null: false
            
            def resolve(input:)
                cart = context[:cart]
                product_id = input.product_id
                quantity = input.quantity

                if quantity == 0
                    cart.delete(product_id)
                else
                    cart[product_id] = quantity
                end

                cart_as_array = []

                cart.each do |product_id, quantity|
                    cart_as_array << { 
                    product_id: product_id,
                    quantity: quantity
                    }
                end
                
                { cart: cart_as_array }
            end
        end
    end
end
