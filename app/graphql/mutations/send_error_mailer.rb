module Types
    class SendErrorMailerInputType < Types::BaseInputObject
        argument :errors, [String], required: true
    end
end

module Mutations
    class SendErrorMailer < BaseMutation
        argument :input, Types::SendErrorMailerInputType, required: true

        field :errors, [String], null: true

        def resolve(input:)
            OrderMailer.with(errors: input.errors).new_order_error_email.deliver_later

            { errors: input.errors }
        end
    end
end