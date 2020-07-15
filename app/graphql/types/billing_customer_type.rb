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
        # ! null true?
        field :orders, [Types::OrderType], null: true
    end
end

