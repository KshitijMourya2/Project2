defmodule Cryptoapp.CoinsTest do
  use Cryptoapp.DataCase

  alias Cryptoapp.Coins

  describe "coins" do
    alias Cryptoapp.Coins.Coin

    @valid_attrs %{coin_name: "some coin_name"}
    @update_attrs %{coin_name: "some updated coin_name"}
    @invalid_attrs %{coin_name: nil}

    def coin_fixture(attrs \\ %{}) do
      {:ok, coin} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Coins.create_coin()

      coin
    end

    test "list_coins/0 returns all coins" do
      coin = coin_fixture()
      assert Coins.list_coins() == [coin]
    end

    test "get_coin!/1 returns the coin with given id" do
      coin = coin_fixture()
      assert Coins.get_coin!(coin.id) == coin
    end

    test "create_coin/1 with valid data creates a coin" do
      assert {:ok, %Coin{} = coin} = Coins.create_coin(@valid_attrs)
      assert coin.coin_name == "some coin_name"
    end

    test "create_coin/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Coins.create_coin(@invalid_attrs)
    end

    test "update_coin/2 with valid data updates the coin" do
      coin = coin_fixture()
      assert {:ok, coin} = Coins.update_coin(coin, @update_attrs)
      assert %Coin{} = coin
      assert coin.coin_name == "some updated coin_name"
    end

    test "update_coin/2 with invalid data returns error changeset" do
      coin = coin_fixture()
      assert {:error, %Ecto.Changeset{}} = Coins.update_coin(coin, @invalid_attrs)
      assert coin == Coins.get_coin!(coin.id)
    end

    test "delete_coin/1 deletes the coin" do
      coin = coin_fixture()
      assert {:ok, %Coin{}} = Coins.delete_coin(coin)
      assert_raise Ecto.NoResultsError, fn -> Coins.get_coin!(coin.id) end
    end

    test "change_coin/1 returns a coin changeset" do
      coin = coin_fixture()
      assert %Ecto.Changeset{} = Coins.change_coin(coin)
    end
  end
end
