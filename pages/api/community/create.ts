import { IncomingForm, File } from 'formidable'
import FormData from 'form-data'
import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import api from '../../../utils/api'

export default async function proxy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      const form = new IncomingForm()

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        resolve({ fields, files })
      })
    })

    const formData = new FormData()
    for (const [name, value] of Object.entries<string>(fields)) {
      formData.append(name, value)
    }
    for (const [name, file] of Object.entries<File>(files)) {
      formData.append(name, fs.createReadStream(file.filepath), file.originalFilename || '')
    }

    const {
      data: { community },
    } = await api.post('/communities', formData, { headers: formData.getHeaders() })

    return res.status(200).send({ community })
  } catch (err: any) {
    console.log(err)
    return res.status(400).send({ message: err.message })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
