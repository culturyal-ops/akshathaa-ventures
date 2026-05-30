/**
 * Compresses an image file to WebP format with specified max width
 * Converts large phone photos (4-8MB) to ~200-400KB for faster loading on mobile networks
 */
export const compressImage = (file: File, maxWidthPx = 1400): Promise<File> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      const scale = Math.min(1, maxWidthPx / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(
        blob => {
          if (blob) {
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }));
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/webp',
        0.82 // Quality — good balance for property photos
      );
      
      URL.revokeObjectURL(url);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });

/**
 * Compresses multiple images in parallel
 */
export const compressImages = async (files: File[], maxWidthPx = 1400): Promise<File[]> => {
  return Promise.all(files.map(file => compressImage(file, maxWidthPx)));
};
