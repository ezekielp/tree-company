
module Types
    class OrderType < Types::BaseObject
        field :id, ID, null: false
        field :billing_customer_id, Integer, null: false
        field :shipping_customer_id, Integer, null: true
        field :shipping_cost, Integer, null: false
        field :tax_cost, Integer, null: false
        field :unit_price, Integer, null: false
        field :order_quantities, [Types::OrderQuantityType], null: false
        field :products, [Types::ProductType], null: false

        def products
            order_quantities.then do |order_quantity_list|
                product_ids = order_quantity_list.map(&:product_id)
                RecordLoader.for(Product).load_many(product_ids)
            end
        end

        private

        def order_quantities
            AssociationLoader.for(Order, :order_quantities).load(object)
        end
    end
end
