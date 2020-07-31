# == Schema Information
#
# Table name: orders
#
#  id                   :bigint           not null, primary key
#  shipping_cost        :integer          default(1000), not null
#  tax_cost             :integer          not null
#  unit_price           :integer          not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  billing_customer_id  :integer          not null
#  shipping_customer_id :integer
#
# Indexes
#
#  index_orders_on_billing_customer_id   (billing_customer_id)
#  index_orders_on_shipping_customer_id  (shipping_customer_id)
#
FactoryBot.define do
  factory :order do
    
  end
end
