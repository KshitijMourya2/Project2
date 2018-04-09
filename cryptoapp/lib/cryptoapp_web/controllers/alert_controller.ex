defmodule CryptoappWeb.AlertController do
  use CryptoappWeb, :controller

  alias Cryptoapp.Subscribe
  alias Cryptoapp.Subscribe.Alert

  def index(conn, _params) do
    alerts = Subscribe.list_alerts()
    render(conn, "index.html", alerts: alerts)
  end

  def new(conn, _params) do
    changeset = Subscribe.change_alert(%Alert{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"alert" => alert_params}) do
    case Subscribe.create_alert(alert_params) do
      {:ok, alert} ->
        conn
        |> put_flash(:info, "Alert created successfully.")
        |> redirect(to: alert_path(conn, :show, alert))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    alert = Subscribe.get_alert!(id)
    render(conn, "show.html", alert: alert)
  end

  def edit(conn, %{"id" => id}) do
    alert = Subscribe.get_alert!(id)
    changeset = Subscribe.change_alert(alert)
    render(conn, "edit.html", alert: alert, changeset: changeset)
  end

  def update(conn, %{"id" => id, "alert" => alert_params}) do
    alert = Subscribe.get_alert!(id)

    case Subscribe.update_alert(alert, alert_params) do
      {:ok, alert} ->
        conn
        |> put_flash(:info, "Alert updated successfully.")
        |> redirect(to: alert_path(conn, :show, alert))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", alert: alert, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    alert = Subscribe.get_alert!(id)
    {:ok, _alert} = Subscribe.delete_alert(alert)

    conn
    |> put_flash(:info, "Alert deleted successfully.")
    |> redirect(to: alert_path(conn, :index))
  end
end
