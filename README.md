### Installation and deploy
- `npx vercel dev` : test on http://localhost:3000
- `npx vercel --prod` : deploy to vercel

### Api Path
- Enter `https://<url>.vercel.app/api/hello`
- Response 
```json
{
    "runtime": "edge",
    "country": "TH" // <---
}
```