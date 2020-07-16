class ApplicationController < ActionController::Base
    before_action :ensure_session_token

    def ensure_session_token
        if !session[:session_token] || session_token_expired?
            session[:session_token] = SecureRandom.urlsafe_base64(16)
            session[:cart] = {}
        end
            
        set_session_expiration
    end

    def session_token_expired?
        session[:expires_at] > Time.current ? True : False
    end

    def set_session_expiration
        session[:expires_at] = Time.current + 7.days
    end

end
