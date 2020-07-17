module Types
    class CartType < Types::BaseObject
        field :product_id, ID, null: false
        field :quantity, Int, null: false
    end
end
