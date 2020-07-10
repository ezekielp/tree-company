class CreateBillingCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :billing_customers do |t|
      t.string :name, null: false
      t.text :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :email, null: false
      t.string :zip_code, null: false
      t.string :phone_number
      t.boolean :tax_exempt, null: false, default: false
      t.timestamps
    end

    add_index :billing_customers, :name
  end
end