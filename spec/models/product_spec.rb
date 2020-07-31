# == Schema Information
#
# Table name: products
#
#  id           :bigint           not null, primary key
#  description  :text
#  material     :string           not null
#  name         :string           not null
#  size         :string           not null
#  style_number :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_products_on_name_and_id  (name,id)
#
require 'rails_helper'

RSpec.describe Product, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
