module Mutations
    module Cart
        class ClearCart < BaseMutation
            field :cart, [Types::CartItemType], null: true

            def resolve
                context[:cart].each_key do |product_id|
                    context[:cart].delete(product_id)
                end
                { cart: [] }
            end
        end
    end
end
