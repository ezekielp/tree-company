class CreateOrderQuantities < ActiveRecord::Migration[6.0]
  def change
    create_table :order_quantities do |t|
      t.integer :product_id, null: false, foreign_key: true
      t.integer :order_id, null: false, foreign_key: true
      t.integer :quantity, null: false
      t.timestamps
    end
    add_index :order_quantities, :product_id
    add_index :order_quantities, :order_id
  end
end
