module Mutations
    module Cart
        class AddToCart < BaseMutation
            argument :input, Types::UpdateCartInputType, required: true

            field :cart, [Types::CartItemType], null: false
            
            def resolve(input:)
                new_cart = cart.dup
                product_id = input.product_id
                quantity = input.quantity

                new_cart[product_id] += quantity

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