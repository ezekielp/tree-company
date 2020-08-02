class ChangeShippingAddressToNullTrue < ActiveRecord::Migration[6.0]
  def change
    change_column_null :orders, :shipping_customer_id, true
  end
end
