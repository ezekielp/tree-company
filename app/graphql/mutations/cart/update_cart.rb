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
                new_cart = cart.dup
                product_id = input.product_id
                quantity = input.quantity

                if quantity == 0
                    new_cart.delete(product_id)
                else
                    new_cart[product_id] = quantity
                end

                context[:cart] = new_cart

                new_cart_as_array = []
                context[:cart].each do |product_id, quantity|
                    new_cart_as_array << { 
                    product_id: product_id,
                    quantity: quantity
                    }
                end
                
                { cart: new_cart_as_array }
            end
        end
    end
end
