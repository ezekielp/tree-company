# == Schema Information
#
# Table name: orders
#
#  id                   :bigint           not null, primary key
#  billing_customer_id  :integer          not null
#  shipping_customer_id :integer          not null
#  shipping_cost        :integer          default(1000), not null
#  tax_cost             :integer          not null
#  unit_price           :integer          not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
class Order < ApplicationRecord
    validates :shipping_cost, inclusion: { in: [1000, 0] }
    validates :unit_price, inclusion: { in: [300, 400, 500, 700] }

    belongs_to :shipping_customer
    belongs_to :billing_customer

end
