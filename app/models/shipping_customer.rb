# == Schema Information
#
# Table name: shipping_customers
#
#  id           :bigint           not null, primary key
#  address      :text             not null
#  attn         :text
#  city         :string           not null
#  company_name :string           not null
#  phone_number :string
#  state        :string           not null
#  zip_code     :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_shipping_customers_on_company_name  (company_name)
#
class ShippingCustomer < ApplicationRecord
    validates :state, inclusion: { in: Constants::STATES }
    validates :zip_code, zipcode: { country_code: :us }
    validates :phone_number, phone: { possible: true, countries: :us, allow_blank: true }

    has_many :orders
end
