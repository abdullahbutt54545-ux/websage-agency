// Utility to save, retrieve, and export leads from localStorage

const LEADS_KEY = 'websage_leads'

export function saveLead(lead) {
  const existing = getLeads()
  const newLead = {
    ...lead,
    id: Date.now(),
    submittedAt: new Date().toISOString(),
    status: 'new'
  }
  existing.push(newLead)
  localStorage.setItem(LEADS_KEY, JSON.stringify(existing))
  return newLead
}

export function getLeads() {
  try {
    return JSON.parse(localStorage.getItem(LEADS_KEY) || '[]')
  } catch {
    return []
  }
}

export function getLeadCount() {
  return getLeads().length
}

export function exportLeadsAsCSV() {
  const leads = getLeads()
  if (!leads.length) return
  const headers = ['ID', 'Name', 'Business Name', 'Email', 'Phone', 'Country', 'City', 'Project Type', 'Timeline', 'Message', 'Submitted At']
  const rows = leads.map(l => [
    l.id,
    l.name,
    l.businessName || '',
    l.email,
    l.phone || '',
    l.country || '',
    l.city || '',
    l.projectType,
    l.timeline,
    (l.message || '').replace(/,/g, ';'),
    l.submittedAt
  ])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `websage_leads_${new Date().toISOString().slice(0,10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
