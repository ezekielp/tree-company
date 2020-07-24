Rails.application.routes.draw do
  root 'root#index'
  post "/graphql", to: "graphql#execute"

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  # get '*path', to: 'root#index'

end
