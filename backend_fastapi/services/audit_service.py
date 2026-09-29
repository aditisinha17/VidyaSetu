"""
Tamper-Evident SHA-256 Chained Audit Trail Service (Section J)
Every lifecycle action computes a cryptographic hash chained to its predecessor block:
H_k = SHA-256(H_{k-1} || timestamp || actor || action || payloadHash)
"""

import hashlib
import json
from datetime import datetime
from typing import Dict, Any, List

class AuditService:
    GENESIS_HASH = "0000000000000000000000000000000000000000000000000000000000000000"

    @staticmethod
    def compute_hash(prev_hash: str, timestamp: str, actor: str, action: str, payload_str: str) -> str:
        raw = f"{prev_hash}|{timestamp}|{actor}|{action}|{payload_str}"
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()

    @classmethod
    def create_block(cls, prev_hash: str, actor: str, action: str, payload: Any, index: int = 1) -> Dict[str, Any]:
        timestamp = datetime.utcnow().isoformat() + "Z"
        payload_str = json.dumps(payload, sort_keys=True) if isinstance(payload, (dict, list)) else str(payload)
        payload_hash = hashlib.sha256(payload_str.encode("utf-8")).hexdigest()
        block_hash = cls.compute_hash(prev_hash, timestamp, actor, action, payload_hash)

        return {
            "block_index": index,
            "prev_hash": prev_hash,
            "timestamp": timestamp,
            "actor": actor,
            "action": action,
            "payload_hash": payload_hash,
            "payload_data": payload_str,
            "hash": block_hash,
            "short_hash": f"{block_hash[:6]}..{block_hash[-4:]}"
        }

    @classmethod
    def verify_chain(cls, blocks: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Validates the entire hash chain from genesis to head block.
        """
        if not blocks:
            return {"valid": True, "total_blocks": 0, "message": "No blocks in audit trail."}

        for i, block in enumerate(blocks):
            # Check predecessor linkage
            if i > 0:
                expected_prev = blocks[i - 1]["hash"]
                if block["prev_hash"] != expected_prev:
                    return {
                        "valid": False,
                        "broken_block_index": i,
                        "reason": f"Block #{i} prev_hash mismatch. Expected {expected_prev}, got {block['prev_hash']}"
                    }

            # Recompute block hash
            payload_str = block.get("payload_data", "")
            payload_hash = hashlib.sha256(payload_str.encode("utf-8")).hexdigest()
            recomputed = cls.compute_hash(
                block["prev_hash"],
                block["timestamp"],
                block["actor"],
                block["action"],
                payload_hash
            )

            if block["hash"] != recomputed:
                return {
                    "valid": False,
                    "broken_block_index": i,
                    "reason": f"Cryptographic integrity failed at block #{i}. Hash mismatch detected."
                }

        return {
            "valid": True,
            "total_blocks": len(blocks),
            "status": "AUDIT_CHAIN_VALID",
            "message": f"All {len(blocks)} cryptographic ledger blocks verified successfully without tampering."
        }
