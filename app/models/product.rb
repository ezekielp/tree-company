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
class Product < ApplicationRecord
    validates :size, inclusion: { in: %w(11x15 12x18 6x8 5.5x8), message: "%{value} is not a valid size" }
    validates :material, inclusion: { in: [".05g HDPE", ".032g aluminum", "4mm corr"], message: "%{value} is not a valid material" }

    has_many :product_categories
    has_many :categories, through: :product_categories
    has_many :product_counties
    has_many :counties, through: :product_counties
    has_many :order_quantities
    has_many :orders, through: :order_quantities

    has_one_attached :image
    
end
