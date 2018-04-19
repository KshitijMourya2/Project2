#Attribution -> https://github.com/alexgaribay/sendgrid_elixir
#            -> https://hexdocs.pm/sendgrid/SendGrid.Email.html

defmodule CryptoappWeb.Mailer do
  use GenServer
  alias Cryptoapp.Scheduler
  alias Cryptoapp.Alerts

  def start_link do
    GenServer.start_link(__MODULE__, %{}, name: Mailer)
  end

  def init(state) do
    {:ok, state}
  end

  def handle_cast({:mail_moniter_update, prices}, state) do
    IO.inspect("in mail")
    t = DateTime.utc_now
    IO.inspect("1")
    #curr_price = prices[a.currency_name]["USD"]
    updated_price = Alerts.list_alerts |> Enum.reduce(state, fn(a, acc) ->
      IO.inspect("2")
    if Map.get(acc, a.id) == nil || DateTime.diff(DateTime.utc_now, Map.get(acc, a.id)) > 10800 do
        cond do
          prices[a.currency_name]["USD"] > a.upper_limit ->
            mail_moniter_update(a.user.email,
            "Price for " <>
            a.currency_name <>
            " has risen above $"
            <> Float.to_string(a.upper_limit, decimals: 2),
            a.currency_name)
            acc = acc |> Map.put(a.id, DateTime.utc_now)
          prices[a.currency_name]["USD"] < a.lower_limit ->
            mail_moniter_update(a.user.email,
            "Price for " <>
            a.currency_name <>
            " has dropped below $" <>
            Float.to_string(a.lower_limit, decimals: 2),
            a.currency_name)
            acc = acc |> Map.put(a.id, DateTime.utc_now)
          true -> acc
        end
      end
      acc
    end)
    {:noreply, updated_price}
  end

  def mail_moniter_update(to, text, curr) do
    IO.inspect("3")
    IO.inspect(to)
    IO.inspect(text)
    IO.inspect(curr)
    SendGrid.Email.build()
    |> SendGrid.Email.add_to(to)
    |> SendGrid.Email.put_from("no-reply@cryptoapp.com")
    |> SendGrid.Email.put_subject("Alert for your CryptoCurrency: " <> curr)
    |> SendGrid.Email.put_text(text)
    |> SendGrid.Mailer.send()
  end
end
