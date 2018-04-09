defmodule Cryptoapp.Subscribe.Alert do
  use Ecto.Schema
  import Ecto.Changeset


  schema "alerts" do
    field :currencyname, :string
    field :lowerlimit, :float
    field :upperlimit, :float
    belongs_to :user, Cryptoapp.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(alert, attrs) do
    alert
    |> cast(attrs, [:currencyname, :upperlimit, :lowerlimit, :user_id])
    |> validate_required([:currencyname, :upperlimit, :lowerlimit, :user_id])
  end
end
