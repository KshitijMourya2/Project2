defmodule CryptoappWeb.Scheduler do
  use GenServer

  def start_link do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    alerts = Cryptoapp.CryptoCompare.moniter()
    state = Map.put(state, :alerts, alerts)
    schedule_work()
    {:ok, state}
  end

  def handle_info(:work, state) do
    alerts = Map.get(state, :alerts)
    Cryptoapp.CryptoCompare.update(alerts)
    schedule_work()
    {:noreply, state}
  end

  def schedule_work() do
    Process.send_after(self(), :work, 60 * 1000)
  end

end
