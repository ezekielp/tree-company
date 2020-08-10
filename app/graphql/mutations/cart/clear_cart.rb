module Mutations
    module Cart
        class ClearCart < BaseMutation
            field :cart, [Types::CartItemType], null: true

            def resolve
                context[:cart] = Hash.new { |h, k| h[k] = 0 }
                { cart: [] }
            end
        end
    end
end
