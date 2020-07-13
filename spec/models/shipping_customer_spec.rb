# == Schema Information
#
# Table name: shipping_customers
#
#  id           :bigint           not null, primary key
#  company_name :string           not null
#  address      :text             not null
#  city         :string           not null
#  state        :string           not null
#  zip_code     :string           not null
#  phone_number :string
#  attn         :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
require 'rails_helper'

RSpec.describe ShippingCustomer, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
