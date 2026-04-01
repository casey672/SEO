export interface EstatePrompt {
  id: string;
  question: string;
  bullets: string[];
  cta: string;
}

export const ESTATE_PROMPTS: EstatePrompt[] = [
  {
    id: "living-trust",
    question: "What is a living trust\nand do I need one?",
    bullets: [
      "A legal arrangement to manage your assets",
      "Transfers property without probate",
      "Keeps your affairs private",
      "Provides control during your lifetime",
    ],
    cta: "Ask us if a living trust is right for you.",
  },
  {
    id: "estate-planning-cost",
    question: "How much does estate\nplanning cost in Texas?",
    bullets: [
      "Simple will: $300 – $1,000",
      "Living trust package: $1,500 – $3,000",
      "Cost depends on complexity of your estate",
      "Protecting your family is always worth it",
    ],
    cta: "Free consultation — know your options.",
  },
  {
    id: "die-without-will",
    question: "What happens if I die\nwithout a will in Texas?",
    bullets: [
      "Texas intestacy laws decide who inherits",
      "The state may not honor your wishes",
      "Courts appoint a guardian for minor children",
      "The process can be slow and costly",
    ],
    cta: "A will gives you the final say.",
  },
  {
    id: "power-of-attorney",
    question: "What is a\npower of attorney?",
    bullets: [
      "Legal authority to act on your behalf",
      "Covers financial or healthcare decisions",
      "Takes effect when you specify",
      "Essential in any complete estate plan",
    ],
    cta: "Protect yourself — designate an agent today.",
  },
  {
    id: "write-own-will",
    question: "Can I write my\nown will in Texas?",
    bullets: [
      "Texas allows handwritten (holographic) wills",
      "Must be entirely in your own handwriting",
      "No witnesses required for holographic wills",
      "Attorney-drafted wills are safer & more complete",
    ],
    cta: "Get it done right the first time.",
  },
  {
    id: "avoid-probate",
    question: "How do I avoid\nprobate in Texas?",
    bullets: [
      "Create a revocable living trust",
      "Use a Lady Bird deed for real estate",
      "Add beneficiary designations to accounts",
      "Consider joint ownership with right of survivorship",
    ],
    cta: "Keep assets out of probate court.",
  },
  {
    id: "lady-bird-deed",
    question: "What is a\nLady Bird deed?",
    bullets: [
      "An enhanced life estate deed unique to Texas",
      "Transfers property to heirs at your death",
      "You retain full control during your lifetime",
      "Avoids probate for real estate — simply & legally",
    ],
    cta: "Protect your home for your family.",
  },
  {
    id: "update-estate-plan",
    question: "When should I update\nmy estate plan?",
    bullets: [
      "After marriage, divorce, or remarriage",
      "When a child or grandchild is born",
      "After a major change in assets or debts",
      "At least every 3–5 years as a rule of thumb",
    ],
    cta: "Life changes — your plan should too.",
  },
  {
    id: "will-vs-trust",
    question: "What is the difference\nbetween a will and a trust?",
    bullets: [
      "A will takes effect only at death",
      "A trust can be active during your lifetime",
      "Trusts avoid probate; wills do not",
      "Both control how your assets are distributed",
    ],
    cta: "We'll help you choose the right tool.",
  },
  {
    id: "young-and-healthy",
    question: "Do I need an estate plan\nif I'm young and healthy?",
    bullets: [
      "Accidents and illness can happen at any age",
      "Designate a guardian for minor children now",
      "Avoid family conflict with clear instructions",
      "Start simple — update as your life grows",
    ],
    cta: "It's never too early to plan ahead.",
  },
];
