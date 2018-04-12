defmodule Cryptoapp.SubscribeTest do
  use Cryptoapp.DataCase

  alias Cryptoapp.Subscribe

  describe "alerts" do
    alias Cryptoapp.Subscribe.Alert

    @valid_attrs %{currencyname: "some currencyname", lowerlimit: 120.5, upperlimit: 120.5}
    @update_attrs %{currencyname: "some updated currencyname", lowerlimit: 456.7, upperlimit: 456.7}
    @invalid_attrs %{currencyname: nil, lowerlimit: nil, upperlimit: nil}

    def alert_fixture(attrs \\ %{}) do
      {:ok, alert} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Subscribe.create_alert()

      alert
    end

    test "list_alerts/0 returns all alerts" do
      alert = alert_fixture()
      assert Subscribe.list_alerts() == [alert]
    end

    test "get_alert!/1 returns the alert with given id" do
      alert = alert_fixture()
      assert Subscribe.get_alert!(alert.id) == alert
    end

    test "create_alert/1 with valid data creates a alert" do
      assert {:ok, %Alert{} = alert} = Subscribe.create_alert(@valid_attrs)
      assert alert.currencyname == "some currencyname"
      assert alert.lowerlimit == 120.5
      assert alert.upperlimit == 120.5
    end

    test "create_alert/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Subscribe.create_alert(@invalid_attrs)
    end

    test "update_alert/2 with valid data updates the alert" do
      alert = alert_fixture()
      assert {:ok, alert} = Subscribe.update_alert(alert, @update_attrs)
      assert %Alert{} = alert
      assert alert.currencyname == "some updated currencyname"
      assert alert.lowerlimit == 456.7
      assert alert.upperlimit == 456.7
    end

    test "update_alert/2 with invalid data returns error changeset" do
      alert = alert_fixture()
      assert {:error, %Ecto.Changeset{}} = Subscribe.update_alert(alert, @invalid_attrs)
      assert alert == Subscribe.get_alert!(alert.id)
    end

    test "delete_alert/1 deletes the alert" do
      alert = alert_fixture()
      assert {:ok, %Alert{}} = Subscribe.delete_alert(alert)
      assert_raise Ecto.NoResultsError, fn -> Subscribe.get_alert!(alert.id) end
    end

    test "change_alert/1 returns a alert changeset" do
      alert = alert_fixture()
      assert %Ecto.Changeset{} = Subscribe.change_alert(alert)
    end
  end

  describe "alerts" do
    alias Cryptoapp.Subscribe.Alert

    @valid_attrs %{currency_name: "some currency_name", currentprice: 120.5, lower_limit: 120.5, upper_limit: 120.5}
    @update_attrs %{currency_name: "some updated currency_name", currentprice: 456.7, lower_limit: 456.7, upper_limit: 456.7}
    @invalid_attrs %{currency_name: nil, currentprice: nil, lower_limit: nil, upper_limit: nil}

    def alert_fixture(attrs \\ %{}) do
      {:ok, alert} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Subscribe.create_alert()

      alert
    end

    test "list_alerts/0 returns all alerts" do
      alert = alert_fixture()
      assert Subscribe.list_alerts() == [alert]
    end

    test "get_alert!/1 returns the alert with given id" do
      alert = alert_fixture()
      assert Subscribe.get_alert!(alert.id) == alert
    end

    test "create_alert/1 with valid data creates a alert" do
      assert {:ok, %Alert{} = alert} = Subscribe.create_alert(@valid_attrs)
      assert alert.currency_name == "some currency_name"
      assert alert.currentprice == 120.5
      assert alert.lower_limit == 120.5
      assert alert.upper_limit == 120.5
    end

    test "create_alert/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Subscribe.create_alert(@invalid_attrs)
    end

    test "update_alert/2 with valid data updates the alert" do
      alert = alert_fixture()
      assert {:ok, alert} = Subscribe.update_alert(alert, @update_attrs)
      assert %Alert{} = alert
      assert alert.currency_name == "some updated currency_name"
      assert alert.currentprice == 456.7
      assert alert.lower_limit == 456.7
      assert alert.upper_limit == 456.7
    end

    test "update_alert/2 with invalid data returns error changeset" do
      alert = alert_fixture()
      assert {:error, %Ecto.Changeset{}} = Subscribe.update_alert(alert, @invalid_attrs)
      assert alert == Subscribe.get_alert!(alert.id)
    end

    test "delete_alert/1 deletes the alert" do
      alert = alert_fixture()
      assert {:ok, %Alert{}} = Subscribe.delete_alert(alert)
      assert_raise Ecto.NoResultsError, fn -> Subscribe.get_alert!(alert.id) end
    end

    test "change_alert/1 returns a alert changeset" do
      alert = alert_fixture()
      assert %Ecto.Changeset{} = Subscribe.change_alert(alert)
    end
  end
end
