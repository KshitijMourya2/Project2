defmodule CryptoappWeb.AlertControllerTest do
  use CryptoappWeb.ConnCase

  alias Cryptoapp.Alerts
  alias Cryptoapp.Alerts.Alert

  @create_attrs %{currency_name: "some currency_name", currentprice: 120.5, lower_limit: 120.5, upper_limit: 120.5}
  @update_attrs %{currency_name: "some updated currency_name", currentprice: 456.7, lower_limit: 456.7, upper_limit: 456.7}
  @invalid_attrs %{currency_name: nil, currentprice: nil, lower_limit: nil, upper_limit: nil}

  def fixture(:alert) do
    {:ok, alert} = Alerts.create_alert(@create_attrs)
    alert
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all alerts", %{conn: conn} do
      conn = get conn, alert_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create alert" do
    test "renders alert when data is valid", %{conn: conn} do
      conn = post conn, alert_path(conn, :create), alert: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, alert_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "currency_name" => "some currency_name",
        "currentprice" => 120.5,
        "lower_limit" => 120.5,
        "upper_limit" => 120.5}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, alert_path(conn, :create), alert: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update alert" do
    setup [:create_alert]

    test "renders alert when data is valid", %{conn: conn, alert: %Alert{id: id} = alert} do
      conn = put conn, alert_path(conn, :update, alert), alert: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, alert_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "currency_name" => "some updated currency_name",
        "currentprice" => 456.7,
        "lower_limit" => 456.7,
        "upper_limit" => 456.7}
    end

    test "renders errors when data is invalid", %{conn: conn, alert: alert} do
      conn = put conn, alert_path(conn, :update, alert), alert: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete alert" do
    setup [:create_alert]

    test "deletes chosen alert", %{conn: conn, alert: alert} do
      conn = delete conn, alert_path(conn, :delete, alert)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, alert_path(conn, :show, alert)
      end
    end
  end

  defp create_alert(_) do
    alert = fixture(:alert)
    {:ok, alert: alert}
  end
end
