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

  def run do
    pa = Comeonin.Pbkdf2.hashpwsalt("alice123");

    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "Alice", email: "alice@example.com", password_hash: pa })

    Repo.delete_all(Alert)
    Repo.insert!(%Alert{ currency_name: "BTC", upper_limit: 1000.0, lower_limit: 500.0, currentprice: 750.0, user_id: a.id })
  end
end

Seeds.run
