"use server"

export type WaitlistActionState = {
    success: boolean
    error?: string
}

export async function submitWaitlistAction(
    _prevState: WaitlistActionState,
    formData: FormData
): Promise<WaitlistActionState> {
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const timestamp = new Date().toISOString()

    console.info('[Eddie] Server action: submitWaitlistAction invoked')
    console.debug('[Eddie] Server action input:', { name, email, timestamp })

    if (!email || !name) {
        console.warn('[Eddie] Server action validation failed: missing fields')
        return { success: false, error: 'Name and email are required.' }
    }

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL
    if (!GOOGLE_SCRIPT_URL) {
        console.error('[Eddie] Server action: GOOGLE_SCRIPT_URL env variable not set')
        throw new Error('GOOGLE_SCRIPT_URL environment variable is required')
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => {
        controller.abort()
    }, 30000)

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
                name,
                email,
                timestamp: new Date().toISOString(),
            }),
            signal: controller.signal
        })

        if (!response.ok) {
            console.error('[Eddie] Server action HTTP error', { status: response.status })
            return { success: false, error: 'Server error. Please try again in a few moments.' }
        }

        console.info('[Eddie] Server action: submission successful')
        return { success: true }
    } catch (err: unknown) {
        if ((err as any)?.name === 'AbortError') {
            console.error('[Eddie] Server action timeout')
            return { success: false, error: 'Request timeout' }
        }
        console.error('[Eddie] Server action unexpected error', err)
        return { success: false, error: 'Network error' }
    } finally {
        clearTimeout(timeout)
    }
}


