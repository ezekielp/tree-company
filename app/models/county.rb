# == Schema Information
#
# Table name: counties
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_counties_on_name  (name) UNIQUE
#
class County < ApplicationRecord
    include Constants

    validates :name, inclusion: { in: (Constants::MARYLAND_COUNTIES + Constants::VIRGINIA_PLACES) }

    has_many :product_counties
    has_many :products, through: :product_counties
end
