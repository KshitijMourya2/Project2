defmodule Cryptoapp.Repo.Migrations.CreateAlerts do
  use Ecto.Migration

  def change do
    create table(:alerts) do
      add :currency_name, :string, null: false
      add :upper_limit, :float, null: false
      add :lower_limit, :float, null: false
      add :currentprice, :float, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:alerts, [:user_id])
  end
end
