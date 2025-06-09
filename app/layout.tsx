import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Автобетононасосы SANY - Продажа и поставка из Китая",
  description:
    "Продажа автобетононасосов SANY с прямой поставкой из Китая. Официальный поставщик. Выгодные цены. Доставка по России. Лизинг.",
  keywords: "автобетононасос, SANY, продажа, поставка из Китая, бетононасос, строительная техника",
  robots: "index, follow",
  author: "Автобетононасосы SANY",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://v0-avtobetononasos.vercel.app",
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

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Автобетононасосы SANY" />

        {/* Open Graph метатеги */}
        <meta property="og:title" content="Автобетононасосы SANY - Продажа и поставка из Китая" />
        <meta
          property="og:description"
          content="Продажа автобетононасосов SANY с прямой поставкой из Китая. Официальный поставщик."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://v0-avtobetononasos.vercel.app" />
        <meta property="og:image" content="https://v0-avtobetononasos.vercel.app/images/pump1.jpg" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Автобетононасосы SANY" />

        {/* Twitter Card метатеги */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Автобетононасосы SANY - Продажа и поставка из Китая" />
        <meta
          name="twitter:description"
          content="Продажа автобетононасосов SANY с прямой поставкой из Китая. Официальный поставщик."
        />
        <meta name="twitter:image" content="https://v0-avtobetononasos.vercel.app/images/pump1.jpg" />

        {/* Дополнительные SEO метатеги */}
        <meta name="geo.region" content="RU" />
        <meta name="geo.placename" content="Россия" />
        <meta name="language" content="Russian" />

        {/* Канонический URL */}
        <link rel="canonical" href="https://v0-avtobetononasos.vercel.app" />

        {/* Альтернативные языки (если будут) */}
        <link rel="alternate" hrefLang="ru" href="https://v0-avtobetononasos.vercel.app" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

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
        {children}

        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/102485605" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  )
}
