defmodule CryptoappWeb.AlertView do
  use CryptoappWeb, :view
  alias CryptoappWeb.AlertView
  alias CryptoappWeb.UserView

  def render("index.json", %{alerts: alerts}) do
    %{data: render_many(alerts, AlertView, "alert.json")}
  end

  def render("show.json", %{alert: alert}) do
    %{data: render_one(alert, AlertView, "alert.json")}
  end

  def render("alert.json", %{alert: alert}) do
    %{id: alert.id,
      currency_name: alert.currency_name,
      upper_limit: alert.upper_limit,
      lower_limit: alert.lower_limit,
      currentprice: alert.currentprice,
      user: render_one(alert.user, UserView, "user.json")}
  end
end
