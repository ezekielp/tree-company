module Types
    class CreateShippingCustomerInputType < Types::BaseInputObject
        argument :company_name, String, required: true
        argument :address, String, required: true
        argument :city, String, required: true
        argument :state, String, required: true
        argument :zip_code, String, required: true
        argument :phone_number, String, required: false
        argument :attn, String, required: false
    end
end

module Mutations
    class CreateShippingCustomer < BaseMutation
        argument :input, Types::CreateShippingCustomerInputType, required: true

        field :shipping_customer, Types::ShippingCustomerType, null: false

        def resolve(input:)
            new_shipping_customer = ShippingCustomer.create!(
                company_name: input.company_name,
                address: input.address,
                city: input.city,
                state: input.state,
                zip_code: input.zip_code
            )

            # debugger
            new_shipping_customer.phone_number = "1" + input.phone_number if input.phone_number && input.phone_number.length > 0
            new_shipping_customer.attn = input.attn if input.attn

            { shipping_customer: new_shipping_customer }
        end
    end
end