defmodule CryptoappWeb.TokenView do
  use CryptoappWeb, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      user_name: user.name,
      token: token,
    }
  end
end
