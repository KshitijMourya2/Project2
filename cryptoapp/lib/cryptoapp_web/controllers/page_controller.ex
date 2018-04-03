defmodule CryptoappWeb.PageController do
  use CryptoappWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
