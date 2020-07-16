class ImageUrlField < GraphQL::Schema::FieldExtension
    attr_reader :attachment_association
    
    def apply
        attachment = options&.[](:attachment) || field.original_name.to_s.sub(/_url$/, "")

        @attachment_association = "#{attachment}_attachment"
    end

    def resolve(object:, **_rest)
        AssociationLoader.for(
            object.class,
            # NOT SURE IF BELOW ARROW SYNTAX IS CORRECT 
            attachment_association => :blob
        )
    end

    def after_resolve(value:, arguments:, **_rest)
        return if value.nil?

        Rails.application.routes.url_helpers.url_for(value)
    end
end
