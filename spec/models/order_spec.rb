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
require 'rails_helper'

RSpec.describe Order, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
