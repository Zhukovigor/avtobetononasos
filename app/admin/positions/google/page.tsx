"use client"

import "../../config"
import { Suspense } from "react"
import GooglePositionsContent from "./GooglePositionsContent"

export default function GooglePositionsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      }
    >
      <GooglePositionsContent />
    </Suspense>
  )
}
