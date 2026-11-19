export const LOGO_WIDTH = 600;
export const LOGO_HEIGHT = 300;
export const LOGO_MAX_BYTES = 5 * 1024 * 1024;
export const LOGO_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];
export function logoPlacement(width: number, height: number) {
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0 ||
    width > 16000 ||
    height > 16000 ||
    width * height > 40000000
  )
    throw new Error("Imagem muito grande ou inválida. Use até 40 megapixels e 16.000 px por lado.");
  const scale = Math.min(560 / width, 260 / height, 1);
  const w = Math.round(width * scale),
    h = Math.round(height * scale);
  return {
    x: Math.floor((LOGO_WIDTH - w) / 2),
    y: Math.floor((LOGO_HEIGHT - h) / 2),
    width: w,
    height: h,
  };
}
export async function prepareLogo(file: File): Promise<File> {
  if (!LOGO_MIME_TYPES.includes(file.type) || !file.size || file.size > LOGO_MAX_BYTES)
    throw new Error("Envie PNG, JPG ou WEBP de até 5 MB.");
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () =>
        reject(new Error("Não foi possível abrir a imagem. Escolha outro arquivo."));
      image.src = url;
    });
    const box = logoPlacement(image.naturalWidth, image.naturalHeight);
    const canvas = document.createElement("canvas");
    canvas.width = LOGO_WIDTH;
    canvas.height = LOGO_HEIGHT;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Seu navegador não conseguiu preparar a imagem.");
    context.drawImage(image, box.x, box.y, box.width, box.height);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Falha ao preparar a logomarca."))),
        "image/png",
      ),
    );
    if (blob.size > LOGO_MAX_BYTES)
      throw new Error("A imagem preparada excedeu 5 MB. Escolha outro arquivo.");
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + "-600x300.png", {
      type: "image/png",
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}
