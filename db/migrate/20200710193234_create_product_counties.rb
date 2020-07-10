class CreateProductCounties < ActiveRecord::Migration[6.0]
  def change
    create_table :product_counties do |t|
      t.integer :county_id, foreign_key: true, null: false
      t.integer :product_id, foreign_key: true, null: false
      t.timestamps
    end
  end
end
