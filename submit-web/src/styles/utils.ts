export const hexToRgba = (hex: string, opacity: number) => {
    let red = 0, green = 0, blue = 0;
    if (hex.length === 4) {
      red = parseInt(hex[1] + hex[1], 16);
      green = parseInt(hex[2] + hex[2], 16);
      blue = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      red = parseInt(hex[1] + hex[2], 16);
      green = parseInt(hex[3] + hex[4], 16);
      blue = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  };