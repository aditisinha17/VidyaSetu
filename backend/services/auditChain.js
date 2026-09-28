// VidyaSetu Tamper-Evident Chained Audit Trail
// Demonstrates chained cryptographic hashing for all application governance actions.
// H_k = SHA-256(H_{k-1} + Timestamp + Actor + Action + Payload)

import crypto from 'node:crypto';

export class AuditChainService {
  /**
   * Generates a SHA-256 hash string for given inputs.
   */
  static computeHash(dataString) {
    return crypto.createHash('sha256').update(dataString).digest('hex');
  }

  /**
   * Creates a new block chained to the previous hash.
   * @param {string} prevHash - Hash of the preceding block (or "GENESIS_ROOT")
   * @param {string} actor - Name / Role of actor
   * @param {string} action - Action description
   * @param {Object|string} payload - Details/changes recorded
   * @param {string} [customTimestamp] - Optional timestamp for consistency
   * @returns {Object} Complete audit block with its computed hash
   */
  static createBlock(prevHash, actor, action, payload = '', customTimestamp = null) {
    const timestamp = customTimestamp || new Date().toISOString();
    const payloadStr = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const contentToHash = `${prevHash}|${timestamp}|${actor}|${action}|${payloadStr}`;
    const hash = this.computeHash(contentToHash);

    return {
      prevHash,
      timestamp,
      actor,
      action,
      payload: payloadStr,
      hash,
      shortHash: `${hash.slice(0, 8)}...${hash.slice(-4)}`
    };
  }

  /**
   * Initializes a default chained audit history for an application.
   */
  static initializeChain(appId, applicantName, schemeId) {
    const genesis = this.createBlock(
      '0000000000000000000000000000000000000000000000000000000000000000',
      'System Genesis',
      `Application Case File Initialized (${appId})`,
      { applicant: applicantName, scheme: schemeId },
      '2026-09-12T10:40:00Z'
    );

    const b1 = this.createBlock(
      genesis.hash,
      `Applicant (${applicantName})`,
      'Application Form and Documents Submitted via DigiLocker Sandbox Adapter',
      { documentsCount: 5, status: 'Submitted' },
      '2026-09-12T10:42:00Z'
    );

    const b2 = this.createBlock(
      b1.hash,
      'Document AI Pre-Scrutiny Engine',
      'Automated OCR Extraction & Validity Audit Completed: Income Certificate Validity Alert',
      { deficiencyCode: 'DEF-INC-VALIDITY', flaggedField: 'Annual Income Certificate' },
      '2026-09-12T10:44:00Z'
    );

    return [genesis, b1, b2];
  }

  /**
   * Verifies the cryptographic integrity of a chained audit log.
   * If any record was altered, the hash chain breaks immediately.
   * @param {Array} chain - List of audit blocks
   * @returns {Object} Integrity verification report
   */
  static verifyChain(chain) {
    if (!chain || chain.length === 0) {
      return { isValid: false, message: 'Audit chain is empty.' };
    }

    for (let i = 0; i < chain.length; i++) {
      const block = chain[i];

      // Check link to previous block
      if (i > 0) {
        const prevBlock = chain[i - 1];
        if (block.prevHash !== prevBlock.hash) {
          return {
            isValid: false,
            brokenIndex: i,
            reason: `Broken chain link at Block #${i + 1}. prevHash does not match Block #${i}'s hash.`,
            expectedPrevHash: prevBlock.hash,
            actualPrevHash: block.prevHash
          };
        }
      }

      // Recompute hash of current block
      const contentToHash = `${block.prevHash}|${block.timestamp}|${block.actor}|${block.action}|${block.payload}`;
      const recomputedHash = this.computeHash(contentToHash);

      if (recomputedHash !== block.hash) {
        return {
          isValid: false,
          brokenIndex: i,
          reason: `Tamper detected in Block #${i + 1} (${block.action}). Hash mismatch.`,
          recordedHash: block.hash,
          recomputedHash
        };
      }
    }

    return {
      isValid: true,
      totalBlocks: chain.length,
      latestHash: chain[chain.length - 1].hash,
      message: `Audit chain cryptographically verified. All ${chain.length} blocks are authentic and untampered.`
    };
  }
}
