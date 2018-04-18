defmodule Cryptoapp.Alerts do
  @moduledoc """
  The Alerts context.
  """

  import Ecto.Query, warn: false
  alias Cryptoapp.Repo
  alias Cryptoapp.Users.User
  alias Cryptoapp.Alerts.Alert

  @doc """
  Returns the list of alerts.

  ## Examples

      iex> list_alerts()
      [%Alert{}, ...]

  """
  def list_alerts do
    Repo.all(Alert)
    |> Repo.preload(:user)
  end

  @doc """
  Gets a single alert.

  Raises `Ecto.NoResultsError` if the Alert does not exist.

  ## Examples

      iex> get_alert!(123)
      %Alert{}

      iex> get_alert!(456)
      ** (Ecto.NoResultsError)

  """
  def get_alert!(id) do
    Repo.get!(Alert, id)
    |> Repo.preload(:user)
  end

  @doc """
  Creates a alert.

  ## Examples

      iex> create_alert(%{field: value})
      {:ok, %Alert{}}

      iex> create_alert(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_alert(attrs \\ %{}) do
    {:ok, alert} = %Alert{}
    |> Alert.changeset(attrs)
    |> Repo.insert()
    {:ok, Repo.preload(alert, :user)}
  end

  @doc """
  Updates a alert.

  ## Examples

      iex> update_alert(alert, %{field: new_value})
      {:ok, %Alert{}}

      iex> update_alert(alert, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_alert(%Alert{} = alert, attrs) do
    alert
    |> Alert.changeset(attrs)
    |> Repo.update()
  end

  def get_alert_by_currency(name) do
    IO.inspect(name)
    Repo.get_by(Alert, currency_name: name)
  end

  def update_curr_price(name, price) do
    #subset_query = Repo.get_by(Alert, currency_name: name) |> Repo.preload(:user)
    #Repo.update_all(
    #   from(a in Alert, join: s in subquery(subset_query), on: s.id == a.id),
    #   set: [currentprice: price]
    #)
    from(a in Alert, where: a.currency_name == ^name)
    |> Repo.preload(:user)
    |> Repo.update_all(set: [currentprice: price])
  end

  @doc """
  Deletes a Alert.

  ## Examples

      iex> delete_alert(alert)
      {:ok, %Alert{}}

      iex> delete_alert(alert)
      {:error, %Ecto.Changeset{}}

  """
  def delete_alert(%Alert{} = alert) do
    Repo.delete(alert)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking alert changes.

  ## Examples

      iex> change_alert(alert)
      %Ecto.Changeset{source: %Alert{}}

  """
  def change_alert(%Alert{} = alert) do
    Alert.changeset(alert, %{})
  end
end
