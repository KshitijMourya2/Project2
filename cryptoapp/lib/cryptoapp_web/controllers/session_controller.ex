defmodule CryptoappWeb.SessionController do
  use CryptoappWeb, :controller

  alias Cryptoapp.Users

  def create(conn, %{"email" => email, "password" => password}) do
    user = get_and_auth_user(email, password)
    if user do
      conn
      |> put_session(:user_id, user.id)
      |> put_flash(:info, "Welcome back #{user.name}")
      |> redirect(to: alert_path(conn, :index))
    else
      conn
      |> put_flash(:error, "Can't create session")
      |> redirect(to: page_path(conn, :index))
    end
  end

  # TODO: Move to user.ex
  def get_and_auth_user(email, password) do
    user = Users.get_user_by_email(email)
    case Comeonin.Pbkdf2.check_pass(user, password) do
      {:ok, user} -> user
      _else       -> nil
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "Logged out")
    |> redirect(to: page_path(conn, :index))
  end
end
