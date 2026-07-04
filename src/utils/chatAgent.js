import { services } from '../data/services'

// Helper to delay responses slightly for a more "human" feel
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getAgentResponse = (userInput, userName = 'there') => {
  const input = userInput.toLowerCase()
  
  // 1. Specific service inquiries
  const matchedService = services.find(s => 
    input.includes(s.title.toLowerCase().split(' ')[0]) || 
    (input.includes('seo') && s.title.includes('SEO')) ||
    (input.includes('web') && s.title.includes('Web')) ||
    (input.includes('design') && s.title.includes('Design'))
  )

  if (matchedService) {
    return `Great choice, ${userName}. For **${matchedService.title}**, we focus on getting you real results fast.\n\n` +
           `${matchedService.shortDesc}\n\n` +
           `💡 *Suggestion:* Let's jump on a quick 10-min call so I can show you exactly how this can boost your revenue. Sound good?`
  }

  // 2. Asking for all services
  if (input.includes('service') || input.includes('all') || input.includes('what do you do') || input.includes('help')) {
    return `We do everything you need to grow online, ${userName}. Our main services are:\n\n` +
           `🔹 **Web Dev** (WordPress, Shopify, Custom)\n` +
           `🔹 **Marketing** (SEO, Ads, Social Media)\n` +
           `🔹 **Design** (Branding, UI/UX, Landing Pages)\n\n` +
           `💡 *Suggestion:* Tell me the biggest challenge your business is facing right now, and I'll tell you which service fits best!`
  }

  // 3. Pricing inquiries
  if (input.includes('price') || input.includes('cost') || input.includes('fee')) {
    return `Since every business is unique, our pricing is completely custom-tailored to your specific goals and budget.\n\n` +
           `💡 *Suggestion:* If we can hop on a quick discovery call, I can give you an accurate, no-obligation quote today. Want to schedule one?`
  }

  // 4. Greeting
  if (input.match(/^(hi|hello|hey|greetings)/)) {
    return `Hey ${userName}! 👋 I've got your details safe with our team.\n\n` +
           `While they review it, how can I help you right now? Want to hear about our **services** or discuss a specific **goal**?`
  }

  // 5. Default fallback (Conversational)
  return `Got it, ${userName}. That makes total sense.\n\n` +
         `To make sure I give you the best advice, could you clarify exactly what you're looking to achieve? (Or you can just ask me about our **services** or **pricing**!)`
}
