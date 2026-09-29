// Comprehensive Tour Steps Definition for All 7 Role-Based Pages
// Verbatim alignment with SIH 2026 PS 239 Prompt Specification
// Bilingual: English + हिन्दी with Pro-Tips and Data-Tour Selectors

export const PAGE_TOURS = {
  // 1. Student Dashboard (first login)
  student_dashboard: {
    pageTitle: { en: 'Student Dashboard', hi: 'छात्र डैशबोर्ड' },
    steps: [
      {
        target: '[data-tour="mission-checklist"]',
        titleEn: 'Mission Checklist',
        titleHi: 'मिशन चेकलिस्ट',
        descEn: 'This is your personal to-do list. It shows exactly what to do next. Follow the steps in order.',
        descHi: 'यह आपकी व्यक्तिगत कार्य सूची है। यह दर्शाती है कि आगे क्या करना है। चरणों का क्रमवार पालन करें।',
        tipEn: 'Steps turn green automatically as each milestone is confirmed on the cryptographic audit chain.',
        tipHi: 'ऑडिट श्रृंखला पर सत्यापन पूरा होते ही प्रत्येक चरण स्वचालित रूप से हरा हो जाता है।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="check-eligibility"]',
        titleEn: 'Check Eligibility',
        titleHi: 'पात्रता जांचें',
        descEn: 'Start here — answer a few questions to see which scholarships you qualify for.',
        descHi: 'यहां से शुरू करें — कुछ प्रश्नों के उत्तर दें और देखें कि आप किन छात्रवृत्तियों के पात्र हैं।',
        tipEn: 'Evaluates statutory criteria across all 5 MoTA scholarship schemes deterministically.',
        tipHi: 'मंत्रालय की सभी 5 छात्रवृत्ति योजनाओं में वैधानिक पात्रता का सटीक मूल्यांकन करता है।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="notifications-bell"]',
        titleEn: 'Notifications Bell',
        titleHi: 'अधिसूचना घंटी',
        descEn: 'All official updates about your application appear here. Nothing else — no spam.',
        descHi: 'आपके आवेदन के बारे में सभी आधिकारिक अपडेट यहां दिखाई देंगे। कुछ और नहीं — कोई स्पैम नहीं।',
        tipEn: 'Dispatched simultaneously via NIC SMS gateway adapter and in-portal alert feed.',
        tipHi: 'एनआईसी एसएमएस गेटवे और पोर्टल अलर्ट फीड के माध्यम से एक साथ प्रेषित।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="language-toggle"]',
        titleEn: 'Language Toggle',
        titleHi: 'भाषा परिवर्तन',
        descEn: 'Switch between English and हिन्दी anytime. Everything translates.',
        descHi: 'कभी भी अंग्रेजी और हिन्दी के बीच स्विच करें। सब कुछ अनुवादित होता है।',
        tipEn: 'All schemes, notifications, and rule criteria are fully localized in Hindi.',
        tipHi: 'सभी योजनाएं, अधिसूचनाएं और नियम मानदंड पूरी तरह से हिंदी में उपलब्ध हैं।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="profile-menu"]',
        titleEn: 'Profile Menu',
        titleHi: 'प्रोफ़ाइल मेनू',
        descEn: 'Your account settings and documents live here.',
        descHi: 'आपकी खाता सेटिंग्स और दस्तावेज यहां उपलब्ध हैं।',
        tipEn: 'Manage your verified ST Article 342 profile and toggle 2G Data Saver mode.',
        tipHi: 'अपनी सत्यापित एसटी प्रोफाइल प्रबंधित करें और 2जी डेटा सेवर मोड चालू करें।',
        placement: 'bottom'
      }
    ]
  },

  // 2. Student Eligibility Checker
  student_eligibility: {
    pageTitle: { en: 'Statutory Eligibility Checker', hi: 'वैधानिक पात्रता जांचकर्ता' },
    steps: [
      {
        target: '[data-tour="eligibility-progress"]',
        titleEn: 'Progress Bar',
        titleHi: 'प्रगति बार',
        descEn: 'A few questions — about 2 minutes. Answers are saved automatically.',
        descHi: 'कुछ प्रश्न — लगभग 2 मिनट। उत्तर स्वतः सहेजे जाते हैं।',
        tipEn: 'All evaluations run deterministically against active database policy rules.',
        tipHi: 'सभी मूल्यांकन सक्रिय डेटाबेस नीति नियमों के विरुद्ध निष्पादित होते हैं।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="eligibility-form"]',
        titleEn: 'Questionnaire',
        titleHi: 'प्रश्नावली',
        descEn: 'Answer honestly as per your certificates. You can change answers before submitting.',
        descHi: 'अपने प्रमाण पत्रों के अनुसार ईमानदारी से उत्तर दें। जमा करने से पहले आप उत्तर बदल सकते हैं।',
        tipEn: 'Annual family income must match your official FY 2026-27 Revenue Authority certificate.',
        tipHi: 'वार्षिक पारिवारिक आय आपके वित्तीय वर्ष 2026-27 के राजस्व प्रमाण पत्र से मेल खानी चाहिए।',
        placement: 'top'
      },
      {
        target: '[data-tour="scheme-matches"]',
        titleEn: 'Results List',
        titleHi: 'परिणाम सूची',
        descEn: 'Green = you qualify. Tap "Why?" on any result to see the exact rule.',
        descHi: 'हरा = आप पात्र हैं। सटीक नियम देखने के लिए किसी भी परिणाम पर टैप करें।',
        tipEn: 'Highlights affirmative statutory quotas for PVTG communities and Divyangjan applicants.',
        tipHi: 'पीवीटीजी समुदायों और दिव्यांगजन आवेदकों के लिए वैधानिक आरक्षण लाभ को रेखांकित करता है।',
        placement: 'top'
      },
      {
        target: '[data-tour="start-application"]',
        titleEn: 'Start Application',
        titleHi: 'आवेदन शुरू करें',
        descEn: 'Pick one scheme and begin. You can save and come back anytime.',
        descHi: 'एक योजना चुनें और शुरू करें। आप कभी भी सहेज सकते हैं और वापस आ सकते हैं।',
        tipEn: 'Ports your verified answers directly into the multi-step application wizard.',
        tipHi: 'आपके सत्यापित उत्तरों को सीधे बहु-चरणीय आवेदन विजार्ड में स्थानांतरित करता है।',
        placement: 'top'
      }
    ]
  },

  // 3. Student Application Form (Wizard)
  student_application_wizard: {
    pageTitle: { en: 'Application Wizard', hi: 'आवेदन विजार्ड' },
    steps: [
      {
        target: '[data-tour="wizard-stepper"]',
        titleEn: 'Multi-Step Progress',
        titleHi: 'चरण प्रगति',
        descEn: 'Follow the 4-phase application lifecycle: Personal Profile, Academic Records, Certificate Uploads, and Final Review.',
        descHi: '4-चरणीय प्रक्रिया: व्यक्तिगत विवरण, शैक्षणिक रिकॉर्ड, प्रमाण पत्र अपलोड और अंतिम समीक्षा।',
        tipEn: 'Your progress is autosaved to local state continuously to protect against sudden network disconnections.',
        tipHi: 'अचानक नेटवर्क कटने से सुरक्षा के लिए आपकी प्रगति लगातार ऑटोसेव होती रहती है।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="wizard-fields"]',
        titleEn: 'Application Fields',
        titleHi: 'आवेदन प्रपत्र फ़ील्ड',
        descEn: 'Fill this section. Fields marked * are required. Everything autosaves — the "Saved" indicator shows the last save time.',
        descHi: 'इस अनुभाग को भरें। * वाले फ़ील्ड अनिवार्य हैं। सब कुछ स्वतः सहेजता है — "सहेजा गया" संकेतक अंतिम समय दिखाता है।',
        tipEn: 'Brand-new citizen workspaces start completely blank without pre-filled mock data.',
        tipHi: 'नए नागरिक का फॉर्म बिना किसी पुराने डेटा के पूरी तरह खाली शुरू होता है।',
        placement: 'top'
      },
      {
        target: '[data-tour="wizard-doc-slots"]',
        titleEn: 'Document Upload Slots',
        titleHi: 'दस्तावेज अपलोड स्लॉट',
        descEn: 'Upload a clear photo or PDF of your real certificate. The AI will read it — blurry or wrong documents will be flagged, and you can re-upload before submitting.',
        descHi: 'अपने असली प्रमाण पत्र की स्पष्ट फोटो या पीडीएफ अपलोड करें। एआई इसे पढ़ेगा — अस्पष्ट या गलत दस्तावेज फ़्लैग किए जाएंगे, और आप जमा करने से पहले पुनः अपलोड कर सकते हैं।',
        tipEn: 'VidyaSetu uses client & server OCR to extract issuing dates and compute Jaro-Winkler name similarity scores.',
        tipHi: 'विद्यासेतु नाम मिलान और निर्गमन तिथि जांचने के लिए वास्तविक ओसीआर तकनीक का उपयोग करता है।',
        placement: 'top'
      },
      {
        target: '[data-tour="wizard-submit"]',
        titleEn: 'Cryptographic Submit',
        titleHi: 'सुरक्षित अंतिम जमा',
        descEn: 'Submit only when every item is green. After submitting you cannot edit — but you can fix deficiencies if officers ask.',
        descHi: 'सभी आइटम हरे होने पर ही जमा करें। जमा करने के बाद आप संपादित नहीं कर सकते — लेकिन अधिकारी के कहने पर आप कमियां ठीक कर सकते हैं।',
        tipEn: 'Locks your application onto the tamper-evident SHA-256 audit chain with a verifiable QR code.',
        tipHi: 'ऑफ़लाइन सत्यापन योग्य क्यूआर कोड युक्त आधिकारिक पावती पर्ची उत्पन्न करता है।',
        placement: 'top'
      }
    ]
  },

  // 4. Student Document Upload & Deficiency Page
  student_documents: {
    pageTitle: { en: 'Document Vault & Deficiency Desk', hi: 'दस्तावेज भंडार एवं कमी निवारण' },
    steps: [
      {
        target: '[data-tour="docs-checklist"]',
        titleEn: 'Required Checklist',
        titleHi: 'आवश्यक चेकलिस्ट',
        descEn: 'These documents are required for your scheme. The list comes from official scheme rules.',
        descHi: 'आपकी योजना के लिए ये दस्तावेज आवश्यक हैं। यह सूची आधिकारिक योजना नियमों से आती है।',
        tipEn: 'Green tags indicate verified certificates; red tags highlight deficiencies requiring action.',
        tipHi: 'हरे टैग सत्यापित प्रमाण पत्र दर्शाते हैं; लाल टैग आवश्यक सुधार की कमी दर्शाते हैं।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="deficiency-action"]',
        titleEn: 'Upload Dropzone',
        titleHi: 'अपलोड ड्रॉपज़ोन',
        descEn: 'Drag a file here or tap to browse. Max size shown. Photos work fine.',
        descHi: 'फ़ाइल को यहाँ खींचें या ब्राउज़ करने के लिए टैप करें। अधिकतम आकार दिखाया गया है। तस्वीरें भी काम करती हैं।',
        tipEn: 'VidyaSetu guarantees queue seniority preservation: your application retains its original place in the officer queue.',
        tipHi: 'विद्यासेतु वरिष्ठता संरक्षण की गारंटी देता है: आपका आवेदन कतार में अपना मूल स्थान बनाए रखता है।',
        placement: 'top'
      },
      {
        target: '[data-tour="download-slip"]',
        titleEn: 'AI Scan Status & Official Slips',
        titleHi: 'एआई स्कैन स्थिति एवं आधिकारिक पर्चियां',
        descEn: 'Our AI reads the document and fills what it can. You confirm or correct it — your data, your control.',
        descHi: 'हमारा एआई दस्तावेज पढ़ता है और जो हो सके भरता है। आप इसकी पुष्टि या सुधार करते हैं — आपका डेटा, आपका नियंत्रण।',
        tipEn: 'Made a mistake? Re-upload as many times as you want before submitting.',
        tipHi: 'कोई गलती हो गई? जमा करने से पहले जितनी बार चाहें उतनी बार पुनः अपलोड करें।',
        placement: 'top'
      }
    ]
  },

  // 5. Student Status Tracker
  student_tracker: {
    pageTitle: { en: 'Application Pipeline Tracker', hi: 'आवेदन प्रगति ट्रैकर' },
    steps: [
      {
        target: '[data-tour="tracker-timeline"]',
        titleEn: 'Live Stage Pipeline',
        titleHi: 'लाइव स्टेज पाइपलाइन',
        descEn: "Your application's live journey. Each stage updates in real time.",
        descHi: 'आपके आवेदन की वास्तविक यात्रा। प्रत्येक चरण रीयल-टाइम में अपडेट होता है।',
        tipEn: 'Eliminates manual inquiry visits: every officer transition is logged and visible in real time.',
        tipHi: 'दफ्तरों के चक्कर लगाने की जरूरत नहीं: प्रत्येक अधिकारी निर्णय रीयल-टाइम में दिखाई देता है।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="seniority-badge"]',
        titleEn: 'Current Stage & Seniority',
        titleHi: 'वर्तमान चरण एवं वरिष्ठता',
        descEn: "This is where your application is right now. Tap 'What happens next?' below.",
        descHi: "आपका आवेदन अभी इस स्थिति में है। नीचे 'आगे क्या होगा?' पर टैप करें।",
        tipEn: 'Even if a deficiency was issued, re-uploading within SLA preserves your ranking seniority.',
        tipHi: 'कमी सुधार के बाद भी समयसीमा में दस्तावेज देने पर आपकी मेरिट कतार नहीं बदलती।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="disbursal-status"]',
        titleEn: 'Deficiency & Disbursal Notice',
        titleHi: 'कमी एवं वितरण सूचना',
        descEn: 'An officer needs a corrected document. Open it, see exactly what\'s wrong, fix and re-upload before the deadline.',
        descHi: 'अधिकारी को सुधारात्मक दस्तावेज की आवश्यकता है। इसे खोलें, देखें कि क्या गलत है, समयसीमा से पहले ठीक करें और पुनः अपलोड करें।',
        tipEn: 'Shows Bank UTR numbers, account validation status, and QPR compliance milestones.',
        tipHi: 'बैंक यूटीआर नंबर, खाता सत्यापन स्थिति और त्रैमासिक प्रगति रिपोर्ट स्थिति प्रदर्शित करता है।',
        placement: 'top'
      }
    ]
  },

  // 6. Officer Work Queue
  officer_queue: {
    pageTitle: { en: 'Officer Scrutiny Desk', hi: 'अधिकारी संवीक्षा पटल' },
    steps: [
      {
        target: '[data-tour="officer-filters"]',
        titleEn: 'Queue Filters',
        titleHi: 'कतार फ़िल्टर',
        descEn: 'Filter applications by scheme, stage, or risk.',
        descHi: 'योजना, चरण या जोखिम के आधार पर आवेदनों को फ़िल्टर करें।',
        tipEn: 'PVTG scholars and ST female applicants are prioritized in accordance with statutory guidelines.',
        tipHi: 'पीवीटीजी छात्रों और एसटी महिला आवेदकों को वैधानिक दिशानिर्देशों के अनुसार प्राथमिकता दी जाती है।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="officer-table"]',
        titleEn: 'Risk Flag & Docket Table',
        titleHi: 'जोखिम ध्वज एवं तालिका',
        descEn: 'HIGH means possible fraud signals. Open to see the evidence before deciding.',
        descHi: 'HIGH का अर्थ है संभावित धोखाधड़ी संकेत। निर्णय लेने से पहले साक्ष्य देखने के लिए खोलें।',
        tipEn: 'Click any row or document badge to open high-resolution side-by-side split comparison.',
        tipHi: 'विस्तृत साइड-बाय-साइड तुलना देखने के लिए किसी भी पंक्ति या दस्तावेज पर क्लिक करें।',
        placement: 'top'
      },
      {
        target: '[data-tour="officer-actions"]',
        titleEn: 'AI Findings & Human Decisions',
        titleHi: 'एआई निष्कर्ष एवं मानवीय निर्णय',
        descEn: "AI's analysis with evidence and confidence. You can accept or override — overriding requires a written reason and is recorded in the audit trail. Approve or Reject with a mandatory comment. Every decision is logged permanently.",
        descHi: 'साक्ष्य और विश्वास के साथ एआई का विश्लेषण। आप स्वीकार या ओवरराइड कर सकते हैं — ओवरराइड करने के लिए लिखित कारण की आवश्यकता होती है और ऑडिट ट्रेल में दर्ज किया जाता है। अनिवार्य टिप्पणी के साथ स्वीकृत या अस्वीकृत करें। प्रत्येक निर्णय स्थायी रूप से लॉग किया जाता है।',
        tipEn: 'Principle 2: AI only recommends; humans decide. Every approval or override enforces a mandatory logged reason.',
        tipHi: 'सिद्धांत 2: एआई केवल सुझाव देता है; अधिकारी निर्णय लेते हैं। प्रत्येक निर्णय हेतु कारण अनिवार्य है।',
        placement: 'left'
      }
    ]
  },

  // 7. Admin Scheme Studio
  admin_studio: {
    pageTitle: { en: 'Scheme Policy Configuration Studio', hi: 'योजना नीति विन्यास स्टूडियो' },
    steps: [
      {
        target: '[data-tour="studio-schemes"]',
        titleEn: 'Rules Table',
        titleHi: 'नियम तालिका',
        descEn: 'These rules drive eligibility, checklists, and deadlines — for every scheme.',
        descHi: 'ये नियम प्रत्येक योजना के लिए पात्रता, चेकलिस्ट और समयसीमा निर्धारित करते हैं।',
        tipEn: 'Zero eligibility rules are hardcoded in application code; all logic is dynamically fetched from versioned database tables.',
        tipHi: 'कोई भी नियम कोड में हार्डकोड नहीं है; सभी नियम डेटाबेस से गतिशील रूप से निष्पादित होते हैं।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="studio-criteria"]',
        titleEn: 'Edit Rule',
        titleHi: 'नियम संपादित करें',
        descEn: 'Change a value, add a change note, publish. The new version takes effect immediately; old versions stay in history.',
        descHi: 'मान बदलें, परिवर्तन नोट जोड़ें, प्रकाशित करें। नया संस्करण तुरंत प्रभावी होता है; पुराने संस्करण इतिहास में रहते हैं।',
        tipEn: 'Simulate policy impacts over 10,000 synthetic tribal scholar records before publishing to production.',
        tipHi: 'उत्पादन में लागू करने से पहले 10,000 रिकॉर्ड पर नीति प्रभाव का सिमुलेशन चलाएं।',
        placement: 'top'
      },
      {
        target: '[data-tour="studio-publish"]',
        titleEn: 'Simulate & Publish',
        titleHi: 'सिम्युलेट एवं प्रकाशित करें',
        descEn: 'Test what a rule change would do — clearly labeled as estimates on synthetic data.',
        descHi: 'परीक्षण करें कि नियम परिवर्तन का क्या प्रभाव होगा — सिंथेटिक डेटा पर अनुमान के रूप में स्पष्ट रूप से लेबल किया गया है।',
        tipEn: 'Existing in-flight applications remain grandfathered under the version they applied under.',
        tipHi: 'पहले से जमा किए गए आवेदन उसी नियम संस्करण के तहत संसाधित होते हैं जिसके तहत वे जमा हुए थे।',
        placement: 'top'
      }
    ]
  }
};
