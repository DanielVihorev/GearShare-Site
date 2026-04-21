import React, { useState, useEffect, useRef } from "react";

interface TopicRow {
  name: string;
  partitions: number;
  messagesPerSec: number;
  health: "healthy" | "degraded" | "offline";
}

interface EventEntry {
  id: number;
  topic: string;
  partition: number;
  offset: number;
  event: string;
  ts: string;
}

const TOPICS: TopicRow[] = [
  { name: "gear.booked",        partitions: 4, messagesPerSec: 0, health: "healthy"  },
  { name: "gear.returned",      partitions: 4, messagesPerSec: 0, health: "healthy"  },
  { name: "gear.notifications", partitions: 2, messagesPerSec: 0, health: "healthy"  },
  { name: "gear.analytics",     partitions: 8, messagesPerSec: 0, health: "healthy"  },
];

const EVENT_TEMPLATES = [
  (p: number, o: number) => ({ topic: "gear.booked",        event: `GearBooked { gearId: G${1000 + o}, userId: U${200 + p} }`,           partition: p, offset: o }),
  (p: number, o: number) => ({ topic: "gear.returned",      event: `GearReturned { gearId: G${900 + o}, condition: "good" }`,             partition: p, offset: o }),
  (p: number, o: number) => ({ topic: "gear.notifications", event: `NotifSent { userId: U${300 + p}, type: "booking_confirmed" }`,        partition: p, offset: o }),
  (p: number, o: number) => ({ topic: "gear.analytics",     event: `PageView { page: "/map", sessionId: "s${500 + o}" }`,                 partition: p, offset: o }),
  (p: number, o: number) => ({ topic: "gear.booked",        event: `GearBooked { gearId: G${1100 + o}, userId: U${400 + p} }`,           partition: p, offset: o }),
  (p: number, o: number) => ({ topic: "gear.analytics",     event: `SearchQuery { q: "brake pads", results: ${5 + (o % 20)} }`,           partition: p, offset: o }),
  (p: number, o: number) => ({ topic: "gear.notifications", event: `NotifSent { userId: U${250 + p}, type: "gear_damaged_alert" }`,       partition: p, offset: o }),
  (p: number, o: number) => ({ topic: "gear.returned",      event: `GearReturned { gearId: G${800 + o}, condition: "damaged" }`,         partition: p, offset: o }),
];

function nowTs() {
  return new Date().toLocaleTimeString("en-US", { hour12: false });
}

function variance(base: number) {
  return Math.max(0, base + Math.floor((Math.random() - 0.5) * base * 0.4));
}

const HealthBadge: React.FC<{ health: TopicRow["health"] }> = ({ health }) => {
  const cls =
    health === "healthy"  ? "bg-green-100 text-green-800" :
    health === "degraded" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800";
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${cls}`}>
      {health}
    </span>
  );
};

export const KafkaDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    messagesPerSec: 0,
    activeConsumers: 0,
    consumerLag: 0,
    brokerHealth: "Online" as "Online" | "Degraded",
  });
  const [topics, setTopics] = useState<TopicRow[]>(TOPICS);
  const [events, setEvents] = useState<EventEntry[]>([]);
  const offsetRef = useRef(1);
  const eventIdRef = useRef(1);
  const feedRef = useRef<HTMLDivElement>(null);

  const refreshStats = () => {
    setStats({
      messagesPerSec: variance(1240),
      activeConsumers: variance(18),
      consumerLag: variance(320),
      brokerHealth: Math.random() > 0.05 ? "Online" : "Degraded",
    });
    setTopics((prev) =>
      prev.map((t) => ({ ...t, messagesPerSec: variance(t.name === "gear.analytics" ? 620 : 210) }))
    );
  };

  const addEvent = () => {
    const tpl = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)];
    const p = Math.floor(Math.random() * 4);
    const entry = tpl(p, offsetRef.current++);
    const newEvent: EventEntry = { id: eventIdRef.current++, ts: nowTs(), ...entry };
    setEvents((prev) => [newEvent, ...prev].slice(0, 50));
  };

  useEffect(() => {
    refreshStats();
    const statsInterval = setInterval(refreshStats, 3000);
    const eventInterval = setInterval(addEvent, 800);
    return () => {
      clearInterval(statsInterval);
      clearInterval(eventInterval);
    };
  }, []);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = 0;
  }, [events.length]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-bold text-gray-900">Kafka Monitoring</h1>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${stats.brokerHealth === "Online" ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`} />
          <span className="text-sm font-medium text-gray-600">Broker: {stats.brokerHealth}</span>
          <button
            onClick={refreshStats}
            className="ml-4 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Live stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Messages / sec",   value: stats.messagesPerSec.toLocaleString(), color: "text-blue-600" },
          { label: "Active Consumers", value: stats.activeConsumers.toString(),       color: "text-green-600" },
          { label: "Consumer Lag",     value: stats.consumerLag.toLocaleString(),     color: "text-orange-500" },
          { label: "Broker Health",    value: stats.brokerHealth,                    color: stats.brokerHealth === "Online" ? "text-green-600" : "text-yellow-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Topics table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Topics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Topic</th>
                <th className="px-6 py-3">Partitions</th>
                <th className="px-6 py-3">Msg / sec</th>
                <th className="px-6 py-3">Health</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((t) => (
                <tr key={t.name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono font-medium text-gray-900">{t.name}</td>
                  <td className="px-6 py-3">{t.partitions}</td>
                  <td className="px-6 py-3">{t.messagesPerSec.toLocaleString()}</td>
                  <td className="px-6 py-3"><HealthBadge health={t.health} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live event feed */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Live Event Feed</h2>
          <span className="text-xs text-gray-400">Auto-streaming</span>
        </div>
        <div ref={feedRef} className="overflow-y-auto max-h-72 divide-y divide-gray-50 font-mono text-xs">
          {events.map((e) => (
            <div key={e.id} className="px-6 py-2 hover:bg-gray-50 flex flex-wrap gap-x-4 gap-y-0.5">
              <span className="text-gray-400 shrink-0">{e.ts}</span>
              <span className="text-blue-600 shrink-0">{e.topic}</span>
              <span className="text-gray-500 shrink-0">p{e.partition} o{e.offset}</span>
              <span className="text-gray-800 break-all">{e.event}</span>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-center text-gray-400 py-6">Waiting for events…</p>
          )}
        </div>
      </div>
    </div>
  );
};
