# == Schema Information
#
# Table name: billing_customers
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  address      :text             not null
#  city         :string           not null
#  state        :string           not null
#  email        :string           not null
#  zip_code     :string           not null
#  phone_number :string
#  tax_exempt   :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
FactoryBot.define do
  factory :billing_customer do
    
  end
end
