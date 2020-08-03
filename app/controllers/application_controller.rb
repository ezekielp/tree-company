class ApplicationController < ActionController::Base
    before_action :ensure_session_token
    # helper_method :add_to_cart

    def ensure_session_token
        if !session[:session_token] || !session[:cart] || session_token_expired?
            session[:session_token] = SecureRandom.urlsafe_base64(16)
            session[:cart] = Hash.new { |h, k| h[k] = 0 }
        end
            
        set_session_expiration
    end

    def session_token_expired?
        session[:expires_at] < Time.current ? true : false
    end

    def set_session_expiration
        session[:expires_at] = Time.current + 7.days
    end

    # def cart_context
    #     @cart_context ||= {
    #         add_to_cart: add_to_cart
    #     }
    # end

    # delegate :add_to_cart,
    #         to: :application_controller

    # def add_to_cart(product_id, quantity)
    # #     # session[:cart][product_id] = 0 if (!session[:cart][product_id]) 
    # #     debugger
    #     session[:cart][product_id] += quantity
    # #     debugger
    # end
end
