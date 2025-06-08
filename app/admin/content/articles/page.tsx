"use client"

import "../../config"
import { Suspense } from "react"
import ArticlesContent from "./ArticlesContent"

export default function ArticlesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      }
    >
      <ArticlesContent />
    </Suspense>
  )
}
