class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.integer :billing_customer_id, null: false, foreign_key: true
      t.integer :shipping_customer_id, null: false, foreign_key: true
      t.integer :shipping_cost, null: false, default: 1000
      t.integer :tax_cost, null: false
      t.integer :unit_price, null: false
      t.timestamps
    end

    add_index :orders, :billing_customer_id
    add_index :orders, :shipping_customer_id
  end
end
