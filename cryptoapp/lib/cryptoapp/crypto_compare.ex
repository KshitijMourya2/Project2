# Attrbution -> https://www.youtube.com/watch?v=IPHnzQsh0TM
# Attrbution -> https://www.cryptocompare.com/api/
# Attrbution -> https://www.youtube.com/watch?v=vqxyhJewKjI&list=PLFhQVxlaKQEktDxawPVGw9CVRK4J0Xk5L

defmodule Cryptoapp.CryptoCompare do
  alias Cryptoapp.Alerts
  import HTTPoison
  @url "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD"
#  @url2 "https://min-api.cryptocompare.com/data/pricemulti?fsyms="

  def run do
    fetch_stats()
    |> save_stats
  end

  def column_name() do
    Enum.join ~w(DateTime USD), ","
  end

  def fetch_stats() do
    now = DateTime.to_string(%{DateTime.utc_now | microsecond: {0, 0}})
    %{"USD" => usd} = price()
    [ now,
      usd] |> Enum.join(", ")
  end

  def save_stats(row_of_stats) do
    fileName = "stats.csv"
    unless File.exists? fileName do
      File.write! fileName, column_name() <> "\n"
    end
    File.write!(fileName, row_of_stats <> "\n", [:append])
  end

  def price() do
    case HTTPoison.get(@url) do
      {:ok, %{status_code: 200, body: body}} -> Poison.decode!(body)
      {:ok, %{status_code: 404}} -> # 404 Not Found Error
    end
  end

    def unit_price(curr) do
      IO.inspect("in unit price")
      IO.inspect(curr)
      url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" <> curr <> "&tsyms=USD"
      IO.inspect(url)
      case HTTPoison.get(url) do
        {:ok, %{status_code: 200, body: body}} -> Poison.decode!(body)
        {:ok, %{status_code: 404}} -> # 404 Not Found Error
      end
    end

    def update_price() do
      IO.inspect("in upadate")
      currency = ["BTC","ETH","LTC","DASH","XMR","NXT","ETC","DOGE","ZEC","BTS","DGB","XRP","BTCD","PPC","CRAIG","XBS","XPY","PRC","YBC","DANK"]
      %{"BTC" => %{"USD" => usd}} = unit_price("BTC")
      Cryptoapp.Alerts.update_curr_price("BTC",usd)
      %{"ETH" => %{"USD" => usd}} = unit_price("ETH")
      Cryptoapp.Alerts.update_curr_price("ETH",usd)
      %{"LTC" => %{"USD" => usd}} = unit_price("LTC")
      Cryptoapp.Alerts.update_curr_price("LTC",usd)
      %{"DASH" => %{"USD" => usd}} = unit_price("DASH")
      Cryptoapp.Alerts.update_curr_price("DASH",usd)
      %{"XMR" => %{"USD" => usd}} = unit_price("XMR")
      Cryptoapp.Alerts.update_curr_price("XMR",usd)
      %{"NXT" => %{"USD" => usd}} = unit_price("NXT")
      Cryptoapp.Alerts.update_curr_price("NXT",usd)
      %{"ETC" => %{"USD" => usd}} = unit_price("ETC")
      Cryptoapp.Alerts.update_curr_price("ETC",usd)
      %{"DOGE" => %{"USD" => usd}} = unit_price("DOGE")
      Cryptoapp.Alerts.update_curr_price("DOGE",usd)
      %{"ZEC" => %{"USD" => usd}} = unit_price("ZEC")
      Cryptoapp.Alerts.update_curr_price("ZEC",usd)
      %{"BTS" => %{"USD" => usd}} = unit_price("BTS")
      Cryptoapp.Alerts.update_curr_price("BTS",usd)
      %{"DGB" => %{"USD" => usd}} = unit_price("DGB")
      Cryptoapp.Alerts.update_curr_price("DGB",usd)
      %{"XRP" => %{"USD" => usd}} = unit_price("XRP")
      Cryptoapp.Alerts.update_curr_price("XRP",usd)
      %{"BTCD" => %{"USD" => usd}} = unit_price("BTCD")
      Cryptoapp.Alerts.update_curr_price("BTCD",usd)
      %{"PPC" => %{"USD" => usd}} = unit_price("PPC")
      Cryptoapp.Alerts.update_curr_price("PPC",usd)
      %{"CRAIG" => %{"USD" => usd}} = unit_price("CRAIG")
      Cryptoapp.Alerts.update_curr_price("CRAIG",usd)
      %{"XBS" => %{"USD" => usd}} = unit_price("XBS")
      Cryptoapp.Alerts.update_curr_price("XBS",usd)
      %{"XPY" => %{"USD" => usd}} = unit_price("XPY")
      Cryptoapp.Alerts.update_curr_price("XPY",usd)
      %{"PRC" => %{"USD" => usd}} = unit_price("PRC")
      Cryptoapp.Alerts.update_curr_price("PRC",usd)
      %{"YBC" => %{"USD" => usd}} = unit_price("YBC")
      Cryptoapp.Alerts.update_curr_price("YBC",usd)
      %{"DANK" => %{"USD" => usd}} = unit_price("DANK")
      Cryptoapp.Alerts.update_curr_price("DANK",usd)
    end

end
