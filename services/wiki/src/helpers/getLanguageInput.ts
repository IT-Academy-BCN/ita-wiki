export const getLanguageInput = (
  language: string,
  title: string,
  url: string,
  topic: string
): string => {
  switch (language) {
    case 'en':
      return `Please provide a detailed summary of the following resource ${title}, including the key points, the main purpose, and the most relevant concepts. Use a clear and accessible tone. The resource can be found at ${url}, and its topic is ${topic}. The summary should be between 200 and 300 words. Summary:\n`
    case 'es':
      return `Por favor, proporciona una resumen detallado de la siguiente fuente ${title}, incluyendo los puntos clave, el propósito principal y los conceptos relevantes. Usa un tono claro y accesible. La fuente puede ser encontrada en ${url}, y su tema es ${topic}. El resumen debe estar entre 200 y 300 palabras. Resumen:`
    case 'ca':
      return `Si us plau, porporciona un resum detallat de la següent font ${title}, incloent els punts clau, el propòsit principal i els conceptes més rellevants. Empra un to clar i accesible. La font es pot trobar a ${url}, i el seu tema és ${topic}. El resum ha de tenir entre 200 a 300 paraules. RESUM:`
    default:
      throw new Error('Unsupported language')
  }
}
