class CartContext

    def initialize(http_context)
    end

    def add_to_cart(product_id, quantity)
        # session[:cart][product_id] = 0 if (!session[:cart][product_id]) 
        # debugger
        session[:cart][product_id] += quantity
        # debugger
    end


end