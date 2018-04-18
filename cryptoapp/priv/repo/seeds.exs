# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Cryptoapp.Repo.insert!(%Cryptoapp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Cryptoapp.Repo
  alias Cryptoapp.Users.User
  alias Cryptoapp.Alerts.Alert
  alias Cryptoapp.Coins.Coin

  def run do
    pa = Comeonin.Pbkdf2.hashpwsalt("alice123");

    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "Bob", email: "bob@example.com", password_hash: pa })

    Repo.delete_all(Alert)
    Repo.insert!(%Alert{ currency_name: "BTC", upper_limit: 1000.0, lower_limit: 500.0, currentprice: 750.0, user_id: a.id })
    #Repo.delete_all(Coin)
    #Repo.insert!(%Coin{ coin_name: "BTC"})
    #Repo.insert!(%Coin{ coin_name: "ETH"})
    #Repo.insert!(%Coin{ coin_name: "LTC"})
    #Repo.insert!(%Coin{ coin_name: "DASH"})
    #Repo.insert!(%Coin{ coin_name: "XMR"})
    #Repo.insert!(%Coin{ coin_name: "NXT"})
    #Repo.insert!(%Coin{ coin_name: "ETC"})
    #Repo.insert!(%Coin{ coin_name: "DOGE"})
    #Repo.insert!(%Coin{ coin_name: "ZEC"})
    #Repo.insert!(%Coin{ coin_name: "BTS"})
    #Repo.insert!(%Coin{ coin_name: "DGB"})
    #Repo.insert!(%Coin{ coin_name: "XRP"})
    #Repo.insert!(%Coin{ coin_name: "BTCD"})
    #Repo.insert!(%Coin{ coin_name: "PPC"})
    #Repo.insert!(%Coin{ coin_name: "CRAIG"})
    #Repo.insert!(%Coin{ coin_name: "XBS"})
    #Repo.insert!(%Coin{ coin_name: "XPY"})
    #Repo.insert!(%Coin{ coin_name: "PRC"})
    #Repo.insert!(%Coin{ coin_name: "YBC"})
    #Repo.insert!(%Coin{ coin_name: "DANK"})

  end
end

Seeds.run
