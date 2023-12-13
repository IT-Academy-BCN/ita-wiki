const responsiveSizes = {
    mobileXl: '480px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px',
    laptopLg: '1440px',
  }
  
  const device = {
    Mobile: `screen and (min-width: ${responsiveSizes.mobileXl})`,
    Tablet: `screen and (min-width: ${responsiveSizes.tablet})`,
    Laptop: `screen and (min-width: ${responsiveSizes.laptop})`,
    Desktop: `screen and (min-width: ${responsiveSizes.desktop})`,
    LaptopLg: `screen and (min-width: ${responsiveSizes.laptopLg})`,
  }
  
  export { responsiveSizes, device }
