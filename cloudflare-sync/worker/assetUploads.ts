import { error } from 'itty-router'

export async function handleAssetUpload(request: Request, env: Env) {
        const uploadId = request.url.split('/').pop()
        if (!uploadId) return error(400, 'Missing uploadId')

        const formData = await request.formData()
        const file = formData.get('file') as File
        if (!file) return error(400, 'Missing file')

        await env.TLDRAW_BUCKET.put(`uploads/${uploadId}`, file)

        return new Response('OK', { status: 200 })
}

export async function handleAssetDownload(request: Request, env: Env) {
        const uploadId = request.url.split('/').pop()
        if (!uploadId) return error(400, 'Missing uploadId')

        const object = await env.TLDRAW_BUCKET.get(`uploads/${uploadId}`)
        if (!object) return error(404, 'Asset not found')

        return new Response(object.body, {
                headers: {
                        'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
                },
        })
}
