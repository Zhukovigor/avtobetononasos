import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import { ModelDataProvider } from "./components/model-data-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Автобетононасосы SANY - продажа, аренда, сервис",
  description:
    "Официальный дилер SANY в России. Продажа автобетононасосов, запчасти, сервисное обслуживание. Гарантия, лизинг, быстрая доставка.",
  keywords: "автобетононасос, SANY, купить, аренда, сервис, запчасти, лизинг",
  authors: [{ name: "SANY Russia" }],
  robots: "index, follow",
  openGraph: {
    title: "Автобетононасосы SANY - официальный дилер",
    description: "Продажа автобетононасосов SANY с гарантией. Лизинг, сервис, запчасти.",
    type: "website",
    locale: "ru_RU",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C51FMTXZE1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C51FMTXZE1');
            `,
          }}
        />

        {/* Yandex.Metrika counter */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(102485605, "init", {
                   clickmap:true,
                   trackLinks:true,
                   accurateTrackBounce:true,
                   trackHash:true,
                   ecommerce:"dataLayer"
              });
            `,
          }}
        />

        {/* Структурированные данные JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Автобетононасосы SANY",
              description: "Продажа автобетононасосов SANY с прямой поставкой из Китая",
              url: "https://v0-avtobetononasos.vercel.app",
              logo: "https://v0-avtobetononasos.vercel.app/images/pump1.jpg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+7-919-042-24-92",
                contactType: "sales",
                email: "zhukovigor@mail.ru",
                availableLanguage: "Russian",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "RU",
                addressLocality: "Россия",
              },
              sameAs: [
                "https://wa.me/79190422492",
                "https://vk.com/sprostehnika",
                "https://t.me/sany_global",
                "https://dzen.ru/sprostehnika",
              ],
              offers: {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "Автобетононасосы SANY",
                  description: "Автобетононасосы SANY различных моделей с высотой подачи от 33 до 75 метров",
                  brand: {
                    "@type": "Brand",
                    name: "SANY",
                  },
                  category: "Строительная техника",
                },
                seller: {
                  "@type": "Organization",
                  name: "Автобетононасосы SANY",
                },
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ModelDataProvider>{children}</ModelDataProvider>

        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/102485605" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  )
}
