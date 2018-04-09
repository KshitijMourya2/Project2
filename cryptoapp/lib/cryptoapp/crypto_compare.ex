# Attrbution -> https://www.youtube.com/watch?v=IPHnzQsh0TM
# Attrbution -> https://www.cryptocompare.com/api/
# Attrbution -> https://www.youtube.com/watch?v=vqxyhJewKjI&list=PLFhQVxlaKQEktDxawPVGw9CVRK4J0Xk5L

defmodule Cryptoapp.CryptoCompare do
  import HTTPoison
  @url "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR,CNY"

  def run do
    fetch_stats()
    |> save_stats
  end

  def column_name() do
    Enum.join ~w(DateTime USD EUR CNY), ","
  end

  def fetch_stats() do
    now = DateTime.to_string(%{DateTime.utc_now | microsecond: {0, 0}})
    %{"CNY" => cny, "EUR" => eur, "USD" => usd} = price()
    [ now,
      usd,
      cny,
      eur] |> Enum.join(", ")
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

end
