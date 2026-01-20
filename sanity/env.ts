export const apiVersion =
  process.env.SANITY_API_VERSION || '2026-01-19'

export const dataset = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID || "production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.SANITY_STUDIO_DATASET || "drtpvgt7",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

console.log(
  process.env.SANITY_API_VERSION,
  process.env.SANITY_DATASET,
  process.env.SANITY_PROJECT_ID
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
