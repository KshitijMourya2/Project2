defmodule CryptoappWeb.Router do
  use CryptoappWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :get_current_user
    plug :get_users_list
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  def get_current_user(conn, _params) do
    user_id = get_session(conn, :user_id)
    user = Cryptoapp.Accounts.get_user(user_id || -1)
    assign(conn, :current_user, user)
  end

  def get_users_list(conn, _params) do
    users = Cryptoapp.Subscribe.get_users()
    assign(conn, :users_list, users)
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CryptoappWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    resources "/users", UserController
    resources "/alerts", AlertController
  end

  # Other scopes may use custom stacks.
  # scope "/api", CryptoappWeb do
  #   pipe_through :api
  # end
end
