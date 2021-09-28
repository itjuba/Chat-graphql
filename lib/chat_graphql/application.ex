defmodule ChatGraphql.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      ChatGraphql.Repo,
      # Start the Telemetry supervisor
      ChatGraphqlWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: ChatGraphql.PubSub},
      ChatGraphqlWeb.Endpoint,
      # Start the Endpoint (http/https)
      {Absinthe.Subscription, [ChatGraphqlWeb.Endpoint]}

      # Start a worker by calling: ChatGraphql.Worker.start_link(arg)
      # {ChatGraphql.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ChatGraphql.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    ChatGraphqlWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
