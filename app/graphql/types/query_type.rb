module Types
  class QueryType < Types::BaseObject
    field :products, Types::ProductType, null: true

    def products
      Product.all
    end

  end
end
