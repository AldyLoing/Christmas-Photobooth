# Folder untuk Overlay Images

Folder ini dapat digunakan untuk menyimpan gambar overlay tambahan seperti:

- `santa-hat.png` - Gambar topi Santa
- `reindeer-antlers.png` - Gambar tanduk rusa
- `christmas-frame.png` - Gambar bingkai Natal
- `snowman.png` - Gambar snowman
- `mistletoe.png` - Gambar mistletoe
- `christmas-lights.png` - Gambar lampu Natal

## Format yang Disarankan

- Format: PNG dengan transparansi
- Resolusi: 1920x1080 atau lebih tinggi
- Background: Transparan

## Cara Menggunakan

Jika Anda ingin menggunakan gambar overlay custom alih-alih emoji:

1. Tambahkan file gambar ke folder ini
2. Edit `components/CameraView.tsx`
3. Ganti emoji dengan tag `<img>` yang mengarah ke file gambar

Contoh:
```tsx
<img 
  src="/assets/overlays/santa-hat.png" 
  alt="Santa Hat"
  className="absolute top-0 w-full"
/>
```

Saat ini, aplikasi menggunakan emoji untuk kemudahan dan kompatibilitas.
