defmodule ChatGraphql.Repo do
  use Ecto.Repo,
    otp_app: :chat_graphql,
    adapter: Ecto.Adapters.Postgres
end
