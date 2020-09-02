class ApplicationController < ActionController::Base
    before_action :ensure_session_token, :set_instance_variables

    def set_instance_variables
        @first_sign = Product.first
    end

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
        session[:expires_at] = Time.current + 14.days
    end

end
