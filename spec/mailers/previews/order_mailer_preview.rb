# Preview all emails at http://localhost:3000/rails/mailers/order_mailer
class OrderMailerPreview < ActionMailer::Preview
    def new_order_admin_email
        order = Order.last
        OrderMailer.with(order: order).new_order_admin_email
    end

    def new_order_customer_email
        order = Order.last
        OrderMailer.with(order: order).new_order_customer_email("ezekielp@gmail.com")
    end
end
