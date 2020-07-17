module Types
  class QueryType < Types::BaseObject
    field :products, [Types::ProductType], null: true
    field :cart, Types::CartType, null: true

    def products
      Product.all
    end

    def cart
      context[:cart]
    end
  end
end
