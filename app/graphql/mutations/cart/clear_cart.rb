module Mutations
    module Cart
        class ClearCart < BaseMutation
            field :cart, [Types::CartItemType], null: true

            def resolve
                context[:cart] = {}
                { cart: [] }
            end
        end
    end
end
