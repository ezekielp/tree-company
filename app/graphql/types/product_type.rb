module Types
    class ProductType < Types::BaseObject
        field :id, ID, null: false
        field :name, String, null: false
        field :size, String, null: false
        field :material, String, null: false
        field :description, String, null: true
        field :style_number, String, null: true
        # TODO Add CountyType?
        field :counties, [Types::CountyType], null: true
        # TODO field :images
        # TODO field :categories
    end
end

