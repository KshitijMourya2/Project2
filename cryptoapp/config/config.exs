# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :cryptoapp,
  ecto_repos: [Cryptoapp.Repo]

# Configures the endpoint
config :cryptoapp, CryptoappWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "aRCipx9WFcHldRr8nPVpythD53MdPogn2mb4QrDK5D8qbJ3OYNCiM0jdMjkbtb79",
  render_errors: [view: CryptoappWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Cryptoapp.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

  config :sendgrid,
  api_key: ""

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
