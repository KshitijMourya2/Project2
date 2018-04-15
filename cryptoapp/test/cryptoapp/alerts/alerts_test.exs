defmodule Cryptoapp.AlertsTest do
  use Cryptoapp.DataCase

  alias Cryptoapp.Alerts

  describe "alerts" do
    alias Cryptoapp.Alerts.Alert

    @valid_attrs %{currency_name: "some currency_name", currentprice: 120.5, lower_limit: 120.5, upper_limit: 120.5}
    @update_attrs %{currency_name: "some updated currency_name", currentprice: 456.7, lower_limit: 456.7, upper_limit: 456.7}
    @invalid_attrs %{currency_name: nil, currentprice: nil, lower_limit: nil, upper_limit: nil}

    def alert_fixture(attrs \\ %{}) do
      {:ok, alert} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Alerts.create_alert()

      alert
    end

    test "list_alerts/0 returns all alerts" do
      alert = alert_fixture()
      assert Alerts.list_alerts() == [alert]
    end

    test "get_alert!/1 returns the alert with given id" do
      alert = alert_fixture()
      assert Alerts.get_alert!(alert.id) == alert
    end

    test "create_alert/1 with valid data creates a alert" do
      assert {:ok, %Alert{} = alert} = Alerts.create_alert(@valid_attrs)
      assert alert.currency_name == "some currency_name"
      assert alert.currentprice == 120.5
      assert alert.lower_limit == 120.5
      assert alert.upper_limit == 120.5
    end

    test "create_alert/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Alerts.create_alert(@invalid_attrs)
    end

    test "update_alert/2 with valid data updates the alert" do
      alert = alert_fixture()
      assert {:ok, alert} = Alerts.update_alert(alert, @update_attrs)
      assert %Alert{} = alert
      assert alert.currency_name == "some updated currency_name"
      assert alert.currentprice == 456.7
      assert alert.lower_limit == 456.7
      assert alert.upper_limit == 456.7
    end

    test "update_alert/2 with invalid data returns error changeset" do
      alert = alert_fixture()
      assert {:error, %Ecto.Changeset{}} = Alerts.update_alert(alert, @invalid_attrs)
      assert alert == Alerts.get_alert!(alert.id)
    end

    test "delete_alert/1 deletes the alert" do
      alert = alert_fixture()
      assert {:ok, %Alert{}} = Alerts.delete_alert(alert)
      assert_raise Ecto.NoResultsError, fn -> Alerts.get_alert!(alert.id) end
    end

    test "change_alert/1 returns a alert changeset" do
      alert = alert_fixture()
      assert %Ecto.Changeset{} = Alerts.change_alert(alert)
    end
  end
end
