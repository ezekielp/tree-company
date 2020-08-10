class AddTaxIdToBillingCustomers < ActiveRecord::Migration[6.0]
  def change
    add_column :billing_customers, :tax_id, :string
  end
end
