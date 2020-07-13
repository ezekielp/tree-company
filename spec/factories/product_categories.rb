# == Schema Information
#
# Table name: product_categories
#
#  id          :bigint           not null, primary key
#  category_id :integer          not null
#  product_id  :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :product_category do
    
  end
end
