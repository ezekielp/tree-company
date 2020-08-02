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
require 'rails_helper'

RSpec.describe County, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
