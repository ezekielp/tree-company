module Types
  class QueryType < Types::BaseObject
    field :products, [Types::ProductType], null: true
    field :products_by_id, [Types::ProductType], null: true do
      argument :product_ids, [String], required: true
    end
    field :product, Types::ProductType, null: true do
      argument :product_id, String, required: true
    end
    field :cart, [Types::CartItemType], null: true

    def products
      Product.all
    end

    def products_by_id(args)
      return nil unless args
      Product.find(args[:product_ids])
    end

    def product(args)
      return nil unless args
      Product.find(args[:product_id])
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
