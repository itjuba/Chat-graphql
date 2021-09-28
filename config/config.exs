# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :chat_graphql,
  ecto_repos: [ChatGraphql.Repo]

# Configures the endpoint
config :chat_graphql, ChatGraphqlWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "6gigaP/7bo0Pjx5X7FRaotNgOR9MiaBCxkPSvKiRRUcGPixW8WF/rsaQdBH66Yrn",
  render_errors: [view: ChatGraphqlWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: ChatGraphql.PubSub,
  live_view: [signing_salt: "QYlMOAvA"]


config :chat_graphql,
                 username: System.get_env("username"),
                 password: System.get_env("password")

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
