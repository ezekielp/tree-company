# Preview all emails at http://localhost:3000/rails/mailers/order_mailer
class OrderMailerPreview < ActionMailer::Preview
    def new_order_email
        order = Order.find(1)
        OrderMailer.with(order: order).new_order_email
    end
end
