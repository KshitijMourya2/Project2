defmodule CryptoappWeb.CoinControllerTest do
  use CryptoappWeb.ConnCase

  alias Cryptoapp.Coins
  alias Cryptoapp.Coins.Coin

  @create_attrs %{coin_name: "some coin_name"}
  @update_attrs %{coin_name: "some updated coin_name"}
  @invalid_attrs %{coin_name: nil}

  def fixture(:coin) do
    {:ok, coin} = Coins.create_coin(@create_attrs)
    coin
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all coins", %{conn: conn} do
      conn = get conn, coin_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create coin" do
    test "renders coin when data is valid", %{conn: conn} do
      conn = post conn, coin_path(conn, :create), coin: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, coin_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "coin_name" => "some coin_name"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, coin_path(conn, :create), coin: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update coin" do
    setup [:create_coin]

    test "renders coin when data is valid", %{conn: conn, coin: %Coin{id: id} = coin} do
      conn = put conn, coin_path(conn, :update, coin), coin: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, coin_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "coin_name" => "some updated coin_name"}
    end

    test "renders errors when data is invalid", %{conn: conn, coin: coin} do
      conn = put conn, coin_path(conn, :update, coin), coin: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete coin" do
    setup [:create_coin]

    test "deletes chosen coin", %{conn: conn, coin: coin} do
      conn = delete conn, coin_path(conn, :delete, coin)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, coin_path(conn, :show, coin)
      end
    end
  end

  defp create_coin(_) do
    coin = fixture(:coin)
    {:ok, coin: coin}
  end
end
