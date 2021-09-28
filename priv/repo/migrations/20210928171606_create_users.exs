defmodule ChatGraphql.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :name, :string
      add :address, :string
      add :password, :string
      add :username, :string

      timestamps()
    end

  end
end
