# == Schema Information
#
# Table name: products
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  size         :string           not null
#  material     :string           not null
#  description  :text
#  style_number :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Product < ApplicationRecord
    validates :size, inclusion: { in: %w(11x15 12x18 6x8 5.5x8), message: "%{value} is not a valid size" }
    validates :material, inclusion: { in: [".05g HDPE", ".032g aluminum"], message: "%{value} is not a valid material" }

    # has_many :product_categories
    has_many :categories, through: :product_categories
    has_many :counties, through: :product_counties

end
