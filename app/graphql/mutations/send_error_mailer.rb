module Types
    class SendErrorMailerInputType < Types::BaseInputObject
        argument :order_id, Int, required: true
    end
end

module Mutations
    class SendErrorMailer < BaseMutation
        argument :input, Types::SendErrorMailerInputType, required: true

        def resolve(input:)
            
        end
    end
end