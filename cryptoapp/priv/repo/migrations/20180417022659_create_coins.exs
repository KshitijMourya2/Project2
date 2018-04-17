defmodule Cryptoapp.Repo.Migrations.CreateCoins do
  use Ecto.Migration

  def change do
    create table(:coins) do
      add :coin_name, :string

      timestamps()
    end

  end
end
