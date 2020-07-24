module Types
    class StripePaymentIntentType < Types::BaseObject
        field :id, ID, null: false
        field :amount, Integer, null: true
        field :client_secret, String, null: true
        field :description, String, null: true
        field :receipt_email, String, null: true
        field :status, String, null: false
    end
end