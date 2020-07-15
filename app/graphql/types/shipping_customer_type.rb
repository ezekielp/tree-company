module Types
    class ShippingCustomerType < Types::BaseObject
        field :id, ID, null: false
        field :company_name, String, null: false
        field :address, String, null: false
        field :city, String, null: false
        field :state, String, null: false
        field :zip_code, String, null: false
        field :phone_number, String, null: true
        field :attn, String, null: true
        # ! null true?
        field :orders, [Types::OrderType], null: true
    end
end

