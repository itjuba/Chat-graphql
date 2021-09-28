defmodule ChatGraphqlWeb.PageController do
  use ChatGraphqlWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
