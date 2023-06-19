# Trello Clone

Bu proje, popüler proje yönetim aracı Trello'nun bir kopyasıdır. Next.js ve TypeScript kullanılarak oluşturulmuştur.

## Özellikler

- Sütunlar içinde görevleri ekleme, düzenleme ve silme.
- Görevlerin durumunu değiştirmek için sürükle ve bırak.
- Görevler için resim yükleme ve görüntüleme.
- Yapay zeka destekli günlük program değerlendirmesi

## Kullanılan Teknolojiler

- Next.js
- TypeScript
- React Router
- React Beautiful DND
- Tailwind CSS
- HeadlessUI
- Appwrite
- OpenAI
- Zustand

## Başlarken

Bu projeyi kullanmaya başlamak için aşağıdaki adımları izleyin:

1. Depoyu klonlayın:

 ```bash
   git clone https://github.com/FurkanTanriover/trello-clone.git
   ```
   
2. Kendi environment variable değişkenlerinizi oluşturun ve .env.local dosyasına ekleyin

- Appwrite project id
- Appwrite database id
- Appwrite collection todos id
- Open AI API key  
   
3. Bağımlılıkları yükleyin:

```bash
cd trello-clone
npm install
```
3. Projeyi ayağa kaldırın

```bash
yarn dev && npm start
```
