// VidyaSetu Deterministic Statutory Rule Engine
// Evaluates applications against statutory scheme criteria without arbitrary AI probabilities.
// Rule Engine v3.0 - Aligned with official Ministry of Tribal Affairs (MoTA) scheme guidelines.

export class SchemeRuleEngine {
  /**
   * Deterministically evaluates candidate attributes against scheme rules.
   * @param {Object} candidate - Candidate details (age, income, marks, degree, etc.)
   * @param {Object} scheme - Scheme definition with eligibility thresholds
   * @returns {Object} Evaluation report with statutory pass/fail breakdown
   */
  static evaluate(candidate, scheme) {
    const checks = [];
    const eligibility = scheme.eligibility || {};

    // 1. Scheduled Tribe Community Verification
    const isSt = candidate.isSt || candidate.category === 'ST' || !!candidate.tribe;
    checks.push({
      criterion: 'Scheduled Tribe Status',
      statutoryRule: 'Candidate must belong to a Scheduled Tribe notified under Central Gazette / Article 342.',
      required: 'Notified Scheduled Tribe',
      actual: candidate.tribe ? `${candidate.tribe} (ST)` : (isSt ? 'ST Community' : 'Non-ST'),
      passed: isSt,
      severity: 'BLOCKING'
    });

    // 2. Annual Family Income Ceiling Check
    const incomeCeiling = eligibility.maxIncome || 600000;
    const actualIncome = Number(candidate.annualIncome || candidate.income || 0);
    const passedIncome = actualIncome <= incomeCeiling;
    checks.push({
      criterion: 'Annual Family Income Limit',
      statutoryRule: `Total annual family income must not exceed ₹${incomeCeiling.toLocaleString()} from all sources.`,
      required: `≤ ₹${incomeCeiling.toLocaleString()}`,
      actual: `₹${actualIncome.toLocaleString()}`,
      passed: passedIncome,
      severity: 'BLOCKING'
    });

    // 3. Maximum Age Threshold (with PVTG/Divyang relaxation if applicable)
    let maxAge = eligibility.maxAge || 36;
    const isPvtg = candidate.pvtg === true || candidate.pvtg === 'Yes';
    const isPwd = candidate.pwd === true || candidate.pwd === 'Yes';
    const ageRelaxation = (isPvtg || isPwd) ? 5 : 0;
    const effectiveMaxAge = maxAge + ageRelaxation;
    const actualAge = Number(candidate.age || 0);
    const passedAge = actualAge > 0 ? actualAge <= effectiveMaxAge : true;
    checks.push({
      criterion: 'Age Eligibility Limit',
      statutoryRule: `Maximum age limit is ${maxAge} years (with ${ageRelaxation > 0 ? '+5 years affirmative relaxation' : 'statutory norms'}).`,
      required: `≤ ${effectiveMaxAge} years`,
      actual: `${actualAge} years`,
      passed: passedAge,
      severity: 'BLOCKING'
    });

    // 4. Minimum Academic Marks in Qualifying Degree
    const minMarks = eligibility.minMarks || 55;
    const actualMarks = Number(candidate.pgMarks || candidate.marks || 0);
    const passedMarks = actualMarks > 0 ? actualMarks >= minMarks : true;
    checks.push({
      criterion: 'Qualifying Academic Marks',
      statutoryRule: `Candidate must secure at least ${minMarks}% in qualifying examination.`,
      required: `≥ ${minMarks}%`,
      actual: `${actualMarks}%`,
      passed: passedMarks,
      severity: 'BLOCKING'
    });

    // 5. Degree / Programme Match
    if (eligibility.degrees && eligibility.degrees.length > 0) {
      const candidateDegree = (candidate.degree || '').toLowerCase();
      const degreeMatches = eligibility.degrees.some(d => candidateDegree.includes(d.toLowerCase()));
      checks.push({
        criterion: 'Enrolled Degree / Programme',
        statutoryRule: `Course must be regular and full-time under approved categories (${eligibility.degrees.join(', ')}).`,
        required: eligibility.degrees.join(' / '),
        actual: candidate.degree || 'Not specified',
        passed: degreeMatches,
        severity: 'ATTENTION'
      });
    }

    // 6. NOS Specific: Overseas University Rank
    if (scheme.id === 'NOS') {
      const qsRank = Number(candidate.qsWorldRank || candidate.universityRank || 9999);
      const maxRank = eligibility.universityRankMax || 500;
      const passedRank = qsRank <= maxRank;
      checks.push({
        criterion: 'QS World University Ranking',
        statutoryRule: `Foreign university must be ranked within Top ${maxRank} in QS World University Rankings.`,
        required: `QS Rank ≤ ${maxRank}`,
        actual: qsRank < 9999 ? `QS #${qsRank}` : 'Unranked / Offer Pending',
        passed: passedRank,
        severity: 'BLOCKING'
      });
    }

    // 7. Pre-Matric Specific: School Bonafide Enrolment
    if (scheme.id === 'PRE_MATRIC') {
      const isSchoolLevel = (candidate.degree || '').toLowerCase().includes('class') || (candidate.institution || '').toLowerCase().includes('school') || Number(candidate.age || 0) <= 18;
      checks.push({
        criterion: 'Secondary School Bonafide Enrolment',
        statutoryRule: 'Student must be enrolled regular full-time in Class IX or X in a recognized Government/Aided school.',
        required: 'Class IX or X Enrolment',
        actual: candidate.degree || candidate.institution || 'School Enrolled',
        passed: isSchoolLevel,
        severity: 'BLOCKING'
      });
    }

    // 8. Post-Matric Specific: Post-Secondary Course Level
    if (scheme.id === 'POST_MATRIC') {
      const isPostMatric = !(candidate.degree || '').toLowerCase().includes('class ix') && !(candidate.degree || '').toLowerCase().includes('class 9');
      checks.push({
        criterion: 'Post-Matric Course Level',
        statutoryRule: 'Course must be post-secondary/higher secondary or above (Group 1 to 4 recognized course).',
        required: 'Group 1 to 4 Recognized Course',
        actual: candidate.degree || 'Post-Matric Course',
        passed: isPostMatric,
        severity: 'BLOCKING'
      });
    }

    // Aggregate Determination
    const blockingFailures = checks.filter(c => c.severity === 'BLOCKING' && !c.passed);
    const attentionWarnings = checks.filter(c => c.severity === 'ATTENTION' && !c.passed);

    let status = 'ELIGIBLE';
    let summary = 'Meets all statutory scheme eligibility criteria based on deterministic evaluation.';

    if (blockingFailures.length > 0) {
      status = 'NOT_ELIGIBLE';
      summary = `Does not satisfy ${blockingFailures.length} mandatory scheme criteria: ${blockingFailures.map(f => f.criterion).join(', ')}.`;
    } else if (attentionWarnings.length > 0) {
      status = 'POTENTIALLY_ELIGIBLE';
      summary = `Potentially eligible, pending verification of: ${attentionWarnings.map(w => w.criterion).join(', ')}.`;
    }

    return {
      schemeId: scheme.id,
      schemeName: scheme.name,
      status,
      summary,
      checks,
      evaluationTimestamp: new Date().toISOString()
    };
  }
}
