# == Schema Information
#
# Table name: product_counties
#
#  id         :bigint           not null, primary key
#  county_id  :integer          not null
#  product_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :product_county do
    
  end
end
