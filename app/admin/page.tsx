import ModelsStats from "./components/models-stats"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

      {/* Existing cards or content can go here */}

      {/* Статистика моделей */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">📊 Статистика моделей</h2>
        <ModelsStats />
      </div>
    </div>
  )
}
