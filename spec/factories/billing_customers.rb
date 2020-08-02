# == Schema Information
#
# Table name: billing_customers
#
#  id           :bigint           not null, primary key
#  address      :text             not null
#  city         :string           not null
#  email        :string           not null
#  name         :string           not null
#  phone_number :string
#  state        :string           not null
#  tax_exempt   :boolean          default(FALSE), not null
#  zip_code     :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_billing_customers_on_name  (name)
#
FactoryBot.define do
  factory :billing_customer do
    
  end
end
