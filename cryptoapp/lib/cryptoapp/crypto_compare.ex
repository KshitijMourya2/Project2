# Attrbution -> https://www.youtube.com/watch?v=IPHnzQsh0TM
# Attrbution -> https://www.cryptocompare.com/api/
# Attrbution -> https://www.youtube.com/watch?v=vqxyhJewKjI&list=PLFhQVxlaKQEktDxawPVGw9CVRK4J0Xk5L

defmodule Cryptoapp.CryptoCompare do
  alias Cryptoapp.Alerts
  import HTTPoison

  def run do
    fetch_stats()
    |> save_stats
  end

  def fetch_stats() do
    now = DateTime.to_string(%{DateTime.utc_now | microsecond: {0, 0}})
    %{"USD" => usd} = price()
    [ now,
      usd] |> Enum.join(", ")
  end

  def price() do
     case HTTPoison.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD") do
      {:ok, %{status_code: 200, body: body}} -> Poison.decode!(body)
      {:ok, %{status_code: 404}} -> # 404 Not Found Error
    end
  end

    def moniter do
    case HTTPoison.get("https://www.cryptocompare.com/api/data/coinlist/") do
      {:ok, %{status_code: 200, body: body}} ->
        currencies = Poison.decode!(body) |> Map.get("Data")
        currencies = currencies
                  |>Map.to_list()
                  |>Enum.sort(&(String.to_integer(Map.get(elem(&1, 1), "SortOrder")) < String.to_integer(Map.get(elem(&2, 1), "SortOrder"))))
                  |>Enum.slice(0,20)
                  |>Enum.reduce(%{}, fn(x, acc) -> merge_data(x, acc) end);
        currencies
      {:error, %{status_code: 404}} -> IO.puts("404 NOT FOUND")
    end
   end

   def update_price() do
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

   def merge_data(x, acc) do
    {a, b} = x;
    acc = Map.put(acc, a, b)
  end

  def unit_price(curr) do
    url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" <> curr <> "&tsyms=USD"
    IO.inspect(url)
    case HTTPoison.get(url) do
      {:ok, %{status_code: 200, body: body}} -> Poison.decode!(body)
      {:ok, %{status_code: 404}} ->  #404 Not Found Error
    end
  end

  def update(p) do
    prices = Enum.reduce(p, "", fn(x, acc) -> fetch_currency_name(x) <> " " <> acc end)
            |> String.split()
            |> Enum.chunk_every(50)
            |> Enum.map(fn(q) -> fetch_price(q) end)
            |> Enum.concat
            |> Enum.into(%{})
    GenServer.cast(Mailer, {:mail_moniter_update, prices})
    prices
  end

  def save_stats(row_of_stats) do
    fileName = "stats.csv"
    unless File.exists? fileName do
      File.write! fileName, column_name() <> "\n"
    end
    File.write!(fileName, row_of_stats <> "\n", [:append])
  end

  def fetch_price(q) do
    url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" <> Enum.join(q, ",") <> "&tsyms=USD"
    case HTTPoison.get(url) do
      {:ok, %{status_code: 200, body: body}} ->
        prices = Poison.decode!(body)
      {:error, %{status_code: 404}} -> IO.puts("404 NOT FOUND")
    end
  end

  def column_name() do
    Enum.join ~w(DateTime USD), ","
  end

  def fetch_currency_name(p) do
    {name, rest} = p
    name
  end

end
