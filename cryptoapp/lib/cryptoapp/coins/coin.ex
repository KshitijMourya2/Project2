defmodule Cryptoapp.Coins.Coin do
  use Ecto.Schema
  import Ecto.Changeset


  schema "coins" do
    field :coin_name, :string

    timestamps()
  end

  @doc false
  def changeset(coin, attrs) do
    coin
    |> cast(attrs, [:coin_name])
    |> validate_required([:coin_name])
  end
end
