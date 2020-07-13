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
class ProductCategory < ApplicationRecord
    belongs_to :product
    belongs_to :category
end
