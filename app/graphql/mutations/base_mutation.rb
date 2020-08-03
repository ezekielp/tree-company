module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    null false
    # argument_class Types::BaseArgument
    # field_class Types::BaseField
    # input_object_class Types::BaseInputObject
    # object_class Types::BaseObject

    # def cart
    #   context[:cart]
    # end

    # def add_to_cart(product_id, quantity)
    #   context[:add_to_cart](product_id, quantity)
    # end

    # delegate :add_to_cart,
    #       to: :cart_context

    # def cart_context
    #   context[:cart_context]
    # end
  end
end
