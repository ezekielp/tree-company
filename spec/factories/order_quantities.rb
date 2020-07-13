# == Schema Information
#
# Table name: order_quantities
#
#  id         :bigint           not null, primary key
#  product_id :integer          not null
#  order_id   :integer          not null
#  quantity   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :order_quantity do
    
  end
end
