import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Купить автобетононасос SANY - Цены, каталог, доставка из Китая",
  description:
    "Купить автобетононасос SANY с доставкой из Китая. Лучшие цены, гарантия качества, лизинг 0%. Каталог моделей с характеристиками и ценами. Звоните: +7 (919) 042-24-92",
  keywords:
    "купить автобетононасос, автобетононасос цена, заказать автобетононасос, SANY автобетононасос, автобетононасос из Китая, цена автобетононасоса",
  robots: "index, follow",
  alternates: {
    canonical: "https://v0-avtobetononasos.vercel.app/kupit-avtobetononasos",
  },
  openGraph: {
    title: "Купить автобетононасос SANY - Лучшие цены и условия",
    description:
      "Прямые поставки автобетононасосов SANY из Китая. Экономия до 30%, гарантия качества, лизинг без переплат.",
    url: "https://v0-avtobetononasos.vercel.app/kupit-avtobetononasos",
    siteName: "Автобетононасосы SANY",
    images: [
      {
        url: "https://v0-avtobetononasos.vercel.app/images/pump1.jpg",
        width: 1200,
        height: 630,
        alt: "Автобетононасос SANY - купить с доставкой",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Купить автобетононасос SANY - Лучшие цены",
    description: "Прямые поставки из Китая, экономия до 30%, гарантия качества",
    images: ["https://v0-avtobetononasos.vercel.app/images/pump1.jpg"],
  },
}

export default function BuyPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Структурированные данные для товаров */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Автобетононасос SANY",
            description: "Автобетононасосы SANY с прямой поставкой из Китая",
            brand: {
              "@type": "Brand",
              name: "SANY",
            },
            category: "Строительная техника",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "RUB",
              lowPrice: "14200000",
              highPrice: "26900000",
              offerCount: "6",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "Автобетононасосы SANY",
                telephone: "+7-919-042-24-92",
                email: "zhukovigor@mail.ru",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: "3",
            },
          }),
        }}
      />

      {/* Хлебные крошки */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: "https://v0-avtobetononasos.vercel.app",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Купить автобетононасос",
                item: "https://v0-avtobetononasos.vercel.app/kupit-avtobetononasos",
              },
            ],
          }),
        }}
      />

      {children}
    </>
  )
}
