module Types
    class CategoryType < Types::BaseObject
        field :id, ID, null: false
        field :name, String, null: false
        field :products, [Types::ProductType], null: false
    end
end
