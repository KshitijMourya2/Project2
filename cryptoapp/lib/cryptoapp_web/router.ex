defmodule CryptoappWeb.Router do
  use CryptoappWeb, :router

  alias Cryptoapp.Users

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :get_current_user
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  def get_current_user(conn, _params) do
    user_id = get_session(conn, :user_id)
    user = Users.get_user(user_id || -1)
    assign(conn, :current_user, user)
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CryptoappWeb do
    pipe_through :browser # Use the default browser stack

    post "/session", SessionController, :create
    delete "/session", SessionController, :delete

    post "/user", UserController, :create

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/alerts", PageController, :index
    get "/newAlert", PageController, :index
    get "/register", PageController, :index
    get "/editAlert", PageController, :index
    get "/users/:id", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", CryptoappWeb do
     pipe_through :api
     resources "/users", UserController, except: [:new, :edit]
     resources "/alerts", AlertController, except: [:new, :edit]
     post "/token", TokenController, :create
  end
end
