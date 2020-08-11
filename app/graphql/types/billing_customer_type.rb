module Types
    class BillingCustomerType < Types::BaseObject
        field :id, ID, null: false
        field :name, String, null: false
        field :address, String, null: false
        field :city, String, null: false
        field :state, String, null: false
        field :email, String, null: false
        field :zip_code, String, null: false
        field :phone_number, String, null: true
        field :tax_exempt, Boolean, null: false
        field :tax_id, String, null: true
        field :orders, [Types::OrderType], null: true

        def orders
            AssociationLoader.for(Order, :billing_customer_id).load(object.id)
        end
    end
end
