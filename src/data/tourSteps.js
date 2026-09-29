// Comprehensive Tour Steps Definition for All 7 Role-Based Pages
// Bilingual: English + हिन्दी with Pro-Tips and Data-Tour Selectors

export const PAGE_TOURS = {
  // 1. Student Dashboard (Overview)
  student_dashboard: {
    pageTitle: { en: 'Student Dashboard', hi: 'छात्र डैशबोर्ड' },
    steps: [
      {
        target: '[data-tour="mission-checklist"]',
        titleEn: 'Scholarship Mission Checklist',
        titleHi: 'छात्रवृत्ति मिशन चेकलिस्ट',
        descEn: 'Track your real-time 6-step journey from DigiLocker KYC to PFMS DBT scholarship disbursal.',
        descHi: 'डिजीलॉकर केवाईसी से लेकर पीएफएमएस डीबीटी छात्रवृत्ति वितरण तक अपनी 6-चरणीय वास्तविक यात्रा को ट्रैक करें।',
        tipEn: 'Steps turn green automatically as each milestone is confirmed on the cryptographic audit chain.',
        tipHi: 'ऑडिट श्रृंखला पर सत्यापन पूरा होते ही प्रत्येक चरण स्वचालित रूप से हरा हो जाता है।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="quick-actions"]',
        titleEn: 'Quick Action Hub',
        titleHi: 'त्वरित कार्य केंद्र',
        descEn: 'Access one-click verification, check statutory eligibility across all 5 MoTA schemes, and download official slips.',
        descHi: 'एक क्लिक में सत्यापन, सभी 5 योजनाओं के लिए पात्रता जांच और आधिकारिक पावती पर्ची डाउनलोड करें।',
        tipEn: 'Grievance petitions submitted here are backed by a mandatory 7-day citizen redressal SLA.',
        tipHi: 'यहां दर्ज की गई शिकायतें अनिवार्य 7-दिवसीय नागरिक समाधान गारंटी के अंतर्गत आती हैं।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="language-toggle"]',
        titleEn: 'Bilingual Language Switch',
        titleHi: 'द्विभाषी भाषा परिवर्तन',
        descEn: 'Seamlessly toggle between English and हिन्दी anytime without losing your active form progress.',
        descHi: 'फॉर्म प्रगति खोए बिना कभी भी अंग्रेजी और हिन्दी के बीच सहजता से स्विच करें।',
        tipEn: 'All schemes, notifications, and rule criteria are fully localized in Hindi.',
        tipHi: 'सभी योजनाएं, अधिसूचनाएं और नियम मानदंड पूरी तरह से हिंदी में उपलब्ध हैं।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="notifications-bell"]',
        titleEn: 'Official MoTA Notifications',
        titleHi: 'मंत्रालय आधिकारिक सूचनाएं',
        descEn: 'Receive real-time alerts for document verification, deficiency notices, and DBT sanction orders.',
        descHi: 'दस्तावेज सत्यापन, कमी सूचना और डीबीटी स्वीकृति आदेशों के लिए रीयल-टाइम अलर्ट प्राप्त करें।',
        tipEn: 'Dispatched simultaneously via NIC SMS gateway adapter and in-portal alert feed.',
        tipHi: 'एनआईसी एसएमएस गेटवे और पोर्टल अलर्ट फीड के माध्यम से एक साथ प्रेषित।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="profile-menu"]',
        titleEn: 'Citizen Identity & 2G Mode',
        titleHi: 'नागरिक पहचान एवं 2G मोड',
        descEn: 'Manage your verified ST Article 342 profile, toggle 2G Data Saver mode, and view security audit logs.',
        descHi: 'अपनी सत्यापित एसटी प्रोफाइल प्रबंधित करें, 2जी डेटा सेवर मोड चालू करें और सुरक्षा ऑडिट देखें।',
        tipEn: '2G Data Saver mode optimizes bandwidth for scholars in remote tribal habitations.',
        tipHi: '2जी डेटा सेवर मोड सुदूर जनजातीय क्षेत्रों के छात्रों के लिए नेटवर्क डेटा बचाता है।',
        placement: 'bottom'
      }
    ]
  },

  // 2. Student Statutory Eligibility Matcher
  student_eligibility: {
    pageTitle: { en: 'Statutory Eligibility Checker', hi: 'वैधानिक पात्रता जांचकर्ता' },
    steps: [
      {
        target: '[data-tour="eligibility-form"]',
        titleEn: 'Statutory Criteria Questionnaire',
        titleHi: 'पात्रता प्रश्नावली',
        descEn: 'Enter your academic degree, marks percentage, annual family income, and ST community details.',
        descHi: 'अपनी शैक्षणिक डिग्री, अंक प्रतिशत, वार्षिक पारिवारिक आय और एसटी समुदाय विवरण दर्ज करें।',
        tipEn: 'All evaluations run deterministically against active database policy rules (versioned in registry).',
        tipHi: 'सभी मूल्यांकन सक्रिय डेटाबेस नीति नियमों के विरुद्ध निष्पादित होते हैं।',
        placement: 'top'
      },
      {
        target: '[data-tour="eligibility-submit"]',
        titleEn: 'Run Deterministic Evaluation',
        titleHi: 'पात्रता मूल्यांकन चलाएं',
        descEn: 'Checks your inputs across Pre-Matric, Post-Matric, Top Class, NFST, and NOS simultaneously.',
        descHi: 'प्री-मैट्रिक, पोस्ट-मैट्रिक, टॉप क्लास, एनएफएसटी और एनओएस में एक साथ पात्रता जांचता है।',
        tipEn: 'Highlights affirmative statutory quotas for PVTG communities and Divyangjan applicants.',
        tipHi: 'पीवीटीजी समुदायों और दिव्यांगजन आवेदकों के लिए वैधानिक आरक्षण लाभ को रेखांकित करता है।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="scheme-matches"]',
        titleEn: 'Matching Scheme Recommendations',
        titleHi: 'पात्र योजना अनुशंसाएं',
        descEn: 'Review matched schemes with versioned rule citations, slot quotas, and monthly stipend amounts.',
        descHi: 'नियम संदर्भ, स्लॉट संख्या और मासिक वजीफा राशि के साथ पात्र योजनाओं की समीक्षा करें।',
        tipEn: 'Click "Apply Now" on any matched scheme to port your verified answers directly into the application wizard.',
        tipHi: 'किसी भी पात्र योजना पर "आवेदन करें" क्लिक करके सीधे आवेदन विजार्ड में आगे बढ़ें।',
        placement: 'top'
      }
    ]
  },

  // 3. Student Application Wizard
  student_application_wizard: {
    pageTitle: { en: 'Application Wizard', hi: 'आवेदन विजार्ड' },
    steps: [
      {
        target: '[data-tour="wizard-stepper"]',
        titleEn: 'Multi-Step Progress Indicator',
        titleHi: 'चरण प्रगति सूचक',
        descEn: 'Follow the 4-phase application lifecycle: Personal Profile, Academic Records, Certificate Uploads, and Final Review.',
        descHi: '4-चरणीय प्रक्रिया: व्यक्तिगत विवरण, शैक्षणिक रिकॉर्ड, प्रमाण पत्र अपलोड और अंतिम समीक्षा।',
        tipEn: 'Your progress is autosaved to local state continuously to protect against sudden network disconnections.',
        tipHi: 'अचानक नेटवर्क कटने से सुरक्षा के लिए आपकी प्रगति लगातार ऑटोसेव होती रहती है।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="wizard-fields"]',
        titleEn: 'Statutory Form Fields',
        titleHi: 'आवेदन प्रपत्र फ़ील्ड',
        descEn: 'Complete all required statutory details. Brand-new citizen workspaces start completely blank without pre-filled mock data.',
        descHi: 'सभी आवश्यक विवरण भरें। नए नागरिक का फॉर्म बिना किसी पुराने डेटा के पूरी तरह खाली शुरू होता है।',
        tipEn: 'Annual family income must match your official FY 2026-27 Revenue Authority certificate.',
        tipHi: 'वार्षिक पारिवारिक आय आपके वित्तीय वर्ष 2026-27 के राजस्व प्रमाण पत्र से मेल खानी चाहिए।',
        placement: 'top'
      },
      {
        target: '[data-tour="wizard-doc-slots"]',
        titleEn: 'Document Upload & Real OCR Scan',
        titleHi: 'दस्तावेज अपलोड एवं ओसीआर स्कैन',
        descEn: 'Upload ST Caste Certificate (Art. 342), Income Certificate, and Academic Degree transcripts.',
        descHi: 'एसटी जाति प्रमाण पत्र (अनुच्छेद 342), आय प्रमाण पत्र और शैक्षणिक अंकपत्र अपलोड करें।',
        tipEn: 'VidyaSetu uses client & server OCR to extract issuing dates and compute Jaro-Winkler name similarity scores.',
        tipHi: 'विद्यासेतु नाम मिलान और निर्गमन तिथि जांचने के लिए वास्तविक ओसीआर तकनीक का उपयोग करता है।',
        placement: 'top'
      },
      {
        target: '[data-tour="wizard-submit"]',
        titleEn: 'Cryptographic Submission',
        titleHi: 'सुरक्षित अंतिम जमा',
        descEn: 'Sign and submit your completed application to lock it onto the tamper-evident SHA-256 audit chain.',
        descHi: 'अपने आवेदन को सुरक्षित रूप से जमा करें और इसे अहस्तांतरणीय ऑडिट श्रृंखला में दर्ज करें।',
        tipEn: 'Generates a signed MoTA Acknowledgment Slip featuring an offline-verifiable QR code.',
        tipHi: 'ऑफ़लाइन सत्यापन योग्य क्यूआर कोड युक्त आधिकारिक पावती पर्ची उत्पन्न करता है।',
        placement: 'top'
      }
    ]
  },

  // 4. Student Documents & Deficiency Desk
  student_documents: {
    pageTitle: { en: 'Document Vault & Deficiency Desk', hi: 'दस्तावेज भंडार एवं कमी निवारण' },
    steps: [
      {
        target: '[data-tour="docs-checklist"]',
        titleEn: 'Document Verification Repository',
        titleHi: 'दस्तावेज सत्यापन भंडार',
        descEn: 'Review the validation status of each uploaded certificate with extracted authority, dates, and OCR scores.',
        descHi: 'जारीकर्ता प्राधिकारी, तिथि और ओसीआर स्कोर के साथ प्रत्येक प्रमाण पत्र की स्थिति देखें।',
        tipEn: 'Green tags indicate verified certificates; red tags highlight deficiencies requiring action.',
        tipHi: 'हरे टैग सत्यापित प्रमाण पत्र दर्शाते हैं; लाल टैग आवश्यक सुधार की कमी दर्शाते हैं।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="deficiency-action"]',
        titleEn: '14-Day Deficiency Resolution Desk',
        titleHi: '14-दिवसीय कमी समाधान पटल',
        descEn: 'Upload replacement documents for any flagged deficiencies before the statutory 14-day SLA deadline expires.',
        descHi: '14 दिनों की वैधानिक समयसीमा समाप्त होने से पहले सुधारात्मक नया दस्तावेज अपलोड करें।',
        tipEn: 'VidyaSetu guarantees queue seniority preservation: your application retains its original place in the officer queue.',
        tipHi: 'विद्यासेतु वरिष्ठता संरक्षण की गारंटी देता है: आपका आवेदन कतार में अपना मूल स्थान बनाए रखता है।',
        placement: 'top'
      },
      {
        target: '[data-tour="download-slip"]',
        titleEn: 'Official Statutory Slips',
        titleHi: 'आधिकारिक वैधानिक पर्चियां',
        descEn: 'Download printable PDF/HTML slips for Acknowledgment, Deficiency Resolution, or Award Sanctions.',
        descHi: 'पावती, कमी निवारण, या छात्रवृत्ति स्वीकृति के लिए प्रिंट योग्य आधिकारिक पर्चियां डाउनलोड करें।',
        tipEn: 'Each slip includes cryptographic SHA-256 block hashes and QR codes for offline field verification.',
        tipHi: 'प्रत्येक पर्ची में ऑफ़लाइन सत्यापन हेतु SHA-256 ब्लॉक हैश और क्यूआर कोड शामिल हैं।',
        placement: 'top'
      }
    ]
  },

  // 5. Student Application Pipeline Tracker
  student_tracker: {
    pageTitle: { en: 'Application Pipeline Tracker', hi: 'आवेदन प्रगति ट्रैकर' },
    steps: [
      {
        target: '[data-tour="tracker-timeline"]',
        titleEn: 'Multi-Level Verification Timeline',
        titleHi: 'बहु-स्तरीय सत्यापन समयरेखा',
        descEn: 'Follow your application progress through AI Pre-Scrutiny, Nodal Verification, Directorate Scrutiny, and Award.',
        descHi: 'एआई पूर्व-संवीक्षा, नोडल सत्यापन, निदेशालय संवीक्षा और स्वीकृति तक अपने आवेदन की प्रगति देखें।',
        tipEn: 'Eliminates manual inquiry visits: every officer transition is logged and visible in real time.',
        tipHi: 'दफ्तरों के चक्कर लगाने की जरूरत नहीं: प्रत्येक अधिकारी निर्णय रीयल-टाइम में दिखाई देता है।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="seniority-badge"]',
        titleEn: 'Statutory Queue Seniority',
        titleHi: 'वैधानिक कतार वरिष्ठता',
        descEn: 'Confirms your original application seniority date is protected under MoTA Operational Guidelines Section 4.1.',
        descHi: 'पुष्टि करता है कि आपकी मूल आवेदन वरिष्ठता तिथि मंत्रालय के दिशानिर्देशों के तहत सुरक्षित है।',
        tipEn: 'Even if a deficiency was issued, re-uploading within SLA preserves your ranking seniority.',
        tipHi: 'कमी सुधार के बाद भी समयसीमा में दस्तावेज देने पर आपकी मेरिट कतार नहीं बदलती।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="disbursal-status"]',
        titleEn: 'PFMS Direct Benefit Transfer (DBT)',
        titleHi: 'पीएफएमएस प्रत्यक्ष लाभ अंतरण (डीबीटी)',
        descEn: 'Monitor electronic Fund Transfer Orders (e-FTO) processed directly via Aadhaar Payment Bridge.',
        descHi: 'आधार पेमेंट ब्रिज के माध्यम से सीधे बैंक खाते में भेजे गए इलेक्ट्रॉनिक फंड ट्रांसफर (e-FTO) की निगरानी करें।',
        tipEn: 'Shows Bank UTR numbers, account validation status, and QPR compliance milestones.',
        tipHi: 'बैंक यूटीआर नंबर, खाता सत्यापन स्थिति और त्रैमासिक प्रगति रिपोर्ट स्थिति प्रदर्शित करता है।',
        placement: 'top'
      }
    ]
  },

  // 6. Officer Scrutiny Desk (Admin/Officer Queue)
  officer_queue: {
    pageTitle: { en: 'Officer Scrutiny Desk', hi: 'अधिकारी संवीक्षा पटल' },
    steps: [
      {
        target: '[data-tour="officer-filters"]',
        titleEn: 'Docket Queue Filters',
        titleHi: 'आवेदन कतार फ़िल्टर',
        descEn: 'Filter incoming applications by scheme (NFST, NOS, Top Class), anomaly risk tier, and affirmative PVTG priority.',
        descHi: 'योजना, जोखिम स्तर और पीवीटीजी प्राथमिकता के आधार पर आवेदनों को फ़िल्टर करें।',
        tipEn: 'PVTG scholars and ST female applicants are prioritized in accordance with statutory guidelines.',
        tipHi: 'पीवीटीजी छात्रों और एसटी महिला आवेदकों को वैधानिक दिशानिर्देशों के अनुसार प्राथमिकता दी जाती है।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="officer-table"]',
        titleEn: 'Seniority-Ordered Docket Table',
        titleHi: 'वरिष्ठता क्रमबद्ध आवेदन तालिका',
        descEn: 'Inspect candidate health scores, AI pre-scrutiny flags, Jaro-Winkler name similarity, and document integrity.',
        descHi: 'उम्मीदवार स्कोर, एआई पूर्व-संवीक्षा संकेत, नाम मिलान और दस्तावेज सत्यता का निरीक्षण करें।',
        tipEn: 'Click any row or document badge to open high-resolution side-by-side split comparison.',
        tipHi: 'विस्तृत साइड-बाय-साइड तुलना देखने के लिए किसी भी पंक्ति या दस्तावेज पर क्लिक करें।',
        placement: 'top'
      },
      {
        target: '[data-tour="officer-actions"]',
        titleEn: 'Human-in-the-Loop Decisions',
        titleHi: 'अधिकारी निर्णय एवं अधिरोहण',
        descEn: 'Pick up applications, approve sanctions, raise statutory deficiency notices, or exercise explainable human overrides.',
        descHi: 'आवेदन स्वीकार करें, कमी सूचना जारी करें, या वैधानिक कारण दर्ज करते हुए एआई सुझाव बदलें।',
        tipEn: 'Principle 2: AI only recommends; humans decide. Every approval or override enforces a mandatory logged reason.',
        tipHi: 'सिद्धांत 2: एआई केवल सुझाव देता है; अधिकारी निर्णय लेते हैं। प्रत्येक निर्णय हेतु कारण अनिवार्य है।',
        placement: 'left'
      }
    ]
  },

  // 7. Policy Rule Studio (SchemeConfigStudio)
  admin_studio: {
    pageTitle: { en: 'Scheme Policy Configuration Studio', hi: 'योजना नीति विन्यास स्टूडियो' },
    steps: [
      {
        target: '[data-tour="studio-schemes"]',
        titleEn: 'Policy Scheme Selector',
        titleHi: 'योजना चयनकर्ता',
        descEn: 'Select any of the 5 official MoTA scholarship schemes: Pre-Matric, Post-Matric, Top Class, NFST, or NOS.',
        descHi: 'मंत्रालय की 5 आधिकारिक योजनाओं में से किसी का चयन करें: प्री-मैट्रिक, पोस्ट-मैट्रिक, टॉप क्लास, एनएफएसटी या एनओएस।',
        tipEn: 'Zero eligibility rules are hardcoded in application code; all logic is dynamically fetched from versioned database tables.',
        tipHi: 'कोई भी नियम कोड में हार्डकोड नहीं है; सभी नियम डेटाबेस से गतिशील रूप से निष्पादित होते हैं।',
        placement: 'bottom'
      },
      {
        target: '[data-tour="studio-criteria"]',
        titleEn: 'Dynamic Eligibility & Quota Builder',
        titleHi: 'गतिशील पात्रता एवं कोटा निर्माता',
        descEn: 'Adjust academic marks thresholds, maximum age limits, family income ceilings, and statutory quotas.',
        descHi: 'न्यूनतम अंक, अधिकतम आयु, आय सीमा और वैधानिक आरक्षण प्रतिशत को आवश्यकतानुसार समायोजित करें।',
        tipEn: 'Simulate policy impacts over 10,000 synthetic tribal scholar records before publishing to production.',
        tipHi: 'उत्पादन में लागू करने से पहले 10,000 रिकॉर्ड पर नीति प्रभाव का सिमुलेशन चलाएं।',
        placement: 'top'
      },
      {
        target: '[data-tour="studio-publish"]',
        titleEn: 'Publish Policy Version',
        titleHi: 'नया नीति संस्करण प्रकाशित करें',
        descEn: 'Commit the updated scheme rule set with automatic semantic versioning and cryptographic audit logging.',
        descHi: 'अद्यतन योजना नियमों को स्वचालित संस्करण और ऑडिट लॉगिंग के साथ प्रकाशित करें।',
        tipEn: 'Existing in-flight applications remain grandfathered under the version they applied under.',
        tipHi: 'पहले से जमा किए गए आवेदन उसी नियम संस्करण के तहत संसाधित होते हैं जिसके तहत वे जमा हुए थे।',
        placement: 'top'
      }
    ]
  }
};
