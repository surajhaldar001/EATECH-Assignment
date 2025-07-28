// src/data/dummyData.js
const dummyData = [
  {
    type: "Contact",
    fields: [
      { name: "Company",      values: ["Alpha","Beta","Gamma","Delta"] },
      { name: "Industry",     values: ["Software","Finance","Healthcare","Education"] },
      { name: "Job Title",    values: ["Manager","Developer","Analyst","Consultant"] },
      { name: "Language",     values: ["English","Spanish","French","German"] }
    ]
  },
  {
    type: "Company",
    fields: [
      { name: "Location",     values: ["New York","London","Tokyo","Sydney"] },
      { name: "Size",         values: ["Small","Medium","Large","Enterprise"] },
      { name: "Sector",       values: ["Tech","Retail","Manufacturing","Services"] },
      { name: "Revenue",      values: ["<1M","1-10M","10-100M",">100M"] }
    ]
  },
  {
    type: "Opportunity",
    fields: [
      { name: "Stage",        values: ["Prospect","Qualification","Proposal","Closed"] },
      { name: "Probability",  values: ["10%","25%","50%","75%"] },
      { name: "Value",        values: ["10k","50k","100k","500k"] },
      { name: "Source",       values: ["Referral","Web","Event","Partner"] }
    ]
  }
];

export default dummyData;
