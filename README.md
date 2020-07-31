# The Tree Company

## Shell commands for running and working with the app locally

* `bin/webpack-dev-server`: Runs a Webpack dev server that watches frontend code and refreshes whenever you save
* `rails s`: Runs the Rails server (Puma)
* `bundle exec sidekiq -q default -q mailers`: Starts Sidekiq for background processing (currently just for Action Mailer jobs)
* `yarn codegen`: Generates new GraphQL types and helper hooks after writing new GraphQL types, queries, mutations, etc.
