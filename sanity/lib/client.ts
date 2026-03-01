import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: "raphuzag", // Aapka Project ID
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Live updates ke liye false rakhein
})