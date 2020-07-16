module Types
    class ProductType < Types::BaseObject
        field :id, ID, null: false
        field :name, String, null: false
        field :size, String, null: false
        field :material, String, null: false
        field :description, String, null: true
        field :style_number, String, null: true
        field :counties, [Types::CountyType], null: true
        field :image_url, String, null: true, extensions: [ImageUrlField]
        # TODO field :categories

        def counties
            product_counties.then do |product_county_list|
                county_ids = product_county_list.map(&:county_id)
                RecordLoader.for(County).load_many(county_ids)
            end
        end

        def product_counties
            AssociationLoader.for(ProductCounty, :product_id).load(object.id)
        end
    end
end

