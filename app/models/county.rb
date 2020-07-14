# == Schema Information
#
# Table name: counties
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class County < ApplicationRecord
    include Constants

    validates :name, inclusion: { in: Constants::MARYLAND_COUNTIES }

    has_many :product_counties
    has_many :products, through: :product_counties
end
