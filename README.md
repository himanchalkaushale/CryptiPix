# CryptiPix 🔐🖼️

**Hide messages in images with advanced steganography and encryption**

CryptiPix is a modern, secure image steganography tool that allows you to hide secret messages within images using LSB (Least Significant Bit) technique. All processing happens locally in your browser, ensuring complete privacy and security.

## 🌟 Features

- **🔒 Advanced Steganography**: Uses LSB technique to hide messages invisibly in images
- **🛡️ Military-Grade Encryption**: Optional AES-256-GCM encryption with PBKDF2 key derivation
- **🌐 Client-Side Processing**: All operations happen locally - your data never leaves your device
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Beautiful, intuitive interface with smooth animations
- **🔍 Tamper Detection**: Authenticated encryption detects if hidden messages have been modified
- **📁 Multiple Formats**: Supports PNG, JPEG, JPG, and BMP image formats

## 🚀 Live Demo

Visit the live application: [https://starlit-sorbet-7549c0.netlify.app](https://starlit-sorbet-7549c0.netlify.app)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Encryption**: Web Crypto API (AES-256-GCM)
- **Deployment**: Netlify

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/himanchalkaushale/cryptipix.git
   cd cryptipix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 How to Use

### Embedding Messages

1. Go to the **"Embed Message"** tab
2. Upload an image (PNG, JPEG, JPG, or BMP)
3. Type your secret message in the text area
4. Optionally enable encryption and set a password
5. Click **"Embed Message"** to hide your text
6. Download the modified image

### Extracting Messages

1. Go to the **"Extract Message"** tab
2. Upload an image with a hidden message
3. If encrypted, enter the correct password
4. Click **"Extract Message"** to reveal the hidden text
5. Copy the extracted message if needed

## 🔐 Security Features

### Steganography
- **LSB Technique**: Modifies the least significant bits of image pixels
- **Invisible Changes**: Alterations are imperceptible to the human eye
- **Binary Encoding**: Messages are converted to binary for embedding

### Encryption
- **Algorithm**: AES-256-GCM (Galois/Counter Mode)
- **Key Derivation**: PBKDF2 with 100,000 iterations
- **Security**: 128-bit random salt and 96-bit random IV
- **Integrity**: GCM mode provides authentication and tamper detection

### Privacy
- **Client-Side Only**: No server communication required
- **Local Processing**: All operations happen in your browser
- **No Data Collection**: Your images and messages are never stored or transmitted

## 📁 Project Structure

```
cryptipix/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Help.tsx           # Help and documentation component
│   │   ├── ImageUpload.tsx    # Image upload and preview component
│   │   ├── Logo.tsx           # CryptiPix logo components
│   │   ├── MessageEmbed.tsx   # Message embedding interface
│   │   └── MessageExtract.tsx # Message extraction interface
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── utils/
│   │   ├── encryption.ts      # AES encryption utilities
│   │   └── steganography.ts   # LSB steganography implementation
│   ├── App.tsx                # Main application component
│   ├── index.css              # Global styles
│   ├── main.tsx               # Application entry point
│   └── vite-env.d.ts          # Vite type definitions
├── index.html                 # HTML template
├── package.json               # Project dependencies
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Technical Specifications

### Supported Image Formats
- **Input**: PNG, JPEG, JPG, BMP
- **Output**: PNG (recommended for lossless quality)
- **Maximum file size**: 10MB
- **Minimum dimensions**: 50×50 pixels

### Encryption Details
- **Algorithm**: AES-256-GCM
- **Key derivation**: PBKDF2
- **Iterations**: 100,000
- **Salt**: 128-bit random
- **IV**: 96-bit random
- **Authentication**: Built-in with GCM mode

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## ⚠️ Important Notes

- **Image Format**: Always save steganographic images as PNG to preserve quality
- **File Size**: Larger images can hide longer messages
- **Password Security**: Use strong, unique passwords for encrypted messages
- **Backup**: Keep backup copies of passwords - lost passwords mean lost messages
- **Compression**: Avoid JPEG compression as it may damage hidden data
- **Legal Use**: Use responsibly and comply with applicable laws

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Himanchal Kaushale**
- LinkedIn: [https://www.linkedin.com/in/himanchal-kaushale/](https://www.linkedin.com/in/himanchal-kaushale/)
- GitHub: [https://github.com/himanchalkaushale](https://github.com/himanchalkaushale)

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Deployed on [Netlify](https://www.netlify.com/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the developer through the links above.

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**
