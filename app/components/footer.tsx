export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Контакты</h3>
            <div className="space-y-2 text-gray-400">
              <p>Email: zhukovigor@mail.ru</p>
              <p>Телефон: +7 (919) 042-24-92</p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Услуги</h3>
            <div className="space-y-2 text-gray-400">
              <p>Продажа автобетононасосов SANY</p>
              <p>Лизинг без переплат</p>
              <p>Консультации по выбору</p>
              <p>Помощь в оформлении лизинга</p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">О компании</h3>
            <div className="space-y-2 text-gray-400">
              <p>Прямые поставки из Китая</p>
              <p>Официальный поставщик SANY</p>
              <p>Выгодные цены</p>
              <p>Поставка 30 дней</p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Страницы</h3>
            <div className="space-y-2 text-gray-400">
              <a href="/" className="block hover:text-white transition-colors">
                Главная
              </a>
              <a href="/kupit-avtobetononasos" className="block hover:text-white transition-colors">
                Купить автобетононасос
              </a>
              <a href="/guides/kak-vybrat-avtobetononasos" className="block hover:text-white transition-colors">
                Как выбрать автобетононасос
              </a>
              <a href="/#catalog" className="block hover:text-white transition-colors">
                Каталог
              </a>
              <a href="/#contact" className="block hover:text-white transition-colors">
                Контакты
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Социальные сети</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/79190422492"
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-125">📱</span>
                <span className="relative">
                  WhatsApp
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                </span>
              </a>
              <a
                href="https://vk.com/sprostehnika"
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-125">🔵</span>
                <span className="relative">
                  ВКонтакте
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                </span>
              </a>
              <a
                href="https://t.me/sany_global"
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-125">✈️</span>
                <span className="relative">
                  Telegram
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                </span>
              </a>
              <a
                href="https://dzen.ru/sprostehnika"
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-125">🟠</span>
                <span className="relative">
                  Дзен
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Автобетононасосы SANY. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
