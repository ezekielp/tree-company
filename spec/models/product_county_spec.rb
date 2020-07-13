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
require 'rails_helper'

RSpec.describe ProductCounty, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
