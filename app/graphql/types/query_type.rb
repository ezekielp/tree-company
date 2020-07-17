module Types
  class QueryType < Types::BaseObject
    field :products, [Types::ProductType], null: true
    field :cart, [Types::CartItemType], null: true

    def products
      Product.all
    end

    def cart
      res = []
      context[:cart].each do |product_id, quantity|
        res << { 
          product_id: product_id,
          quantity: quantity
        }
      end
      
      res
    end

  end
end
