class OrderMailer < ApplicationMailer
    def new_order_admin_email
        @order = params[:order]
        mail(to: ENV.fetch('ADMIN_EMAIL'), subject: "New order at Thetreecompany.com")
    end

    def new_order_customer_email(email_address)
        @order = params[:order]
        mail(to: email_address, subject: "Order confirmation from The Tree Company")
    end

    def new_order_error_email
        @errors = params[:errors]
        mail(to: ENV.fetch('ZEKE_EMAIL'), subject: 'Uh oh! New order error at Thetreecompany.com')
    end
end
