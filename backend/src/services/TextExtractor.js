import fs from 'fs'
import mammoth from 'mammoth'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

export const extractTextFromFile = async (file) => {
    const filePath = file.path
    const mimeType = file.mimetype

    if (mimeType === 'application/pdf') {
        const data = new Uint8Array(fs.readFileSync(filePath))
        const pdf = await getDocument({ data }).promise

        let text = ''

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i)
            const content = await page.getTextContent()
            text += content.items.map(item => item.str).join(' ') + '\n'
        }

        return text
    }

    if (
        mimeType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        const result = await mammoth.extractRawText({ path: filePath })
        return result.value
    }

    throw new Error('Unsupported file type')
}
