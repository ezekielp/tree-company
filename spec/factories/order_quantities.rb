# == Schema Information
#
# Table name: order_quantities
#
#  id         :bigint           not null, primary key
#  quantity   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  order_id   :integer          not null
#  product_id :integer          not null
#
# Indexes
#
#  index_order_quantities_on_order_id    (order_id)
#  index_order_quantities_on_product_id  (product_id)
#
FactoryBot.define do
  factory :order_quantity do
    
  end
end
