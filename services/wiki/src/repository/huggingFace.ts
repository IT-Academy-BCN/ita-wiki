import 'dotenv/config'
import {
  TCleanTextOptions,
  THuggingFaceResponseInput,
  TResponse,
} from '../db/knexTypes'
import { extractSummary, trimDoubleBackspace } from '../helpers/getHFCleanText'

export class HuggingFaceRepository {
  private apiEndpoint: string
  private apiKey: string

  constructor() {
    this.apiEndpoint = process.env.HF_API_ENDPOINT as string
    this.apiKey = process.env.HF_API_KEY as string
  }

  async getResponse(input: THuggingFaceResponseInput): Promise<TResponse> {
    const fetchResponse = await fetch(`${this.apiEndpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: input.input,
        parameters: {
          max_length: Number(process.env.HF_RES_MAX_LENGTH),
          temperature: Number(process.env.HF_RES_TEMPERATURE),
          top_p: Number(process.env.HF_RES_TOP_P),
        },
      }),
    })
    if (!fetchResponse.ok) {
      await fetchResponse.text()
      throw new Error(`HTTP error! status: ${fetchResponse.status}`)
    }
    const output = await fetchResponse.json()
    const response = this.cleanHFResponse(
      output[0],
      input.language,
      input.title,
      input.url,
      input.topic
    )
    return response as unknown as TResponse
  }

  async cleanText(
    output: { generated_text: string }[],
    options: TCleanTextOptions & { removeInputTemplate?: string },
    title?: string
  ): Promise<string> {
    const originalText = output[0]?.generated_text

    if (typeof originalText !== 'string') {
      return ''
    }

    let cleanText = originalText

    if (options.removeInputTemplate) {
      const indexOfTemplate = cleanText.indexOf(options.removeInputTemplate)
      if (indexOfTemplate !== -1) {
        cleanText = cleanText
          .slice(indexOfTemplate + options.removeInputTemplate.length)
          .trim()
      }
    }

    const extractedSummary = extractSummary(cleanText, options, title)

    return trimDoubleBackspace(extractedSummary)
  }

  async cleanTextByLanguage(
    output: { generated_text: string }[],
    language: 'es' | 'en' | 'ca',
    title: string,
    url: string,
    topic: string
  ): Promise<string> {
    const languageOptions = {
      es: {
        summaryPrefix: 'Resumen: ',
        removeInputTemplate: `Por favor, proporciona una resumen detallado de la siguiente fuente ${title}, incluyendo los puntos clave, el propósito principal y los conceptos relevantes. Usa un tono claro y accesible. La fuente puede ser encontrada en ${url}, y su tema es ${topic}. El resumen debe estar entre 200 y 300 palabras. Resumen:`,
      },
      en: {
        summaryPrefix: 'Summary:\n',
        removeInputTemplate: `Please provide a detailed summary of the following resource ${title}, including the key points, the main purpose, and the most relevant concepts. Use a clear and accessible tone. The resource can be found at ${url}, and its topic is ${topic}. The summary should be between 200 and 300 words. Summary:\n`,
      },
      ca: {
        summaryPrefix: 'RESUM: ',
        removeInputTemplate: `Si us plau, porporciona un resum detallat de la següent font ${title}, incloent els punts clau, el propòsit principal i els conceptes més rellevants. Empra un to clar i accesible. La font es pot trobar a ${url}, i el seu tema és ${topic}. El resum ha de tenir entre 200 a 300 paraules. RESUM:`,
      },
    }

    const options = languageOptions[language]

    if (!options) {
      throw new Error(`Unsupported language: ${language}`)
    }

    return this.cleanText(output, { ...options, titleIncluded: true }, title)
  }

  async cleanHFResponse(
    output: { generated_text: any }[] | { generated_text: any },
    language: string,
    title: string,
    url: string,
    topic: string
  ): Promise<{ generated_text: string }> {
    if (!Array.isArray(output)) {
      // eslint-disable-next-line no-param-reassign
      output = [output]
    }

    if (!output[0] || typeof output[0].generated_text !== 'string') {
      return { generated_text: 'Error: Unable to clean text.' }
    }

    let text = ''

    try {
      switch (language) {
        case 'en':
          text = await this.cleanTextByLanguage(
            output,
            language,
            title,
            url,
            topic
          )
          break
        case 'es':
          text = await this.cleanTextByLanguage(
            output,
            language,
            title,
            url,
            topic
          )
          break
        case 'ca':
          text = await this.cleanTextByLanguage(
            output,
            language,
            title,
            url,
            topic
          )
          break
        default:
          throw new Error(`Invalid language ${language}`)
      }

      if (!text || text.trim().length === 0) {
        throw new Error('Cleaned text is empty')
      }
    } catch (error) {
      return { generated_text: 'Error: Unable to clean text.' }
    }

    return { generated_text: text }
  }
}
