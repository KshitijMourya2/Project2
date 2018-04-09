defmodule Cryptoapp.Repo.Migrations.CreateAlerts do
  use Ecto.Migration

  def change do
    create table(:alerts) do
      add :currencyname, :string, null: false
      add :upperlimit, :float, null: false
      add :lowerlimit, :float, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:alerts, [:user_id])
  end
end
