module Mutations
    module Cart
        class AddToCart < BaseMutation
            argument :input, Types::UpdateCartInputType, required: true

            field :cart, [Types::CartItemType], null: false
            
            def resolve(input:)
                cart = context[:cart]
                product_id = input.product_id
                quantity = input.quantity

                cart[product_id] = 0 if !cart[product_id]
                cart[product_id] += quantity

                cart_as_array = []

                cart.each do |product_id, quantity|
                    cart_as_array << { 
                    product_id: product_id,
                    quantity: quantity
                    }
                end

                debugger    
                
                { cart: cart_as_array }
            end
        end
    end
end