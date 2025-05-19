### README

## Analytics API Implementation

### Översikt
Detta dokument beskriver implementationen av analytics-endpoints för affärsdata i webbshopen. Dessa endpoints är endast tillgängliga för administratörer och tillhandahåller viktig affärsdata för analys.

### Endpoints

#### 1. Månadsvis orderintäkt
- **Endpoint:** `/api/analytics/revenue-per-month/`
- **Metod:** GET
- **Behörighet:** Endast administratörer
- **Beskrivning:** Returnerar totala orderintäkter för de senaste 12 månaderna
- **Exempel på svar:**
```json
{
  "april-2025": 560000,
  "mars-2025": 430000,
  "februari-2025": 380000,
  "januari-2025": 420000,
  "december-2024": 510000,
  "november-2024": 390000,
  "oktober-2024": 350000,
  "september-2024": 320000,
  "augusti-2024": 280000,
  "juli-2024": 250000,
  "juni-2024": 220000,
  "maj-2024": 190000,
  "april-2024": 38000
}
```

#### 2. Topp 10 största kunder
- **Endpoint:** `/api/analytics/top-customers/`
- **Metod:** GET
- **Behörighet:** Endast administratörer
- **Beskrivning:** Returnerar en lista över de 5 kunder som har spenderat mest totalt
- **Exempel på svar:**
```json
[
  {
    "customerId": "123",
    "name": "Anna Andersson",
    "totalSpent": 125000,
    "orderCount": 15
  },
  {
    "customerId": "456",
    "name": "Erik Svensson",
    "totalSpent": 98000,
    "orderCount": 12
  }
  // ... fler kunder
]
```

### Säkerhet
Alla analytics-endpoints är skyddade och kräver administratörsbehörighet. Vid otillåten åtkomst returneras 404 Not Found

