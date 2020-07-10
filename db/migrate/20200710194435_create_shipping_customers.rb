class CreateShippingCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :shipping_customers do |t|
      t.string :company_name, null: false
      t.text :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip_code, null: false
      t.string :phone_number
      t.text :attn
      t.timestamps
    end
    add_index :shipping_customers, :company_name
  end
end
