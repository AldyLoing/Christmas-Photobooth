# Folder untuk Musik Natal

Tempatkan file musik Natal Anda di folder ini.

## Format yang Didukung

- MP3 (direkomendasikan)
- WAV
- OGG

## Contoh File

- `christmas-jingle.mp3`
- `jingle-bells.mp3`
- `we-wish-you.mp3`

## Cara Mengaktifkan

1. Tambahkan file musik ke folder ini (misalnya: `christmas.mp3`)
2. Buka file `components/MusicPlayer.tsx`
3. Uncomment baris berikut:
   ```tsx
   <source src="/music/christmas.mp3" type="audio/mpeg" />
   ```
4. Ganti `christmas.mp3` dengan nama file musik Anda

## Rekomendasi Musik

Anda dapat menggunakan musik bebas royalti dari:
- YouTube Audio Library
- Free Music Archive
- Incompetech
- Bensound

Pastikan Anda memiliki hak untuk menggunakan musik tersebut!
