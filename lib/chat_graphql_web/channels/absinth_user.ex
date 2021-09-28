defmodule ChatGraphqlWeb.AbsinthUser do
  use Phoenix.Socket
  use Absinthe.Phoenix.Socket,
      schema: ChatGraphqlWeb.Schema.AuthSchema

  transport :websocket, Phoenix.Transports.WebSocket

  def connect(params, socket) do

    {:ok, socket}
  end

  def id(_socket), do: nil

end