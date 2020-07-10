class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.string :size, null: false
      t.string :material, null: false
      t.text :description
      t.string :style_number
      t.timestamps
    end
    add_index :products, [:name, :id]
  end
end
