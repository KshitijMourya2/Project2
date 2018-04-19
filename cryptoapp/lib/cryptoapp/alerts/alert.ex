defmodule Cryptoapp.Alerts.Alert do
  use Ecto.Schema
  import Ecto.Changeset


  schema "alerts" do
    field :currency_name, :string
    field :currentprice, :float, default: 0 
    field :lower_limit, :float
    field :upper_limit, :float
    belongs_to :user, Cryptoapp.Users.User

    timestamps()
  end

  @doc false
  def changeset(alert, attrs) do
    alert
    |> cast(attrs, [:currency_name, :upper_limit, :lower_limit, :currentprice, :user_id])
    |> validate_required([:currency_name, :upper_limit, :lower_limit, :user_id])
  end
end
