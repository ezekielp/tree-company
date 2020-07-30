class OrderMailer < ApplicationMailer
    def new_order_email
        @order = params[:order]
        mail(to: ENV.fetch('ADMIN_EMAIL'), subject: "New order at Thetreecompany.com")
    end
end
