defmodule CryptoappWeb.CoinView do
  use CryptoappWeb, :view
  alias CryptoappWeb.CoinView

  def render("index.json", %{coins: coins}) do
    %{data: render_many(coins, CoinView, "coin.json")}
  end

  def render("show.json", %{coin: coin}) do
    %{data: render_one(coin, CoinView, "coin.json")}
  end

  def render("coin.json", %{coin: coin}) do
    %{id: coin.id,
      coin_name: coin.coin_name}
  end
end
