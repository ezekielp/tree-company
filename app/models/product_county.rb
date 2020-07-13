# == Schema Information
#
# Table name: product_counties
#
#  id         :bigint           not null, primary key
#  county_id  :integer          not null
#  product_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ProductCounty < ApplicationRecord
    belongs_to :product
    belongs_to :county
end
