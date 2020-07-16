namespace :graphql do
    task dump_schema: :environment do
        definition = TreeCompanySchema.to_definition
        schema_path = 'app/graphql/schema.graphql'

        File.write(Rails.root.join(schema_path), definition)
    end
end
