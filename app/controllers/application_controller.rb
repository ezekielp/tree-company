class ApplicationController < ActionController::Base

    def ensure_session_token
        if !session[:session_token] || expired?
            session[:session_token] = SecureRandom.urlsafe_base64(16)
            session[:session_cart] = []
        end
            
        renew_session_expiration
    end

    def expired?
        session[:expires_at] > Time.now ? True : False
    end

    def renew_session_expiration
        days = 24*60*60
        session[:expires_at] = Time.now + 7*days
    end

end
