# == Schema Information
#
# Table name: orders
#
#  id                   :bigint           not null, primary key
#  billing_customer_id  :integer          not null
#  shipping_customer_id :integer          not null
#  shipping_cost        :integer          default(1000), not null
#  tax_cost             :integer          not null
#  unit_price           :integer          not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
class Order < ApplicationRecord
    validates :shipping_cost, inclusion: { in: [1000, 0] }
    validates :unit_price, inclusion: { in: [300, 400, 500, 700] }

    belongs_to :shipping_customer
    belongs_to :billing_customer
    has_many :order_quantities
    has_many :products, through: :order_quantities

    def order_items
        order_products = self.products
        self.order_quantities.map do |oq|
            {
                product: order_products.find { |p| p.id == oq.product_id },
                quantity: oq.quantity
            }
        end
    end

    def price_in_dollars(price)
        price / 100
    end

    def subtotal
        order_quantities.sum(:quantity) * self.unit_price
    end

    def total_cost
        self.subtotal + self.tax_cost + self.shipping_cost
    end
end
