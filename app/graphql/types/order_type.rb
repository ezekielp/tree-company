module Types
    class OrderType < Types::BaseObject
        field :id, ID, null: false
        field :billing_customer_id, Integer, null: false
        field :shipping_customer_id, Integer, null: false
        field :shipping_cost, Integer, null: false
        field :tax_cost, Integer, null: false
        field :unit_price, Integer, null: false
        # ! null true?
        field :products, [Types::ProductType], null: true
    end
end

