class CreateProductCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :product_categories do |t|
      t.integer :category_id, null: false
      t.integer :product_id, null: false
      t.timestamps
    end
  end
end
