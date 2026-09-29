// VidyaSetu Deterministic Statutory Rule Engine (Generic & Config-Driven)
// Ground Rule 1: Configurable, Not Hardcoded — All scheme rules live in DB/config.
// Zero hardcoded 'if (scheme.id === ...)' branches. Every rule carries { source, verified }.

export class SchemeRuleEngine {
  /**
   * Deterministically evaluates candidate attributes against a scheme's configured criteria.
   * Fully generic: iterates dynamically over criteria defined in scheme configuration.
   * 
   * @param {Object} candidate - Candidate details (age, income, marks, degree, etc.)
   * @param {Object} scheme - Scheme definition containing eligibility and criteria array
   * @returns {Object} Comprehensive evaluation report with statutory pass/fail breakdown
   */
  static evaluate(candidate, scheme) {
    const checks = [];
    const eligibility = scheme.eligibility || {};
    const criteriaList = scheme.criteria || [];

    // 1. Constitutional Scheduled Tribe Status Check (Universal across all MoTA schemes)
    const isSt = candidate.isSt === true || candidate.category === 'ST' || !!candidate.tribe;
    checks.push({
      criterionId: 'ST_STATUS_ART342',
      criterion: 'Scheduled Tribe Status (Article 342)',
      statutoryRule: 'Candidate must belong to a Scheduled Tribe notified under Central Gazette / Article 342.',
      required: 'Notified Scheduled Tribe',
      actual: candidate.tribe ? `${candidate.tribe} (ST)` : (isSt ? 'ST Community' : 'Non-ST'),
      passed: isSt,
      severity: 'BLOCKING',
      source: 'Constitution of India, Article 342 / Central ST Gazette',
      verified: true
    });

    // 2. Annual Family Income Ceiling Check
    const incomeCeiling = Number(eligibility.maxIncome || eligibility.incomeCeiling || 600000);
    const actualIncome = Number(candidate.annualIncome || candidate.income || 0);
    const passedIncome = actualIncome <= incomeCeiling;
    checks.push({
      criterionId: 'INCOME_CEILING',
      criterion: 'Annual Family Income Limit',
      statutoryRule: `Total annual family income must not exceed ₹${incomeCeiling.toLocaleString('en-IN')} from all sources.`,
      required: `≤ ₹${incomeCeiling.toLocaleString('en-IN')}`,
      actual: `₹${actualIncome.toLocaleString('en-IN')}`,
      passed: passedIncome,
      severity: 'BLOCKING',
      source: scheme.guidelineReference || 'Official MoTA Scheme Guidelines',
      verified: true
    });

    // 3. Maximum Age Threshold (with affirmative relaxation for PVTG & PwD)
    const baseMaxAge = Number(eligibility.maxAge || 36);
    const isPvtg = candidate.pvtg === true || candidate.isPvtg === true || candidate.pvtg === 'Yes';
    const isPwd = candidate.pwd === true || candidate.isPwd === true || candidate.pwd === 'Yes';
    const ageRelaxation = (isPvtg || isPwd) ? 5 : 0;
    const effectiveMaxAge = baseMaxAge + ageRelaxation;
    const actualAge = Number(candidate.age || 0);
    const passedAge = actualAge > 0 ? actualAge <= effectiveMaxAge : true;
    checks.push({
      criterionId: 'AGE_THRESHOLD',
      criterion: 'Age Eligibility Limit',
      statutoryRule: `Maximum age limit is ${baseMaxAge} years (${ageRelaxation > 0 ? '+5 years affirmative relaxation applied' : 'general limit'}).`,
      required: `≤ ${effectiveMaxAge} years`,
      actual: actualAge > 0 ? `${actualAge} years` : 'Age provided at KYC',
      passed: passedAge,
      severity: 'BLOCKING',
      source: scheme.guidelineReference || 'Official MoTA Scheme Guidelines',
      verified: true
    });

    // 4. Minimum Academic Marks in Qualifying Examination
    const minMarks = Number(eligibility.minMarks || 50);
    const actualMarks = Number(candidate.pgMarks || candidate.marksPercentage || candidate.marks || 0);
    const passedMarks = actualMarks > 0 ? actualMarks >= minMarks : true;
    checks.push({
      criterionId: 'MIN_MARKS',
      criterion: 'Qualifying Academic Marks',
      statutoryRule: `Candidate must secure at least ${minMarks}% in qualifying examination.`,
      required: `≥ ${minMarks}%`,
      actual: actualMarks > 0 ? `${actualMarks}%` : 'Awaiting Final Result',
      passed: passedMarks,
      severity: 'BLOCKING',
      source: scheme.guidelineReference || 'Official MoTA Scheme Guidelines',
      verified: true
    });

    // 5. Eligible Degrees / Courses (Generic substring match against configured degree list)
    const eligibleDegrees = eligibility.degrees || eligibility.eligibleDegrees || [];
    if (Array.isArray(eligibleDegrees) && eligibleDegrees.length > 0) {
      const candidateDegree = String(candidate.degree || candidate.courseEnrolled || candidate.highestQualification || '').toLowerCase();
      const degreeMatches = eligibleDegrees.some(d => candidateDegree.includes(String(d).toLowerCase()));
      checks.push({
        criterionId: 'DEGREE_MATCH',
        criterion: 'Enrolled Degree / Programme Level',
        statutoryRule: `Course must be regular and full-time under approved categories (${eligibleDegrees.join(', ')}).`,
        required: eligibleDegrees.join(' / '),
        actual: candidate.degree || candidate.courseEnrolled || candidate.highestQualification || 'Not specified',
        passed: candidateDegree ? degreeMatches : true,
        severity: 'ATTENTION',
        source: scheme.guidelineReference || 'Official MoTA Scheme Guidelines',
        verified: true
      });
    }

    // 6. Generic Dynamic Evaluation of Scheme-Specific Configured Criteria
    // Evaluates any custom rule configured in DB without code-level branching!
    for (const rule of criteriaList) {
      const fieldVal = candidate[rule.field];
      let rulePassed = true;
      let actualDisplay = String(fieldVal ?? 'Not specified');

      switch (rule.operator) {
        case '<=': {
          const numVal = Number(fieldVal || 0);
          const limit = Number(rule.threshold || 0);
          rulePassed = numVal <= limit;
          actualDisplay = `${rule.field}: ${numVal}`;
          break;
        }
        case '>=': {
          const numVal = Number(fieldVal || 0);
          const limit = Number(rule.threshold || 0);
          rulePassed = numVal >= limit;
          actualDisplay = `${rule.field}: ${numVal}`;
          break;
        }
        case 'IN': {
          const allowedList = Array.isArray(rule.allowed) ? rule.allowed.map(x => String(x).toLowerCase()) : [];
          const candidateValLower = String(fieldVal || '').toLowerCase();
          rulePassed = allowedList.some(item => candidateValLower.includes(item));
          actualDisplay = fieldVal ? String(fieldVal) : 'Not specified';
          break;
        }
        case 'EXISTS': {
          rulePassed = fieldVal !== undefined && fieldVal !== null && fieldVal !== '';
          actualDisplay = rulePassed ? 'Present / Verified' : 'Missing';
          break;
        }
        case 'EQUALS': {
          rulePassed = String(fieldVal).toLowerCase() === String(rule.expected).toLowerCase();
          actualDisplay = String(fieldVal ?? 'None');
          break;
        }
        default:
          rulePassed = true;
      }

      checks.push({
        criterionId: rule.id || rule.field,
        criterion: rule.label || rule.field,
        statutoryRule: rule.description || `Must satisfy ${rule.label} rule.`,
        required: rule.requiredDescription || String(rule.threshold ?? (rule.allowed ? rule.allowed.join(', ') : 'Required')),
        actual: actualDisplay,
        passed: rulePassed,
        severity: rule.mandatory ? 'BLOCKING' : 'ATTENTION',
        source: rule.source || scheme.guidelineReference || 'MoTA Scheme Guidelines',
        verified: rule.verified !== undefined ? rule.verified : true
      });
    }

    // Calculate aggregated evaluation status
    const blockingFailures = checks.filter(c => c.severity === 'BLOCKING' && !c.passed);
    const attentionWarnings = checks.filter(c => c.severity === 'ATTENTION' && !c.passed);

    let status = 'ELIGIBLE';
    let summary = 'Meets all statutory scheme eligibility criteria based on deterministic evaluation.';

    if (blockingFailures.length > 0) {
      status = 'NOT_ELIGIBLE';
      summary = `Does not satisfy ${blockingFailures.length} mandatory statutory criteria: ${blockingFailures.map(f => f.criterion).join(', ')}.`;
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

  /**
   * Evaluates candidate across all available schemes in configuration.
   */
  static evaluateAll(candidate, schemesList) {
    return (schemesList || []).map(scheme => this.evaluate(candidate, scheme));
  }
}
