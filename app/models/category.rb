# == Schema Information
#
# Table name: categories
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Category < ApplicationRecord
    validates :name, inclusion: { in: ["wetland_stream_buffer", "forest_conservation"] }

    has_many :product_categories
    has_many :products, through: :product_categories
end
