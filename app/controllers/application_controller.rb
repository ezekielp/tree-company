class ApplicationController < ActionController::Base

    def ensure_session_token
        if !session[:session_token] || expired?
            session[:session_token] = SecureRandom.urlsafe_base64(16)
            session[:session_cart] = []
        end
            
        set_session_expiration
    end

    def expired?
        session[:expires_at] > Time.current ? True : False
    end

    def set_session_expiration
        session[:expires_at] = Time.current + 7.days
    end

end
