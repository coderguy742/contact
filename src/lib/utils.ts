import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function rephraseText(content: string, tone: string): string {
  // Basic implementation that returns the original content
  // This can be enhanced later with actual rephrasing logic
  return content;
}

export function generateAIResponse(query: string): string {
  // Enhanced AI responses based on different query types
  const responses: { [key: string]: string } = {
    refund: `Based on your refund request, here's what we can do:

1. For orders within 30 days:
   - Full refund available
   - Return shipping label provided
   - Refund processed within 3-5 business days

2. For orders over 30 days:
   - Store credit available
   - Case-by-case evaluation for full refunds
   - Special circumstances considered

Please provide your order number and I'll help process this right away.`,
    
    shipping: `Here's your shipping information:

📦 Standard Delivery (3-5 business days)
✈️ Express Delivery (1-2 business days)
🌍 International (7-14 business days)

Your order will be shipped from our nearest fulfillment center. Would you like me to check specific delivery times for your location?`,
    
    product: `I'd be happy to help you with product information!

Key features:
• Premium materials
• Handcrafted quality
• 1-year warranty
• Free returns

Would you like me to:
1. Show you product demos?
2. Compare with similar items?
3. Check stock availability?`,
    
    account: `I can help you manage your account settings.

Available options:
• Update profile information
• Change password
• Manage notifications
• View order history
• Update payment methods

What would you like to do first?`,
    
    default: `I'm here to help! Could you please provide more details about your request? 

I can assist with:
• Orders and shipping
• Product information
• Account management
• Returns and refunds
• Technical support`
  };

  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('refund') || lowerQuery.includes('return')) {
    return responses.refund;
  } else if (lowerQuery.includes('shipping') || lowerQuery.includes('delivery')) {
    return responses.shipping;
  } else if (lowerQuery.includes('product') || lowerQuery.includes('item')) {
    return responses.product;
  } else if (lowerQuery.includes('account') || lowerQuery.includes('profile')) {
    return responses.account;
  }
  
  return responses.default;
}

export function getRelevantSources(query: string): AISource[] {
  const sources = {
    refund: [
      { id: '1', title: 'Refund Policy', icon: 'file-text', count: 12 },
      { id: '2', title: 'Return Process Guide', icon: 'package' },
      { id: '3', title: 'Special Cases & Exceptions', icon: 'gift' },
    ],
    shipping: [
      { id: '1', title: 'Shipping Methods', icon: 'truck', count: 8 },
      { id: '2', title: 'Delivery Estimates', icon: 'clock' },
      { id: '3', title: 'International Shipping', icon: 'globe' },
    ],
    product: [
      { id: '1', title: 'Product Specifications', icon: 'box', count: 15 },
      { id: '2', title: 'Usage Guidelines', icon: 'book' },
      { id: '3', title: 'Care Instructions', icon: 'heart' },
    ],
    account: [
      { id: '1', title: 'Account Management', icon: 'user', count: 10 },
      { id: '2', title: 'Security Settings', icon: 'shield' },
      { id: '3', title: 'Privacy Policy', icon: 'lock' },
    ],
    default: [
      { id: '1', title: 'Help Center', icon: 'help-circle', count: 25 },
      { id: '2', title: 'FAQs', icon: 'file-text' },
      { id: '3', title: 'Contact Support', icon: 'mail' },
    ],
  };

  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('refund') || lowerQuery.includes('return')) {
    return sources.refund;
  } else if (lowerQuery.includes('shipping') || lowerQuery.includes('delivery')) {
    return sources.shipping;
  } else if (lowerQuery.includes('product') || lowerQuery.includes('item')) {
    return sources.product;
  } else if (lowerQuery.includes('account') || lowerQuery.includes('profile')) {
    return sources.account;
  }
  
  return sources.default;
}

export interface AISource {
  id: string;
  title: string;
  icon: string;
  count?: number;
}