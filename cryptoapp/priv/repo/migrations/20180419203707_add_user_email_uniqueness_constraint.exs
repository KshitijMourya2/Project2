defmodule Cryptoapp.Repo.Migrations.AddUserEmailUniquenessConstraint do
  use Ecto.Migration

  def change do
      create unique_index :users, [:email], name: :user_email_unique
  end
end
