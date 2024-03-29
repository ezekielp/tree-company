module Types
    class CreateBillingCustomerInputType < Types::BaseInputObject
        argument :name, String, required: true
        argument :address, String, required: true
        argument :city, String, required: true
        argument :state, String, required: true
        argument :email, String, required: true
        argument :zip_code, String, required: true
        argument :phone_number, String, required: false
        argument :tax_exempt, Boolean, required: false
        argument :tax_id, String, required: false
    end
end

module Mutations
    class CreateBillingCustomer < BaseMutation
        argument :input, Types::CreateBillingCustomerInputType, required: true

        field :billing_customer, Types::BillingCustomerType, null: false

        def resolve(input:)
            new_billing_customer = BillingCustomer.create(
                name: input.name,
                address: input.address,
                city: input.city,
                state: input.state,
                email: input.email,
                zip_code: input.zip_code
            )

            new_billing_customer.phone_number = "1" + input.phone_number if input.phone_number && input.phone_number.length > 0
            new_billing_customer.tax_exempt = input.tax_exempt if input.tax_exempt
            new_billing_customer.tax_id = input.tax_id if input.tax_id
            new_billing_customer.save!

            { billing_customer: new_billing_customer }
        end
    end
end