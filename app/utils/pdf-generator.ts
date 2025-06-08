export interface PDFData {
  model: string
  height: string
  performance: string
  price: string
  image?: string // Добавляем поле для изображения
  specs: {
    length: string
    width: string
    height: string
    weight: string
    verticalReach: string
    horizontalReach: string
    depthReach: string
    minRadius?: string
    performanceLow: string
    performanceHigh?: string
    pressureLow: string
    pressureHigh?: string
    cylinderDiameter?: string
    strokeLength: string
    chassis: string
    engine: string
    power: string
    maxSpeed?: string
  }
  delivery: {
    location: string
    term: string
    warranty: string
    payment: string
  }
}

// Функция для конвертации изображения в base64
async function imageToBase64(imagePath: string): Promise<string> {
  try {
    const response = await fetch(imagePath)
    const blob = await response.blob()

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error("Ошибка загрузки изображения:", error)
    return ""
  }
}

export async function downloadPDF(data: PDFData) {
  try {
    // Конвертируем изображение в base64 если оно есть
    let imageBase64 = ""
    if (data.image) {
      imageBase64 = await imageToBase64(data.image)
    }

    const htmlContent = generatePDFHTML(data, imageBase64)

    // Открываем новое окно с HTML контентом
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(htmlContent)
      printWindow.document.close()

      // Ждем загрузки и автоматически открываем диалог печати
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
          // Закрываем окно после печати (опционально)
          printWindow.onafterprint = () => {
            printWindow.close()
          }
        }, 1000)
      }
    } else {
      // Если блокировщик попапов заблокировал окно, создаем blob и скачиваем
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `КП_${data.model.replace(/\s+/g, "_")}.html`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      alert("Файл скачан. Откройте его в браузере и нажмите Ctrl+P для печати в PDF")
    }
  } catch (error) {
    console.error("Ошибка генерации PDF:", error)
    alert("Произошла ошибка при генерации PDF. Попробуйте еще раз.")
  }
}

function generatePDFHTML(data: PDFData, imageBase64 = ""): string {
  const currentDate = new Date().toLocaleDateString("ru-RU")

  return `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Коммерческое предложение - ${data.model}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.3;
            color: #333;
            background: white;
            font-size: 11px;
            height: 100vh;
            overflow: hidden;
        }
        
        .container {
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
            padding: 8mm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .header {
            text-align: center;
            padding-bottom: 12px;
            border-bottom: 3px solid #e74c3c;
            margin-bottom: 15px;
        }
        
        .header-left {
            flex: 1;
            text-align: center; /* Добавить центрирование */
        }
        
        .header-right {
            text-align: right;
            font-size: 10px;
            color: #666;
        }
        
        .logo {
            font-size: 42px;
            font-weight: bold;
            color: #e74c3c;
            margin-bottom: 8px;
            letter-spacing: 3px;
            text-align: center;
        }
        
        .title {
            font-size: 16px;
            color: #333;
            margin-bottom: 5px;
            text-transform: uppercase;
            font-weight: bold;
            text-align: center;
        }
        
        .subtitle {
            font-size: 14px;
            color: #666;
            font-weight: 500;
            text-align: center;
        }
        
        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 15px;
        }
        
        .image-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .image-container {
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
        }

        .hero-image {
            width: 400px;
            height: 240px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            border: 3px solid #e74c3c;
        }
        
        .key-specs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 15px;
        }
        
        .key-spec {
            text-align: center;
            padding: 12px;
            background: linear-gradient(135deg, #fff5f5, #fee);
            border-radius: 10px;
            border-left: 4px solid #e74c3c;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .key-spec-value {
            font-size: 20px;
            font-weight: bold;
            color: #e74c3c;
            margin-bottom: 5px;
        }
        
        .key-spec-label {
            font-size: 9px;
            color: #666;
            text-transform: uppercase;
            font-weight: 600;
        }
        
        .info-section {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 12px;
            border-left: 4px solid #e74c3c;
            padding-left: 12px;
            text-transform: uppercase;
            background: linear-gradient(90deg, #f8f9fa, transparent);
            padding-top: 8px;
            padding-bottom: 8px;
        }
        
        .specs-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 15px;
        }
        
        .spec-block {
            background: linear-gradient(135deg, #f8f9fa, #ffffff);
            padding: 12px;
            border-radius: 8px;
            border: 2px solid #e9ecef;
            box-shadow: 0 4px 15px rgba(0,0,0,0.06);
            height: fit-content;
        }
        
        .spec-block-title {
            font-size: 11px;
            font-weight: bold;
            color: #495057;
            margin-bottom: 10px;
            text-align: center;
            text-transform: uppercase;
            padding-bottom: 6px;
            border-bottom: 2px solid #e74c3c;
        }
        
        .spec-item {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            border-bottom: 1px dotted #dee2e6;
            font-size: 10px;
        }
        
        .spec-item:last-child {
            border-bottom: none;
        }
        
        .spec-label {
            font-weight: 500;
            color: #555;
        }
        
        .spec-value {
            font-weight: bold;
            color: #333;
        }
        
        .bottom-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: auto;
        }
        
        .price-section {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .price-title {
            font-size: 14px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: bold;
        }
        
        .price {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .price-note {
            font-size: 11px;
            opacity: 0.9;
            margin-bottom: 12px;
        }
        
        .delivery-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }
        
        .delivery-item {
            background: rgba(255,255,255,0.15);
            padding: 8px;
            border-radius: 6px;
            text-align: center;
            backdrop-filter: blur(10px);
        }
        
        .delivery-label {
            font-size: 8px;
            opacity: 0.9;
            margin-bottom: 3px;
            text-transform: uppercase;
            font-weight: 600;
        }
        
        .delivery-value {
            font-size: 10px;
            font-weight: bold;
        }
        
        .contact-section {
            background: linear-gradient(135deg, #34495e, #2c3e50);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(52, 73, 94, 0.2);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .contact-title {
            font-size: 14px;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: bold;
            text-align: center;
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
        }
        
        .contact-item {
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 4px;
        }
        
        .contact-icon {
            font-size: 14px;
        }
        
        .footer-note {
            grid-column: 1 / -1;
            margin-top: 15px;
            padding-top: 12px;
            border-top: 2px solid #dee2e6;
            font-size: 9px;
            color: #666;
            text-align: center;
            line-height: 1.4;
        }
        
        .print-button {
            position: fixed;
            top: 15px;
            right: 15px;
            background: #e74c3c;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .print-button:hover {
            background: #c0392b;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
        }
        
        @media print {
            .print-button {
                display: none;
            }
            
            body {
                font-size: 10px;
                height: auto;
                overflow: visible;
            }
            
            .container {
                width: 100%;
                height: 100vh;
                padding: 5mm;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            
            .logo {
                font-size: 36px;
            }
            
            .price {
                font-size: 20px;
            }
            
            .main-content {
                grid-template-columns: ${imageBase64 ? "200px 1fr" : "1fr"};
                gap: 15px;
            }
            
            .hero-image {
                width: 350px;
                height: 200px;
            }
            
            .specs-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
            }
            
            .bottom-section {
                gap: 12px;
            }
        }
        
        @page {
            margin: 0;
            size: A4;
        }
    </style>
</head>
<body>
    <button class="print-button" onclick="window.print()">📄 Сохранить как PDF</button>
    
    <div class="container">
        <div class="header">
            <div class="logo">SANY</div>
            <div class="title">Коммерческое предложение</div>
            <div class="subtitle">Автобетононасос ${data.model}</div>
        </div>
        
        <div class="main-content">
            ${
              imageBase64
                ? `
    <div class="image-section">
        <div class="image-container">
            <img src="${imageBase64}" alt="${data.model}" class="hero-image" />
        </div>
        <div class="key-specs">
            <div class="key-spec">
                <div class="key-spec-value">${data.height}</div>
                <div class="key-spec-label">Высота подачи</div>
            </div>
            <div class="key-spec">
                <div class="key-spec-value">${data.performance}</div>
                <div class="key-spec-label">Производительность</div>
            </div>
        </div>
    </div>
    `
                : ""
            }
            
            <div class="info-section">
                <div class="section-title">Технические характеристики</div>
                <div class="specs-grid">
                    <div class="spec-block">
                        <div class="spec-block-title">Общие параметры</div>
                        <div class="spec-item">
                            <span class="spec-label">Длина:</span>
                            <span class="spec-value">${data.specs.length}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Ширина:</span>
                            <span class="spec-value">${data.specs.width}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Высота:</span>
                            <span class="spec-value">${data.specs.height}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Вес:</span>
                            <span class="spec-value">${data.specs.weight}</span>
                        </div>
                    </div>
                    
                    <div class="spec-block">
                        <div class="spec-block-title">Характеристики стрелы</div>
                        <div class="spec-item">
                            <span class="spec-label">Верт. вылет:</span>
                            <span class="spec-value">${data.specs.verticalReach}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Гориз. вылет:</span>
                            <span class="spec-value">${data.specs.horizontalReach}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Глубина:</span>
                            <span class="spec-value">${data.specs.depthReach}</span>
                        </div>
                        ${
                          data.specs.minRadius
                            ? `
                        <div class="spec-item">
                            <span class="spec-label">Мин. радиус:</span>
                            <span class="spec-value">${data.specs.minRadius}</span>
                        </div>
                        `
                            : ""
                        }
                    </div>
                    
                    <div class="spec-block">
                        <div class="spec-block-title">Насосная система</div>
                        <div class="spec-item">
                            <span class="spec-label">Производит.:</span>
                            <span class="spec-value">${data.specs.performanceLow}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Давление:</span>
                            <span class="spec-value">${data.specs.pressureLow}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Длина хода:</span>
                            <span class="spec-value">${data.specs.strokeLength}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Шасси:</span>
                            <span class="spec-value">${data.specs.chassis}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Двигатель:</span>
                            <span class="spec-value">${data.specs.engine}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Мощность:</span>
                            <span class="spec-value">${data.specs.power}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bottom-section">
            <div class="price-section">
                <div class="price-title">💰 Стоимость оборудования</div>
                <div class="price">${data.price}</div>
                <div class="price-note">НДС включен. Утильсбор уплачен</div>
                <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; margin-bottom: 12px; backdrop-filter: blur(10px);">
                    <div style="font-size: 11px; font-weight: 600; text-align: center;">✅ В наличии</div>
                </div>
                
                <div class="delivery-grid">
                    <div class="delivery-item">
                        <div class="delivery-label">⏱️ Срок поставки</div>
                        <div class="delivery-value">${data.delivery.term}</div>
                    </div>
                    <div class="delivery-item">
                        <div class="delivery-label">📍 Место отгрузки</div>
                        <div class="delivery-value">${data.delivery.location}</div>
                    </div>
                    <div class="delivery-item">
                        <div class="delivery-label">🛡️ Гарантия</div>
                        <div class="delivery-value">${data.delivery.warranty}</div>
                    </div>
                    <div class="delivery-item">
                        <div class="delivery-label">💳 Условия оплаты</div>
                        <div class="delivery-value">${data.delivery.payment}</div>
                    </div>
                </div>
            </div>
            
            <div class="contact-section">
                <div class="contact-title">📞 Контактная информация</div>
                <div class="contact-grid">
                    <div class="contact-item">
                        <span class="contact-icon">👤</span>
                        <span>Менеджер: Ольга</span>
                    </div>
                  
                    <div class="contact-item">
                        <span class="contact-icon">📞</span>
                        <span>Телефон: +7 (910) 721-94-00</span>
                    </div>
                    <div class="contact-item">
                        <span class="contact-icon">📧</span>
                        <span>Email: 2_2_2@mail.ru</span>
                    </div>
                </div>
            </div>
            
            <div class="footer-note">
                <p><strong>⚠️ Важная информация:</strong> Данное коммерческое предложение действительно в течение 10 дней с даты составления • Все цены указаны с учетом НДС и могут быть изменены без предварительного уведомления • Технические характеристики могут отличаться в зависимости от комплектации</p>
                <p style="margin-top: 8px; font-weight: bold;">© ${new Date().getFullYear()} SANY. Все права защищены.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `
}
