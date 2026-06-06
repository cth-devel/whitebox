export const CONTACT = {
  mainPhone:   "0533989986",
  salesPhone:  "0570204637",
  salesName:   "Asif Asharaf",
  salesTitle:  "Sales Manager",
  email:       "whiteboxaircargo@gmail.com",
  whatsapp:    "966533989986", // without +, used in wa.me links
  branches: [
    { id: "tuwaiq" as const, label: "Tuwaiq Branch" },
    { id: "laban"  as const, label: "Laban Branch"  },
  ],
  mapEmbeds: {
    tuwaiq: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.3037382398993!2d46.5677502!3d24.5787117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f196a5a9293bd%3A0x1e84197431aac9d!2zV2hpdGUgQm94IEV4cHJlc3Mg2YTZhNi02K3ZhiDYp9mE2LNYsdmK2Lk!5e0!3m2!1sen!2sin!4v1770466924851!5m2!1sen!2sin",
    laban:  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.749268202912!2d46.5645147!3d24.632325199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f1f0079acc7bd%3A0xdd5e9e4d33b82c72!2zV2hpdGUgQm94IEV4cHJlc3Mg2YTZhNi02K3ZhiDYp9mE2LNYsdmK2Lk!5e0!3m2!1sen!2sin!4v1770466974514!5m2!1sen!2sin",
  },
} as const;
