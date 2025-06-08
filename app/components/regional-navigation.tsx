import Link from "next/link"
import { MapPin } from "lucide-react"

const regions = [
  { id: "moscow", name: "Москва", color: "text-orange-500" },
  { id: "spb", name: "СПб", color: "text-blue-500" },
  { id: "novosibirsk", name: "Новосибирск", color: "text-green-500" },
  { id: "ekaterinburg", name: "Екатеринбург", color: "text-purple-500" },
  { id: "kazan", name: "Казань", color: "text-red-500" },
  { id: "rostov", name: "Ростов", color: "text-yellow-500" },
]

export default function RegionalNavigation({ currentRegion }: { currentRegion?: string }) {
  return (
    <div className="bg-zinc-900 border-t border-zinc-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-1 text-sm">
          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-gray-400 mr-4">Другие регионы:</span>
          {regions
            .filter((region) => region.id !== currentRegion)
            .map((region, index) => (
              <span key={region.id}>
                <Link href={`/regions/${region.id}`} className={`${region.color} hover:underline transition-colors`}>
                  {region.name}
                </Link>
                {index < regions.filter((r) => r.id !== currentRegion).length - 1 && (
                  <span className="text-gray-600 mx-2">•</span>
                )}
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}
