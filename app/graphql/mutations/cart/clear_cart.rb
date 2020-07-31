module Mutations
    module Cart
        class ClearCart < BaseMutation
            def resolve
                context[:cart] = {}
            end
        end
    end
end
