class RemoveShippingCustomerIndexOnOrdersTable < ActiveRecord::Migration[6.0]
  def change
    remove_index :orders, :shipping_customer_id
  end
end
