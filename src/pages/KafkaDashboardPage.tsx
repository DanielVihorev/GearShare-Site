import React, { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TopicRow {
  name: string;
  partitions: number;
  messages: number;
  rate: number; // msgs/sec
  status: "Healthy" | "Lagging" | "Offline";
}

interface LiveEvent {
  id: number;
  ts: string;
  topic: string;
  partition: number;
  offset: number;
  payload: string;
  color: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_TOPICS: TopicRow[] = [
  { name: "gear.booked",        partitions: 3, messages: 14_820, rate: 12, status: "Healthy"  },
  { name: "gear.returned",      partitions: 3, messages:  8_203, rate:  6, status: "Healthy"  },
  { name: "gear.notifications", partitions: 2, messages: 31_445, rate: 24, status: "Healthy"  },
  { name: "gear.analytics",     partitions: 6, messages: 97_112, rate:  3, status: "Lagging"  },
];

const EVENT_TEMPLATES = [
  (id: number) => ({
    id,
    topic: "gear.booked",
    partition: Math.floor(Math.random() * 3),
    offset: 14_820 + id,
    payload: `{ "gearId": "GS-${1000 + id}", "userId": "u-${200 + id}", "action": "booked" }`,
    color: "text-green-400",
  }),
  (id: number) => ({
    id,
    topic: "gear.returned",
    partition: Math.floor(Math.random() * 3),
    offset: 8_200 + id,
    payload: `{ "gearId": "GS-${900 + id}", "condition": "good", "action": "returned" }`,
    color: "text-blue-400",
  }),
  (id: number) => ({
    id,
    topic: "gear.notifications",
    partition: Math.floor(Math.random() * 2),
    offset: 31_445 + id,
    payload: `{ "type": "damaged-gear-alert", "gearId": "GS-${800 + id}", "severity": "high" }`,
    color: "text-red-400",
  }),
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtNum(n: number) {
  return n.toLocaleString();
}

function nowTs() {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

function randomVariance(base: number) {
  return Math.max(0, base + Math.floor(Math.random() * 7) - 3);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatCard: React.FC<{
  label: string;
  value: string;
  sub: string;
  accent: string;
}> = ({ label, value, sub, accent }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col gap-1">
    <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
    <span className={`text-2xl font-bold ${accent}`}>{value}</span>
    <span className="text-xs text-gray-500">{sub}</span>
  </div>
);

const StatusBadge: React.FC<{ status: TopicRow["status"] }> = ({ status }) => {
  const cls =
    status === "Healthy"
      ? "bg-green-900 text-green-300"
      : status === "Lagging"
      ? "bg-yellow-900 text-yellow-300"
      : "bg-red-900 text-red-300";
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>
      {status}
    </span>
  );
};

const ThroughputBar: React.FC<{ topic: string; rate: number; max: number }> = ({
  topic,
  rate,
  max,
}) => {
  const pct = Math.min(100, Math.round((rate / max) * 100));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span className="font-mono">{topic}</span>
        <span>{rate} msg/s</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export const KafkaDashboardPage: React.FC = () => {
  const [topics, setTopics] = useState<TopicRow[]>(INITIAL_TOPICS);
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [eventCounter, setEventCounter] = useState(0);
  const [lag, setLag] = useState(0);
  const [msgsPerSec, setMsgsPerSec] = useState(45);

  const pushEvent = useCallback(() => {
    const template = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)];
    const ev = template(eventCounter + 1);
    setEventCounter((c) => c + 1);
    setEvents((prev) => [{ ...ev, ts: nowTs() }, ...prev].slice(0, 30));
  }, [eventCounter]);

  // Simulate live updates every 3 seconds
  useEffect(() => {
    pushEvent();
    const timer = setInterval(() => {
      pushEvent();

      // Update topic rates with variance
      setTopics((prev) =>
        prev.map((t) => ({
          ...t,
          rate: randomVariance(t.rate),
          messages: t.messages + t.rate,
        }))
      );

      // Simulate consumer lag fluctuation
      setLag((l) => Math.max(0, l + Math.floor(Math.random() * 5) - 2));

      // Simulate overall msgs/sec fluctuation
      setMsgsPerSec((v) => Math.max(30, v + Math.floor(Math.random() * 11) - 5));
    }, 3000);

    return () => clearInterval(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const maxRate = Math.max(...topics.map((t) => t.rate), 1);

  return (
    <div className="space-y-6 bg-gray-900 min-h-screen p-6 -m-6 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Kafka Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            GearShare message broker · real-time simulation
          </p>
        </div>
        <button
          onClick={pushEvent}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Messages / sec"
          value={`${msgsPerSec}`}
          sub="across all topics"
          accent="text-blue-400"
        />
        <StatCard
          label="Active Consumers"
          value="8"
          sub="4 groups, 2 instances each"
          accent="text-green-400"
        />
        <StatCard
          label="Consumer Lag"
          value={fmtNum(lag)}
          sub={lag === 0 ? "✓ healthy" : "gear.analytics lagging"}
          accent={lag > 10 ? "text-yellow-400" : "text-green-400"}
        />
        <StatCard
          label="Broker Health"
          value="Online"
          sub="1 broker · 0 partitions offline"
          accent="text-green-400"
        />
      </div>

      {/* Topics Table + Throughput */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Topics Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700">
            <h2 className="text-sm font-semibold text-gray-200">Topics</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 uppercase border-b border-gray-700">
                <th className="px-4 py-2 text-left">Topic</th>
                <th className="px-4 py-2 text-right">Parts</th>
                <th className="px-4 py-2 text-right">Messages</th>
                <th className="px-4 py-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((t) => (
                <tr
                  key={t.name}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-blue-300">{t.name}</td>
                  <td className="px-4 py-3 text-right text-gray-400">{t.partitions}</td>
                  <td className="px-4 py-3 text-right text-gray-300">{fmtNum(t.messages)}</td>
                  <td className="px-4 py-3 text-right">
                    <StatusBadge status={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Throughput */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-200">
            Throughput (msg/s) — updates every 3s
          </h2>
          <div className="space-y-4">
            {topics.map((t) => (
              <ThroughputBar key={t.name} topic={t.name} rate={t.rate} max={maxRate} />
            ))}
          </div>
        </div>
      </div>

      {/* Live Event Feed */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <h2 className="text-sm font-semibold text-gray-200">Live Event Feed</h2>
          <span className="text-xs text-gray-500 ml-auto">auto-refresh every 3s</span>
        </div>
        <div className="divide-y divide-gray-700/50 max-h-80 overflow-y-auto">
          {events.length === 0 && (
            <p className="px-4 py-6 text-sm text-gray-500 text-center">
              Waiting for events…
            </p>
          )}
          {events.map((ev) => (
            <div key={`${ev.id}-${ev.ts}`} className="px-4 py-3 text-xs font-mono space-y-0.5">
              <div className="flex gap-3 text-gray-500">
                <span>{ev.ts}</span>
                <span className={`font-semibold ${ev.color}`}>{ev.topic}</span>
                <span>partition={ev.partition}</span>
                <span>offset={ev.offset}</span>
              </div>
              <div className="text-gray-300 truncate">{ev.payload}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
